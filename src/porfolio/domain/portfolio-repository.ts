import { Loan } from "../../loan/domain/loan";
import { Portfolio } from "./portfolio";

export interface PortfolioRepository {
    createPortfolio(path: string): Portfolio[];
    getPortfolio():Portfolio[];
}