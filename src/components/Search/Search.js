import React, { useState } from 'react';

import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
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
const Search = ({ onClickSearch }) => {
  const classes = useStyles();
  const [form, setForm] = useState(initialState);
  const [openGenre, setOpenGenre] = useState(false);
  const onChangeGenre = e => {
    const genre = e.target.value;
    setForm({
      ...form,
      genre,
    });
  };

  const onLocalClickSearch = () => {
    //send data
    //onClickSearch();
  };
  const handleGenreClose = () => {
    setOpenGenre(false);
  };

  const handleGenreOpen = () => {
    setOpenGenre(true);
  };
  return (
    <section
      style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
    >
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="genre">Genero</InputLabel>
        <Select
          value={form.genre}
          onChange={onChangeGenre}
          open={openGenre}
          onClose={handleGenreClose}
          onOpen={handleGenreOpen}
          style={{ width: 400, marginRight: 20 }}
        >
          <MenuItem value="">
            <em>Seleccione un genero</em>
          </MenuItem>
          {optionItems.map((value, index) => {
            return (
              <MenuItem value={value} key={index}>
                {value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <section style={{ marginRight: 20, display: 'flex' }}>
        <p
          style={{
            fontFamily: 'Ubuntu',
            alignSelf: 'flex-end',
            fontSize: 20,
            marginRight: 15,
          }}
        >
          Opiniones
        </p>
        <Rating
          name="half-rating-read"
          style={{ alignSelf: 'center' }}
          defaultValue={2.5}
          precision={0.5}
        />
      </section>
      <Button
        variant="contained"
        color="secondary"
        onClick={onLocalClickSearch}
        style={{
          height: 50,
          marginLeft: 10,
          background: '#667db6' /* fallback for old browsers */,
          background:
            '-webkit-linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
          background:
            'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
        }}
      >
        Buscar
      </Button>
    </section>
  );
};

export default Search;
