import { Loan } from "../../loan/domain/loan";
import { Portfolio } from "../domain/portfolio";
const CANTIDAD_MESES = 12;

export const calcularMMR = (portfolio: Portfolio[]): number => {
  let acumulado = 0;
  for (let i = 1; i <= CANTIDAD_MESES; i++) {
    const subcripcionesMensuales = portfolio.filter((p) => p.MES === i);
    const sumarSubs = subcripcionesMensuales.reduce(
      (acumulador, p) => acumulador + p["MONTO (USD)"],
      0
    );
    acumulado = acumulado + sumarSubs;
  }

  return Math.ceil(acumulado / 12);
};

export const calularChurnRate = (portfolio: Portfolio[]): number => {
  let chrun_rate = 0;

  const ENERO = 1;

  let clientesBase = portfolio.filter((p) => p.MES === ENERO).length;

  for (let i = 2; i <= CANTIDAD_MESES; i++) {
    const clientesMesActual = portfolio.filter((p) => p.MES === i).length;
    const porcentajeDePerdida = (clientesBase - clientesMesActual) * 100;
    chrun_rate = porcentajeDePerdida > 0 ? porcentajeDePerdida : 0;
    clientesBase = portfolio.filter((p) => p.MES === i).length;
  }

  return Math.round((chrun_rate / 12) * 10) / 10;
};

export const calcularScore = (loan: Loan) => {
  return ((loan.mmr/10)-(loan.churn_rate*10));
}