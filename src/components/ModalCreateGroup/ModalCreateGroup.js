import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import Button from '../../components/Button';
import Select from '../Select';
const { TextArea } = Input;
const genreMap = {
  Romantico: 'Romántico',
  Aventuras: 'Aventuras',
  accion: 'Acción',
  Terror: 'Terror',
  Drama: 'Drama',
  Fantastico: 'Fantastico',
  Comedia: 'Comedia',
  Poema: 'Poemas',
};
const literaryTypesMap = {
  Cuento: 'Cuentos',
  Poesia: 'Poesias',
  Novela: 'Novelas',
};

const initialState = {
  titleGroup: '',
  literaryTypes: [],
  genres: [],
  description: '',
};
const ModalCreateGroup = ({ visible, onCancel, onSubmit, loading }) => {
  const [form, setForm] = useState(initialState);
  const placeholderGenre = 'Seleccione el/los g\u00E9neros';
  const descripctionText = 'Descripci\u00F3n del grupo';
  useEffect(() => {
    if (visible) setForm(initialState);
  }, [visible]);

  const onLocalSubmit = () => {
    onSubmit(form);
  };
  const onChangeTitleGroup = e => {
    const titleGroup = e.target.value;
    setForm({ ...form, titleGroup });
  };

  const onChangeGenre = genres => {
    setForm({
      ...form,
      genres,
    });
  };

  const onChangeLiteraryTypes = literaryTypes => {
    setForm({
      ...form,
      literaryTypes,
    });
  };

  const onChangeDescription = event => {
    const description = event.target.value;
    setForm({
      ...form,
      description,
    });
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      style={{ fontFamily: 'Ubuntu' }}
      title="Crear Grupo"
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        fontFamily: 'Ubuntu',
      }}
      footer={[
        <Button type="" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button type="primary" loading={loading} onClick={onLocalSubmit}>
          Crear grupo
        </Button>,
      ]}
    >
      <Input
        placeholder="Nombre del grupo..."
        value={form.titleGroup}
        style={{ marginTop: 10, width: 300, marginBottom: 20 }}
        onChange={onChangeTitleGroup}
      />
      <Select
        placeholder="Tipos de textos literarios"
        optionItems={literaryTypesMap}
        valueSelected={form.literaryTypes}
        onChange={onChangeLiteraryTypes}
        style={{ marginBottom: 20 }}
      />
      <Select
        placeholder={placeholderGenre}
        optionItems={genreMap}
        valueSelected={form.genre}
        onChange={onChangeGenre}
        style={{ marginBottom: 20 }}
      />
      <p style={{ fontSize: 15, marginTop: 10 }}>{descripctionText}</p>
      <TextArea
        rows={4}
        value={form.description}
        onChange={onChangeDescription}
      />
    </Modal>
  );
};

export default ModalCreateGroup;
