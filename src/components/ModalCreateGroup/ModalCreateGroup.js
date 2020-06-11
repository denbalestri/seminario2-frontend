import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import Button from '../../components/Button';
import Select from '../Select';

const genreMap = {
  romantico: 'Romántico',
  aventura: 'Aventura',
  accion: 'Acción',
  terror: 'Terror',
  suspenso: 'Suspenso',
  drama: 'Drama',
  poesia: 'Poesía',
};
const literaryTypesMap = {
  cuento: 'Cuentos',
  poesia: 'Poesias',
  novela: 'Novelas',
  cuentosCortos: 'Cuentos Cortos',
  fabulas: 'Fabulas',
};
const initialState = {
  titleGroup: '',
  literaryTypes: [],
  genres: [],
};
const ModalCreateGroup = ({ visible, onCancel, onSubmit, loading }) => {
  const [form, setForm] = useState(initialState);
  const placeholderGenre = 'Seleccione el/los g\u00E9neros';

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
        mode="multiple"
      />
      <Select
        placeholder={placeholderGenre}
        optionItems={genreMap}
        valueSelected={form.genre}
        onChange={onChangeGenre}
        style={{ marginBottom: 20 }}
        mode="multiple"
      />
    </Modal>
  );
};

export default ModalCreateGroup;
