import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

const MainProfessional = ({ avatar, professional, rating }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          component="img"
          alt="Persona"
          height="140"
          image={avatar}
        />
        <section className={classes.section}>
          <p className={classes.title}>{professional}</p>
          <p className={classes.subTitle}>Opiniones</p>
          <Rating
            name="half-rating-read"
            precision={0.5}
            value={rating}
            readOnly
          />
        </section>
      </CardActionArea>
    </Card>
  );
};

export default MainProfessional;
