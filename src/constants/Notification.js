const statusesProfessional = {
  error: {
    message: 'Error',
    description: 'La obra no se ha podido enviar, Por favor intente nuevamente',
  },
  success: {
    message: '\u00C9xito',
    description: 'La obra se ha enviado exitosamente!',
  },
  info: { message: 'Información', description: '' },
};

const statusesRecivedWork = {
  error: {
    message: 'Error',
    description:
      'La devolución no se ha podido enviar, por favor intente nuevamente',
  },
  success: {
    message: 'Exito',
    description: 'La devolución se ha enviado exitosamente!',
  },
  info: { message: 'Información', description: '' },
};

const statusesGroups = {
  error: {
    message: 'Error',
    description: 'No se pudo crear el grupo, intente nuevamente mas tarde',
  },
  success: {
    message: 'Exito',
    description: 'Se creó el grupo exitosamente',
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
