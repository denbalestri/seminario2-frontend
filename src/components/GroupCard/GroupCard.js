import React from 'react';
import { Card } from 'antd';
import clsx from 'clsx';
import useStyles from './styles';
const GroupCard = ({
  image,
  title,
  literaryType,
  onClickCard,
  selected,
  genre,
}) => {
  const classes = useStyles();
  const cardStyles = clsx({
    [classes.root]: true, //always apply
    [classes.cardSelected]: selected, //only when selected === true
  });

  const onLocalClickCard = () => {
    onClickCard(title);
  };
  return (
    <Card className={cardStyles} hoverable onClick={onLocalClickCard}>
      <section style={{ display: 'flex', height: 100 }}>
        <img src={image} style={{ width: 80, height: 60 }} alt="grupo"></img>
        <aside style={{ marginLeft: 10 }}>
          <p style={{ fontSize: 13, marginTop: '-10px' }}>{title}</p>
          <p style={{ fontSize: 12, marginTop: '-10px' }}>
            Tipo Literario: {literaryType}
          </p>
          <p style={{ fontSize: 12, marginTop: '-10px' }}>Genero: {genre}</p>
        </aside>
      </section>
    </Card>
  );
};

export default GroupCard;
