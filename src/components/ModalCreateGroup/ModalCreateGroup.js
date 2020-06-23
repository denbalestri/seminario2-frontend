import React, { useState, useEffect } from 'react';
import { Modal, Input, Form } from 'antd';
import Button from '../../components/Button';
import Select from '../Select';
import { isEmpty } from 'lodash';
const { TextArea } = Input;
const genreMap = {
  Romantico: 'Romántico',
  Aventuras: 'Aventuras',
  Terror: 'Terror',
  Drama: 'Drama',
  Fantastico: 'Fantástico',
  Comedia: 'Comedia',
  Poema: 'Poemas',
};
const literaryTypesMap = {
  Cuento: 'Cuentos',
  Poesia: 'Poesía',
  Novela: 'Novelas',
};

const initialState = {
  titleGroup: '',
  literaryType: [],
  genre: [],
  description: '',
};
const ModalCreateGroup = ({ visible, onCancel, onSubmit, loading }) => {
  const [form, setForm] = useState(initialState);
  const [formError, setFormError] = useState([]);
  const placeholderGenre = 'Seleccione el género';
  const textErrorGenre = 'Por favor, agregue el género';
  const descripctionText = 'Descripción del grupo';
  const textErrorDescription = 'Por favor, agregue la descripción del grupo';
  useEffect(() => {
    if (visible) {
      setForm(initialState);
      setFormError([]);
    }
  }, [visible]);

  const onLocalSubmit = () => {
    if (checkEmptyForm()) onSubmit(form);
    else {
      getEmptyFields();
    }
  };

  const getEmptyFields = () => {
    let fieldsKeys = [];
    const arrayForm = Object.entries(form);
    arrayForm.map((field, index) => {
      const valueField = field[1];
      if (isEmpty(valueField)) {
        const keyField = field[0];
        fieldsKeys.push(keyField);
      }
    });
    setFormError(fieldsKeys);
  };

  const checkEmptyForm = () => {
    return Object.values(form).every(field => !isEmpty(field));
  };

  const onChangeTitleGroup = e => {
    const titleGroup = e.target.value;
    setForm({ ...form, titleGroup });
  };

  const onChangeGenre = genre => {
    setForm({
      ...form,
      genre,
    });
  };

  const onChangeLiteraryTypes = literaryType => {
    setForm({
      ...form,
      literaryType,
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
      {formError.includes('titleGroup') ? (
        <Form.Item
          validateStatus="error"
          help="Por favor, escriba el titulo del grupo"
        >
          <Input
            placeholder="Nombre del grupo..."
            tyle={{ marginTop: 10, width: 300 }}
            onChange={onChangeTitleGroup}
            value={form.titleGroup}
          />
        </Form.Item>
      ) : (
        <Input
          placeholder="Nombre del grupo..."
          value={form.titleGroup}
          style={{ marginTop: 10, width: 300 }}
          onChange={onChangeTitleGroup}
        />
      )}

      {formError.includes('literaryType') ? (
        <Form.Item
          validateStatus="error"
          help="Por favor, agregue un tipo de texto literario"
        >
          <Select
            placeholder="Tipos de textos literarios"
            optionItems={literaryTypesMap}
            valueSelected={form.literaryType}
            onChange={onChangeLiteraryTypes}
            style={{ marginTop: 20 }}
          />
        </Form.Item>
      ) : (
        <Select
          placeholder="Tipos de textos literarios"
          optionItems={literaryTypesMap}
          valueSelected={form.literaryType}
          onChange={onChangeLiteraryTypes}
          style={{ marginTop: 20 }}
        />
      )}

      {formError.includes('genre') ? (
        <Form.Item validateStatus="error" help={textErrorGenre}>
          <Select
            placeholder={placeholderGenre}
            optionItems={genreMap}
            valueSelected={form.genre}
            onChange={onChangeGenre}
            style={{ marginTop: 20 }}
          />
        </Form.Item>
      ) : (
        <Select
          placeholder={placeholderGenre}
          optionItems={genreMap}
          valueSelected={form.genre}
          onChange={onChangeGenre}
          style={{ marginTop: 20 }}
        />
      )}
      <p style={{ fontSize: 15, marginTop: 10 }}>{descripctionText}</p>

      {formError.includes('description') ? (
        <Form.Item validateStatus="error" help={textErrorDescription}>
          <TextArea
            rows={4}
            value={form.description}
            onChange={onChangeDescription}
          />
        </Form.Item>
      ) : (
        <TextArea
          rows={4}
          value={form.description}
          onChange={onChangeDescription}
        />
      )}
    </Modal>
  );
};

export default ModalCreateGroup;
