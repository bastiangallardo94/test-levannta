import { Portfolio } from "../../porfolio/domain/portfolio";
import { LoanRepository } from "../domain/loan-repository";

export class LoanService {

    constructor(
        readonly loanRepository: LoanRepository
    ){}

    loanStatus(){
        return this.loanRepository.loanStatus()
    }

    evaluarPortfolio(portfolio:Portfolio[]){
        return this.loanRepository.evaluarPortfolio(portfolio);
    }



    applyLoan({ monto }: {monto: number}){
        return this.loanRepository.applyLoan({monto});
    }


}