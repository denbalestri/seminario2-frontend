import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

const InformationCard = ({ professional }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item>
          <img
            className={classes.img}
            alt="profesional"
            src={professional.avatar}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {professional.professional}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {professional.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {professional.descriptionProfessional}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              {' '}
              {professional.professional} ha corregido{' '}
              {professional.quantityReviews} obras
            </Typography>
            <Typography variant="subtitle1">
              {' '}
              Opiniones
              <Rating
                name="half-rating-read"
                defaultValue={2.5}
                precision={0.5}
                readOnly
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InformationCard;
