const statusesProfessional = {
  error: {
    message: 'Error',
    description: 'La obra no se ha podido enviar, Por favor intente nuevamente',
  },
  success: {
    message: '\u00C9xito',
    description: 'La obra se ha enviado exitosamente!',
  },
  info: { message: 'Informaci\u00D3n', description: '' },
};

const statusesRecivedWork = {
  error: {
    message: 'Error',
    description:
      'La devoluci\u00D3an no se ha podido enviar, Por favor intente nuevamente',
  },
  success: {
    message: 'Exito',
    description: 'La devoluci\u00D3n se ha enviado exitosamente!',
  },
  info: { message: 'Informaci\u00D3n', description: '' },
};

const statusesGroups = {
  error: {
    message: 'Error',
    description: 'No se pudo crear el grupo, intente nuevamente mas tarde',
  },
  success: {
    message: 'Exito',
    description: 'Se creo el grupo exitosamente',
  },
};

const statusesGroupPosts = {
  error: {
    message: 'Error',
    description: 'No se publicar el mensaje, intente nuevamente mas tarde',
  },
  success: {
    message: 'Exito',
    description: 'Se publicó el mensaje exitosamente',
  },
};

export default {
  statusesRecivedWork,
  statusesProfessional,
  statusesGroups,
  statusesGroupPosts,
};
