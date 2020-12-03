/* eslint-disable react/require-default-props */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useDispatch } from 'react-redux';
import profileImg from '../static/images/profi.png';
import { updateINTime, updateOUTTime } from '../actions';

const useStyles = makeStyles((theme) => ({
  button: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  root: {
    display: 'flex',
    height: 100,
    backgroundColor: grey,
    // border: '1px solid grey',
    margin: '10px 5px',
    padding: '10px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 0px 0px 10px',
  },
  content: {
    flex: '1 0 auto',
    padding: '10px',
  },
  cover: {
    width: 100,
  },
  controls: {
    position: 'fixed',
    display: 'flex',
  },
  buttonIndividual: {
    margin: '0px 30px 0px 0px',
  },
}));

export default function UserCard({
  id, name, inTime = null, outTime = null,
}) {
  // const [inTime, inTimeClicked] = setState(false);
  // const [outTime, outTimeClicked] = setState(false);
  const dispatch = useDispatch();
  function handleInTimeClick() {
    dispatch(updateINTime(id));
  }
  function handleOutTimeClick() {
    dispatch(updateOUTTime(id));
  }
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      {/* <CardMedia
        className={classes.cover}
        image="../../public/profile.png"
        title="Profile"
      /> */}
      <img src={profileImg} alt="ProfileImg" className={classes.cover} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {name}
          </Typography>

        </CardContent>
        <div className={classes.button}>
          {inTime
            ? (
              <Typography style={{ display: 'inline' }} className={classes.title} variant="h5" noWrap>
                {inTime}
              </Typography>
            )
            : (
              <Button
                className={classes.buttonIndividual}
                variant="outlined"
                onClick={handleInTimeClick}
                startIcon={<ArrowBackIcon />}
              >
                IN
              </Button>
            )}
          {outTime
            ? (
              <Typography style={{ display: 'inline' }} className={classes.title} variant="h5" noWrap>
                {outTime}
              </Typography>
            )
            : (
              <Button
                variant="outlined"
                onClick={() => handleOutTimeClick(id)}
                startIcon={<ArrowForwardIcon />}
              >
                OUT
              </Button>
            )}
        </div>
      </div>

    </Card>
  );
}
UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inTime: PropTypes.string,
  outTime: PropTypes.string,
};
