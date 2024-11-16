export const parseDate = (dateFormat: string) => {
    const date = new Date(dateFormat);

// Configuración del formato deseado
return  date.toLocaleString("es-ES", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false, // Usar el formato de 24 horas
});
}