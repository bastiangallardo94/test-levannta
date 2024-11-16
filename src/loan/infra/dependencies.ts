import { LoanService } from "../application/loan-service";
import { LoanRepositoryImpl } from "../repository/loan-repository";

const loanRepository = new LoanRepositoryImpl();

export const loanService = new LoanService(loanRepository);