import { Component, inject, OnInit } from '@angular/core';
import { BrokerService } from '../../services/broker.service';
import { Broker } from '../../models/broker.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Extendemos el modelo para guardar los resultados calculados
export interface ResultadoBroker extends Broker {
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
  readonly DERECHO_MERCADO_DEFAULT = 0.08; // Porcentaje estándar si el broker no lo especifica

  ngOnInit(): void {
    // Cargamos los brokers al iniciar el componente
    this.brokersBase = this.brokerService.getBrokers();
    this.calcularResultados();
  }

  // Esta función se ejecuta cada vez que el usuario teclea un número nuevo
  calcularResultados(): void {
    // Calculamos el monto base multiplicando cantidad por precio unitario
    const montoInvertir = this.cantidad * this.precio;

    if (!montoInvertir || montoInvertir <= 0) {
      this.resultadosOrdenados = [];
      return;
    }

    const resultados = this.brokersBase.map(broker => {
      // 1. Comisión base
      const comisionBroker = montoInvertir * (broker.comision_base / 100);
      
      // 2. Derechos de mercado
      let derechosMercado = 0;
      if (!broker.derechos_mercado_incluidos) {
        const porcentajeDerecho = broker.derecho_mercado_fijo !== undefined ? broker.derecho_mercado_fijo : this.DERECHO_MERCADO_DEFAULT;
        derechosMercado = montoInvertir * (porcentajeDerecho / 100);
      }

      // 3. IVA
      let iva = 0;
      if (!broker.iva_incluido) {
        iva = (comisionBroker + derechosMercado) * this.IVA;
      }

      // 4. Totales
      const totalCargos = comisionBroker + derechosMercado + iva;
      const montoFinal = montoInvertir + totalCargos;

      return { ...broker, totalCargos, montoFinal };
    });

    // Ordenamos de menor a mayor
    this.resultadosOrdenados = resultados.sort((a, b) => a.totalCargos - b.totalCargos);
  }
}
