"use client";

import axios from "axios";
import React, { useState } from "react";
import { Loan } from "../interfaces/loan";

const usePortfolio = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loan, setLoan] = useState<Loan>({
    fecha_solicitud: "",
    estado: "Realizado",
    aprobado: false,
    monto_solicitado: 0,
    mmr: 0,
    churn_rate: 0,
    activo: false,
    score: 0,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const pedirCredito = async (monto: number) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/apply-loan",
        { monto },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setLoan(response.data.loan)
      return response.data;
    } catch (e) {
      console.error(e);
    }
  };

  const consultarEstado = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/loan-status",
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setLoan(response.data.loan)
      return response.data;
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/portfolio",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setLoan({
        ...loan,
        mmr: response.data.monto,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return { handleUpload, handleFileChange, loan, pedirCredito, consultarEstado };
};

export default usePortfolio;
