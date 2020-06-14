import React, { useState, useEffect } from 'react';
import { Modal, Upload, Input } from 'antd';
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
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const placeholderReview = 'Seleccione un nivel de cr\u00EDtica';
  const placeholderGenre = 'Seleccione el g\u00E9nero';
  const descripctionText = ' Escriba una descripci\u00F3n de la obra';
  useEffect(() => {
    setFile({});
    setFileList([]);
  }, [visible]);

  const onLocalSendWork = () => {
    const work = {
      form,
      file,
    };
    onSendWork(work);
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

  const handleDateChange = date => {
    setSelectedDate(date);
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
      <Select
        placeholder={placeholderReview}
        optionItems={optionItemsReview}
        valueSelected={form.review}
        onChange={onChangeReview}
      />
      <Select
        placeholder={placeholderGenre}
        optionItems={genreMap}
        valueSelected={form.genre}
        onChange={onChangeGenre}
      />
      <Input
        placeholder="Nombre de la obra..."
        prefix={<ReadOutlined />}
        value={form.nameWork}
        style={{ marginTop: 10, width: 300 }}
        onChange={onChangeNameWork}
      />
      <p style={{ fontSize: 15, marginTop: 10 }}>{descripctionText}</p>
      <TextArea
        rows={4}
        value={form.description}
        onChange={onChangeDescription}
      />
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
