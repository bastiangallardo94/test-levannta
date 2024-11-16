import { PortfolioService } from "../application/portfolio-service";
import { PortfolioRepositoryImpl } from "../repository/portfolio-repository";

const portfolioRepository = new PortfolioRepositoryImpl();

export const portfolioService = new PortfolioService(portfolioRepository);