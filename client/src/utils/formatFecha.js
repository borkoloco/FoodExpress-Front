export const transformarFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    };
    
    const fechaFormateada = fechaObj.toLocaleString('en-US', options);
    return fechaFormateada;
  }