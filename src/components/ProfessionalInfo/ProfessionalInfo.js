import React, { useState, useEffect } from 'react';
import { Upload, Input } from 'antd';
import { useSelector } from 'react-redux';
import InformationCard from '../InformationCard';
import { UploadOutlined, ReadOutlined } from '@ant-design/icons';

import Button from '../../components/Button';
import Select from '../Select';
import useStyles from './styles';

const optionItemsReview = ['Objetiva', 'Subjetiva'];
const optionItemsGenre = [
  'Romantico',
  'Aventura',
  'Accion',
  'Terror',
  'Suspenso',
  'Drama',
];
const initialState = {
  nameWork: '',
  review: [],
  genre: [],
};
const ProfessionalInfo = () => {
  const classes = useStyles();
  const professional = useSelector(
    state => state.professionals.professionalSelected
  );
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState({});
  const [form, setForm] = useState(initialState);
  const placeholderReview = 'Seleccione un nivel de cr\u00EDtica';
  const placeholderGenre = 'Seleccione el g\u00E9nero';
  useEffect(() => {
    setFile({});
    setFileList([]);
    setForm(initialState);
  }, []);

  const onLocalSendWork = () => {
    const work = {
      form,
      file,
    };
    //onSendWork(work);
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

  const onChangeGenre = genre => {
    setForm({
      ...form,
      genre,
    });
  };
  return (
    <div className={classes.root}>
      <InformationCard professional={professional} />
      <aside className={classes.aside}>
        <Select
          placeholder={placeholderReview}
          optionItems={optionItemsReview}
          valueSelected={form.review}
          onChange={onChangeReview}
        />
        <Select
          placeholder={placeholderGenre}
          optionItems={optionItemsGenre}
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
        <section style={{ marginTop: 20 }}>
          <Upload {...uploadProps} onChange={handleChange}>
            <Button type="">
              <UploadOutlined /> Elegir archivo
            </Button>
          </Upload>
        </section>
      </aside>
    </div>
  );
};

export default ProfessionalInfo;
