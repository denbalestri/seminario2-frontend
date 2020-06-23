import React, { useState, useEffect } from 'react';
import { Modal, Upload, Input, Form } from 'antd';
import { UploadOutlined, ReadOutlined } from '@ant-design/icons';
import isEmpty from 'lodash/isEmpty';
import Button from '../../components/Button';
import Select from '../Select';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const { TextArea } = Input;
const optionItemsReview = {
  Objetiva: 'Objetiva',
  Subjetiva: 'Subjetiva',
};
const genreMap = {
  romantico: 'Romántico',
  aventura: 'Aventura',
  accion: 'Acción',
  terror: 'Terror',
  suspenso: 'Suspenso',
  drama: 'Drama',
  poesia: 'Poesía',
};
const initialState = {
  nameWork: '',
  review: [],
  genre: [],
  description: '',
};
const ModalSendWork = ({
  visible,
  loading,
  professional,
  onCancel,
  onSendWork,
}) => {
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState({});
  const [form, setForm] = useState(initialState);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formError, setFormError] = useState([]);
  useEffect(() => {
    setFile({});
    setFileList([]);
    setSelectedDate(null);
  }, [visible]);

  const onLocalSendWork = () => {
    let date;
    if (selectedDate) date = convertDate(selectedDate);
    else date = '';
    const work = {
      form,
      date,
      file,
    };
    if (checkEmptyForm()) onSendWork(work);
    else {
      getEmptyFields();
    }
  };

  const handleChange = info => {
    setFile(info.file);
    setFileList(info.fileList.slice(-1));
  };

  const uploadProps = {
    name: 'obra',
    customRequest: ({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0),
    fileList,
    onChange: handleChange,
  };

  useEffect(() => {
    setForm(initialState);
  }, [visible]);

  const onChangeNameWork = e => {
    const nameWork = e.target.value;
    setForm({ ...form, nameWork });
  };

  const onChangeReview = review => {
    setForm({
      ...form,
      review,
    });
  };

  const onChangeDescription = event => {
    const description = event.target.value;
    setForm({
      ...form,
      description,
    });
  };

  const onChangeGenre = genre => {
    setForm({
      ...form,
      genre,
    });
  };
  const convertDate = date => {
    var newDate = new Date(date),
      mnth = ('0' + (newDate.getMonth() + 1)).slice(-2),
      day = ('0' + newDate.getDate()).slice(-2);
    return [day, mnth, newDate.getFullYear()].join('-');
  };
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const checkEmptyForm = () => {
    return Object.values(form).every(field => !isEmpty(field));
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

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      style={{ fontFamily: 'Ubuntu' }}
      title={`Enviar obra a ${professional}`}
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
        <Button
          type="primary"
          loading={loading}
          onClick={onLocalSendWork}
          disabled={isEmpty(file)}
        >
          Enviar
        </Button>,
      ]}
    >
      {formError.includes('review') ? (
        <Form.Item validateStatus="error" help="Por favor, agregue una crítica">
          <Select
            placeholder="Seleccione un nivel de crítica"
            optionItems={optionItemsReview}
            valueSelected={form.review}
            onChange={onChangeReview}
          />
        </Form.Item>
      ) : (
        <Select
          placeholder="Seleccione un nivel de crítica"
          optionItems={optionItemsReview}
          valueSelected={form.review}
          onChange={onChangeReview}
        />
      )}
      {formError.includes('genre') ? (
        <Form.Item validateStatus="error" help="Por favor, agregue un género">
          <Select
            placeholder="Seleccione el género"
            optionItems={genreMap}
            valueSelected={form.genre}
            onChange={onChangeGenre}
          />
        </Form.Item>
      ) : (
        <Select
          placeholder="Seleccione el género"
          optionItems={genreMap}
          valueSelected={form.genre}
          onChange={onChangeGenre}
        />
      )}
      {formError.includes('nameWork') ? (
        <Form.Item
          validateStatus="error"
          help="Por favor, agregue un nombre a la obra"
        >
          <Input
            placeholder="Nombre de la obra..."
            prefix={<ReadOutlined />}
            value={form.nameWork}
            style={{ marginTop: 10, width: 300 }}
            onChange={onChangeNameWork}
          />
        </Form.Item>
      ) : (
        <Input
          placeholder="Nombre de la obra..."
          prefix={<ReadOutlined />}
          value={form.nameWork}
          style={{ marginTop: 10, width: 300 }}
          onChange={onChangeNameWork}
        />
      )}

      <p style={{ fontSize: 15, marginTop: 10 }}>
        Escriba una descripción de la obra
      </p>
      {formError.includes('description') ? (
        <Form.Item
          validateStatus="error"
          help="Por favor, agregue una descripción"
        >
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

      <section
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          marginBottom: 10,
        }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date"
            label="Fecha limite"
            value={selectedDate}
            onChange={handleDateChange}
            disablePast
            autoOk
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </section>
      <section style={{ marginTop: 20 }}>
        <Upload {...uploadProps} onChange={handleChange}>
          <Button type="">
            <UploadOutlined /> Elegir archivo
          </Button>
        </Upload>
      </section>
    </Modal>
  );
};

export default ModalSendWork;
