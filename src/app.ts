import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import multer from "multer";
import { envs } from "./core/env";
import { portfolioService } from "./porfolio/infra/dependencies";
import { loanService } from "./loan/infra/dependencies";
const upload = multer({ dest: "uploads/" });

function boostrap() {
  const app = express();
  app.use(cors({ origin: "http://localhost:3001" }));

  app.use(express.json());

  app.post(
    "/portfolio",
    upload.single("file"),
    (req: Request, res: Response) => {
        console.log('dentrsa')
      try {
        if (!req.file) {
          res.status(400).send("Archivo no enviado.");
        }
        if (req?.file?.path) {
          const portfolioInicial = portfolioService.createPortfolio(req.file.path);
          const loanBase = loanService.evaluarPortfolio(portfolioInicial);
          res.status(200).json({
            message: "Portafolio generado exitosamente",
            monto: loanBase.mmr,
          });
        } else {
          res.status(400).send("Archivo no guardado.");
        }
        
      } catch (e) {
        console.error(e);
        res.status(500).send("Error al procesar el archivo.");
      }
    }
  );

  app.get("/portfolio", (req: Request, res: Response) => {
    res.status(200).json({
      portfolio: portfolioService.getPortfolio(),
    });
  });

  app.post("/apply-loan", (req: Request, res: Response) => {
    try {
      if (!req?.body?.monto || isNaN(req?.body?.monto)) {
        res.status(400).json({
          message: "Monto requerido y tiene que ser número.",
        });
      }

      const loan = loanService.applyLoan({monto:req?.body?.monto});


      res.status(200).json({
        message: "Solicitud generada con exito!",
        loan
      });


    } catch (error: unknown) {
      console.error("Fallo", error);
      res.status(500).json({
        message: error?.toString(),
      });
    }
  });

  app.get("/loan-status", (req: Request, res: Response) => {
    res.status(200).json({
        loan: loanService.loanStatus()
    })
  });

  app.listen(envs.PORT, () => {
    console.log(` esuchando ${envs.PORT}`);
  });
}

boostrap();
