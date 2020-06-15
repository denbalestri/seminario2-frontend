import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles';
const SearchGroups = ({ onClickCreateGroup, onClickSearchGroup }) => {
  const classes = useStyles();
  const [group, setGroup] = useState('');

  const onChange = e => {
    const group = e.target.value;
    setGroup(group);
  };

  return (
    <>
      <section style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p
          style={{
            fontSize: 25,
            marginLeft: 15,
            marginTop: 20,
            fontWeight: 600,
          }}
        >
          Grupos
        </p>
        <IconButton
          color="primary"
          component="span"
          onClick={onClickCreateGroup}
        >
          <AddCircleIcon fontSize="large" />
          <p style={{ fontSize: 15, marginLeft: 5, marginTop: 13 }}>
            Crear grupo
          </p>
        </IconButton>
      </section>
      <section
        style={{
          borderRadius: '2em',
          border: 'solid 2px',
          display: 'flex',
          width: '25vw',
          marginLeft: 5,
        }}
      >
        <InputBase
          className={classes.input}
          placeholder="Buscar grupos"
          onChange={onChange}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={() => onClickSearchGroup(group)}
        >
          <SearchIcon />
        </IconButton>
      </section>
    </>
  );
};

export default SearchGroups;
