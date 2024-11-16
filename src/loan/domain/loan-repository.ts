import { Portfolio } from "../../porfolio/domain/portfolio";
import { Loan } from "./loan";

export interface LoanRepository {
  loanStatus(): void;
  applyLoan({ monto }: { monto: number }): Loan;
  evaluarPortfolio(portfolio: Portfolio[]): Loan;
}
