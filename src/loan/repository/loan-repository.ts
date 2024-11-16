import { Portfolio } from "../../porfolio/domain/portfolio";
import { calcularMMR, calcularScore, calularChurnRate } from "../../porfolio/util/portfolioUtils";
import { Loan } from "../domain/loan";
import { LoanRepository } from "../domain/loan-repository";

export class LoanRepositoryImpl implements LoanRepository {


    loan: Loan;

    constructor(){
        this.loan = {
            fecha_solicitud: new Date().toISOString(),
            estado: "Realizado",
            aprobado:false,
            monto_solicitado: 0,
            mmr:0,
            churn_rate: 0,
            activo:false,
            score:0
        }
    }

    evaluarPortfolio(portfolio:Portfolio[]): Loan {
        const mmr =  calcularMMR(portfolio);
        const churn_rate =  calularChurnRate( portfolio)
        this.setLoan({
          fecha_solicitud: new Date().toISOString(),
          estado: "Realizado",
          aprobado:false,
          monto_solicitado: 0,
          mmr,
          churn_rate,
          activo:false,
          score:0
        })
        return {
          fecha_solicitud: new Date().toISOString(),
          estado: "Realizado",
          aprobado:false,
          monto_solicitado: 0,
          mmr,
          churn_rate,
          activo:false,
          score:0
        }
      }


    applyLoan({ monto }: { monto: number; }): Loan {

      if(monto > this.loan.mmr){
        throw new Error('Monto es superior a lo permitido :(')
      }
      
      this.setLoan({
        ...this.loan,
        activo: true,
        monto_solicitado: monto,
        estado: "Realizado",
      });

      return this.loan;
        
    }

    loanStatus(): Loan {
      this.setLoan({
        ...this.loan,
        activo: true,
        aprobado: calcularScore(this.loan) > 70 ? true : false,
        score: calcularScore(this.loan),
        estado: "Finalizado",
      });
        return this.loan;
    }

    
    setLoan(newLoan:Loan){
      this.loan = newLoan;
    }

    getCurrentLoan(){
      if(this.loan.activo){
        return this.loan
      } else {
        return null
      }
    }

}