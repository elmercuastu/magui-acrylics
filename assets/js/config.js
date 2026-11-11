/* Magui Acrylics: todos los datos del negocio viven aquí.
   Un campo vacío ("") mantiene el texto genérico del sitio.
   Al llenarlo, se actualiza en las cuatro páginas. */
window.MAGUI = {
  // WhatsApp en formato internacional, sin + ni espacios (098 976 0050).
  whatsapp: "593989760050",
  // Zonas donde atiende Magui.
  zonas: "Quito y los valles",
  // Cuándo se agenda.
  horario: "Agenda con 1 a 2 días de anticipación",
  // Enlaces completos a redes (vacío: no aparecen).
  instagram: "",
  tiktok: "",
  // Solo reseñas reales, con permiso de la clienta. Sin reseñas, la sección no aparece.
  // Ejemplo: { texto: "…", autora: "María P.", detalle: "Cumbayá" }
  resenas: [],

  // Precio en texto, como aparecerá: "$15" o "desde $15". Vacío: "Consultar".
  // Dato confirmado por Magui: servicios desde $10. El resto, confirmarlo con ella.
  precios: {
    "set": "desde $10",
    "francesa": "",
    "ombre": "",
    "diseno": "",
    "relleno": "",
    "retiro": ""
  }
};
