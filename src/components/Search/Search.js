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
      style={{
        display: 'flex',
        width: '600px',
        justifyContent: 'space-around',
        alignItems: 'center',
        border: '4px solid #0038e17a',
        padding: '5px 0',
        borderRadius: '10px',
      }}
    >
      <FormControl className={classes.formControl}>
        <InputLabel
          htmlFor="genre"
          style={{
            fontSize: 20,
          }}
        >
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
          style={{ width: 180, marginRight: 20 }}
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
      <section
        style={{
          marginRight: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 20,
            marginBottom: 0,
          }}
        >
          Rating mínimo
        </p>
        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} />
      </section>
      <IconButton
        onClick={onLocalClickSearch}
        style={{
          justifySelf: 'flex-end',
          color: 'rgba(0, 56, 225, 0.74)',
          transform: 'scale(1.7)',
        }}
      >
        <SearchIcon />
      </IconButton>
    </section>
  );
};

export default Search;
