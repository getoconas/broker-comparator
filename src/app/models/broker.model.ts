export interface Broker {
  id: string;
  nombre: string;
  comision_base: number;
  comision_premium?: number; // Opcional, porque no todos tienen
  comision_dma?: number;     // Opcional, específico de algunos
  comision_asesor?: number;  // Opcional
  derecho_mercado_fijo?: number;
  derechos_mercado_incluidos: boolean;
  iva_incluido: boolean;
  notas: string;
}
