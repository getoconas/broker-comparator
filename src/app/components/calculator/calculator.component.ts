import { Component, inject, OnInit } from '@angular/core';
import { BrokerService } from '../../services/broker.service';
import { Broker } from '../../models/broker.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Extendemos el modelo para guardar los resultados calculados
export interface ResultadoBroker extends Broker {
  montoInvertir: number;
  montoComision: number;
  montoDerechos: number;
  montoIva: number;
  totalCargos: number;
  montoFinal: number;
}

@Component({
  selector: 'app-calculator',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent implements OnInit {

  // Inyectamos el servicio (sintaxis moderna de Angular)
  private brokerService = inject(BrokerService);

  brokersBase: Broker[] = [];
  resultadosOrdenados: ResultadoBroker[] = [];

  cantidad: number = 1;
  precio: number = 10000;

  // Constantes impositivas y de mercado estándar de Argentina
  readonly IVA = 0.21;
  readonly DERECHO_MERCADO_DEFAULT = 0.05; // BYMA

  ngOnInit(): void {
    // Cargamos los brokers al iniciar el componente
    this.brokersBase = this.brokerService.getBrokers();
    this.calcularResultados();
  }

  // Esta función se ejecuta cada vez que el usuario teclea un número nuevo
  calcularResultados(): void {
    const montoInvertir = this.cantidad * this.precio;

    if (!montoInvertir || montoInvertir <= 0) {
      this.resultadosOrdenados = [];
      return;
    }

    const resultados = this.brokersBase.map(broker => {
      // 1. Comisión base pura (forzamos el redondeo a 2 decimales como hace el broker)
      const comisionCruda = montoInvertir * (broker.comision_base / 100);
      const montoComision = Number(comisionCruda.toFixed(2));
      
      // 2. Derechos de mercado (BYMA)
      let montoDerechos = 0;
      if (!broker.derechos_mercado_incluidos) {
        const porcentajeDerecho = broker.derecho_mercado_fijo !== undefined ? broker.derecho_mercado_fijo : this.DERECHO_MERCADO_DEFAULT;
        const derechosCrudos = montoInvertir * (porcentajeDerecho / 100);
        montoDerechos = Number(derechosCrudos.toFixed(2));
      }

      // 3. IVA (Se calcula sobre la suma de la comisión y los derechos, ya redondeados)
      let montoIva = 0;
      if (!broker.iva_incluido) {
        const ivaCrudo = (montoComision + montoDerechos) * this.IVA;
        montoIva = Number(ivaCrudo.toFixed(2));
      }

      // 4. Totales exactos sumando los valores ya redondeados (así evitamos diferencias de centavos)
      const totalCargos = montoComision + montoDerechos + montoIva;
      const montoFinal = montoInvertir + totalCargos;

      return { ...broker, montoInvertir, montoComision, montoDerechos, montoIva, totalCargos: Number(totalCargos.toFixed(2)), montoFinal: Number(montoFinal.toFixed(2)) };
    });

    this.resultadosOrdenados = resultados.sort((a, b) => a.totalCargos - b.totalCargos);
  }
}
