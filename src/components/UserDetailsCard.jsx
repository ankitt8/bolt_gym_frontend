/* eslint-disable react/require-default-props */
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
// import profileImg from '../static/images/profi.png';

const useStyles = makeStyles((theme) => ({
  button: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  root: {
    display: 'flex',
    // height: 100,
    backgroundColor: grey,
    // border: '1px solid grey',
    margin: '30px 10px',
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
  contentDiv: {
    display: 'flex',
    margin: '5px',
    padding: '0px',
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

export default function UserDetailsCard({
  id, name, dob, doj, dueAmount, dueDate, attendance,
}) {
  // console.log(intime);
  const classes = useStyles();
  return (
    <Card className={classes.root} data-name={name}>
      {/* <CardMedia
        className={classes.cover}
        image="../../public/profile.png"
        title="Profile"
      /> */}
      {/* <img src={profileImg} alt="ProfileImg" className={classes.cover} /> */}
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div className={classes.contentDiv}>
            <Typography component="h5" variant="h5" color="textSecondary">
              Name:
            </Typography>
            <Typography component="h5" variant="h5" color="textPrimary" style={{ marginLeft: '10px' }}>
              {name}
            </Typography>
          </div>
          <div className={classes.contentDiv}>
            <Typography component="h5" variant="h5" color="textSecondary">
              DOB:
            </Typography>
            <Typography component="h5" variant="h5" color="textPrimary" style={{ marginLeft: '10px' }}>
              {dob}
            </Typography>
          </div>
          <div className={classes.contentDiv}>
            <Typography component="h5" variant="h5" color="textSecondary">
              DOJ:
            </Typography>
            <Typography component="h5" variant="h5" color="textPrimary" style={{ marginLeft: '10px' }}>
              {doj}
            </Typography>
          </div>
          <div className={classes.contentDiv}>
            <Typography component="h5" variant="h5" color="textSecondary">
              DueAmount:
            </Typography>
            <Typography component="h5" variant="h5" color="textPrimary" style={{ marginLeft: '10px' }}>
              {dueAmount}
            </Typography>
          </div>
          <div className={classes.contentDiv}>
            <Typography component="h5" variant="h5" color="textSecondary">
              DueDate:
            </Typography>
            <Typography component="h5" variant="h5" color="textPrimary" style={{ marginLeft: '10px' }}>
              {dueDate}
            </Typography>
          </div>
          <div className={classes.contentDiv}>
            <Typography component="h5" variant="h5" color="textSecondary">
              Attendance:
            </Typography>
            <Typography component="h5" variant="h5" color="textPrimary" style={{ marginLeft: '10px' }}>
              {attendance}
            </Typography>
          </div>
        </CardContent>
        <Link to={`/edit_user?userId=${id}`}>
          <Button
            variant="outlined"
            // onClick={() => handleEditButtonClick(id)}
            // startIcon={<ArrowForwardIcon />}
          >
            Edit
          </Button>
        </Link>
      </div>
    </Card>
  );
}
UserDetailsCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  dob: PropTypes.string,
  doj: PropTypes.string,
  dueDate: PropTypes.string,
  dueAmount: PropTypes.number,
  attendance: PropTypes.number,
};
