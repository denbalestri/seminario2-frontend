const statusesProfessional = {
  error: {
    message: "Error",
    description: "La obra no se ha podido enviar, Por favor intente nuevamente",
  },
  success: {
    message: "Exito",
    description: "La obra se ha enviado exitosamente!",
  },
  info: { message: "Informacion", description: "" },
};

const statusesRecivedWork = {
  error: {
    message: "Error",
    description:
      "La devolucion no se ha podido enviar, Por favor intente nuevamente",
  },
  success: {
    message: "Exito",
    description: "La devolucion se ha enviado exitosamente!",
  },
  info: { message: "Informacion", description: "" },
};

export default { statusesRecivedWork, statusesProfessional };
