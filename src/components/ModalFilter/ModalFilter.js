import React, { useState } from 'react';
import { Modal } from 'antd';
import Button from '../../components/Button';
import Select from '../Select';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
const optionItems = [
  'Romantico',
  'Aventura',
  'Accion',
  'Terror',
  'Suspenso',
  'Drama',
  'Poesia',
];
const initialState = {
  genre: [],
  reviews: '',
};
const ModalFilter = ({ open, handleCancel, onClickFilter }) => {
  const [form, setForm] = useState(initialState);
  const placeholderGenre = 'Seleccione el g\u00E9nero';

  const onChangeGenre = genre => {
    setForm({
      ...form,
      genre,
    });
  };

  const onLocalClickFilter = () => {
    onClickFilter(form);
  };
  const onChangeReviews = (event, reviews) => {
    setForm({
      ...form,
      reviews,
    });
  };

  return (
    <div>
      <Modal
        title="Filtros"
        visible={open}
        onCancel={handleCancel}
        footer={[
          <Button type="" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button type="primary" onClick={onLocalClickFilter}>
            Aplicar
          </Button>,
        ]}
      >
        <section style={{ display: 'flex' }}>
          <Typography style={{ marginTop: 10, marginRight: 10 }} gutterBottom>
            Literatura experta
          </Typography>
          <Select
            placeholder={placeholderGenre}
            optionItems={optionItems}
            valueSelected={form.genre}
            onChange={onChangeGenre}
          />
        </section>
        <Typography style={{ marginTop: 10 }} gutterBottom>
          Correciones
        </Typography>
        <Slider
          defaultValue={30}
          valueLabelDisplay="auto"
          step={10}
          marks
          onChange={onChangeReviews}
        />
      </Modal>
    </div>
  );
};

export default ModalFilter;
