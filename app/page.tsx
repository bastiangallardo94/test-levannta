"use client";

import { ChangeEvent, useState } from "react";
import usePortfolio from "./hooks/usePortfolio";
import { parseDate } from "./formatDate";

export default function Home() {
  const { handleFileChange, handleUpload, pedirCredito,consultarEstado, loan } = usePortfolio();

  const [montoCredito, setMontoCredito] = useState<string>("");

  const handleMontoCredito = (e: ChangeEvent<HTMLInputElement>) => {
    setMontoCredito(e?.target?.value);
  };

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Sistema de levantamiento de capital</h1>
        </div>
        <div className="my-3" />
        <div className="col-8">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            accept=".xlsx"
          />
        </div>
        <div className="col-4">
          <button
            className="btn btn-primary"
            onClick={() => {
              try {
                handleUpload();
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Cargar cartera de clientes
          </button>
        </div>
        <div className="my-3" />
        <div className="col-4">
          <h3>Monto Aceptado: $ {loan.mmr}</h3>
        </div>
        <div className="col-4">
          <div className="input-group has-validation">
            <input
              type="text"
              className={`form-control ${
                loan.mmr < parseInt(montoCredito) ? "is-invalid" : ""
              }`}
              id="monto"
              onChange={handleMontoCredito}
              placeholder="Monto crédito"
            />
            <div className="invalid-feedback">
              Monto requerido o menor que el monto aceptado
            </div>
          </div>
        </div>
        <div className="col-4">
          <button
            className="btn btn-primary"
            disabled={loan.mmr < parseInt(montoCredito)}
            onClick={() => {
              try {
                pedirCredito(parseInt(montoCredito));
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Pedir crédito
          </button>
        </div>
        <div className="my-3" />
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Fecha solicitud</th>
                <th scope="col">Estado</th>
                <th scope="col">Resultado</th>
                <th scope="col">Monto solicitado</th>
                <th scope="col">Monto pre-aprobado</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              {loan.activo ? (
                <tr>
                  <th scope="row">{parseDate(loan.fecha_solicitud)}</th>
                  <td>{loan.estado}</td>
                  <td>{loan.estado === "Realizado" ? "Pendiente" : (loan.aprobado ? "Aprobado" : "Rechazado")}</td>
                  <td>{loan.monto_solicitado}</td>
                  <td>{loan.mmr}</td>
                  <td><button onClick={() => consultarEstado()} className="btn btn-success btn-sm text-white">Consultar estado</button></td>
                </tr>
              ) : (
                <tr><td colSpan={6} className="text-center"><b>No hay solicitudes pendientes</b></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
