import { Portfolio } from "../domain/portfolio";
import { PortfolioRepository } from "../domain/portfolio-repository";

export class PortfolioService {
  constructor(readonly portfolioRepository: PortfolioRepository) {}

  createPortfolio(path: string){
    return this.portfolioRepository.createPortfolio(path);
  }

  getPortfolio(){
    return this.portfolioRepository.getPortfolio();
  }

 
}
