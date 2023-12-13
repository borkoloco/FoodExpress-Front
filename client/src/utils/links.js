import React from "react";
import Swal from "sweetalert2";

export const sendWhatsApp = (phoneNumber, text) => {
  //const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  const link = `https://wa.me/${phoneNumber}?text=${text}`;

  // Verificar si el navegador admite la apertura de enlaces
  if (navigator && navigator.userAgent.indexOf("ReactSnap") === -1) {
    window.open(link);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor instala WhatsApp para chatear",
      footer: "",
    });
  }
};
