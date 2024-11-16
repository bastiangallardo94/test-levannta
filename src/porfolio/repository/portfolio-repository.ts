import xlsx from "xlsx";
import path from "path";
import fs from "fs";
import { PortfolioRepository } from "../domain/portfolio-repository";
import { Portfolio } from "../domain/portfolio";
import { Loan } from "../../loan/domain/loan";
import { calcularMMR, calularChurnRate } from "../util/portfolioUtils";



export class PortfolioRepositoryImpl implements PortfolioRepository {

  portfolio: Portfolio[];

  constructor(){
    this.portfolio = [];
  }

  createPortfolio(portafolio: string): Portfolio[] {
    try {
      const filePath = path.resolve(portafolio);
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheetData: Portfolio[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      this.portfolio = sheetData;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error al borrar el archivo:", err);
        } else {
          console.log("Archivo eliminado correctamente.");
        }
      });

      return sheetData;

    } catch (err) {
      console.error(err);
      return [];
    }
  }
  getPortfolio(): Portfolio[] {
    return this.portfolio;
  }
}
