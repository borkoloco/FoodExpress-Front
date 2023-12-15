export const transformarFecha = (fecha) => {
  const fechaObj = new Date(fecha);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };

  const fechaFormateada = fechaObj.toLocaleString("en-US", options);
  // Formatear la fecha para mostrarla como día/mes/año
  const [fechaParte, horaParte] = fechaFormateada.split(", ");
  const [mes, dia, año] = fechaParte.split("/");
  const fechaFinal = `${dia}/${mes}/${año}, ${horaParte}`;

  return fechaFinal;
};


export const transformarFecha2 = (fecha) => {
  const fechaObj = new Date(fecha);

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const fechaFormateada = fechaObj.toLocaleString("en-US", options);
  // Formatear la fecha para mostrarla como día/mes/año
  const [fechaParte] = fechaFormateada.split(", ");
  const [mes, dia, año] = fechaParte.split("/");
  const fechaFinal = `${dia}/${mes}/${año}`;

  return fechaFinal;
};
