export interface Loan {
    fecha_solicitud: string;
    estado: "Realizado" | "Finalizado";
    aprobado: boolean;
    monto_solicitado: number; 
    mmr:number;
    churn_rate: number;
    activo: boolean
    score: number;
  }
  