import React, { useState } from 'react';

import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

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
  genre: [],
  rating: '',
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
    onClickSearch(form);
  };
  const handleGenreClose = () => {
    setOpenGenre(false);
  };

  const handleGenreOpen = () => {
    setOpenGenre(true);
  };

  const onChangeRating = (event, rating) => {
    setForm({
      ...form,
      rating,
    });
  };
  return (
    <section className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="genre" className={classes.inputGenre}>
          Género
        </InputLabel>
        <Select
          value={form.genre}
          onChange={onChangeGenre}
          open={openGenre}
          onClose={handleGenreClose}
          onOpen={handleGenreOpen}
          inputProps={{
            name: 'genre',
            id: 'genre',
          }}
          className={classes.select}
        >
          {Object.keys(genreMap).map((genre, index) => {
            return (
              <MenuItem value={genre} key={index}>
                {genreMap[genre]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <section className={classes.section}>
        <p className={classes.rating}>Clasificaciones mínimas</p>
        <Rating
          name="half-rating-read"
          defaultValue={0}
          precision={0.5}
          onChange={onChangeRating}
        />
      </section>
      <IconButton onClick={onLocalClickSearch} className={classes.searchButton}>
        <SearchIcon />
      </IconButton>
    </section>
  );
};

export default Search;
