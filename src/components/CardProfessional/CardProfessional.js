import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setProfessionalSelected } from '../../redux/actions/professionals';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';

import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import CardActionArea from '@material-ui/core/CardActionArea';
import ButtonBase from '@material-ui/core/ButtonBase';
import useStyles from './styles';

const CardProfessional = ({
  avatar,
  professional,
  description,
  descriptionProfessional,
  initials,
  quantityReviews,
  userProfessional,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const onClickProfessional = () => {
    const professionalProps = {
      avatar,
      professional,
      userProfessional,
      description,
      descriptionProfessional,
      initials,
      quantityReviews,
    };
    dispatch(setProfessionalSelected(professionalProps));
    history.push('/informacion-profesional');
  };

  return (
    <Card className={classes.root}>
      <ButtonBase onClick={onClickProfessional}>
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {initials}
              </Avatar>
            }
            title={professional}
            subheader={description}
          />
          <CardMedia
            className={classes.media}
            image={avatar}
            title="Profesionales"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {descriptionProfessional}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            Opiniones
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
          </CardActions>
        </CardActionArea>
      </ButtonBase>
    </Card>
  );
};

export default CardProfessional;
