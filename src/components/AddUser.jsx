import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { KeyboardDatePicker } from '@material-ui/pickers';
// import { addUser } from '../actions';
import AddFormLandingLoader from './AddFormLandingLoader';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    margin: '80px 10px 0px 10px',
  },
  textField: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
  },
  button: {
    width: '300px',
    marginRight: '200px',
  },
}));

export default function AddUserForm() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [amountDue, setamountDue] = useState(600);
  const [mobileNo, setMobileNo] = useState('');
  const [doj, setDOJ] = useState(new Date());
  // eslint-disable-next-line max-len
  const [dueDate, setdueDate] = useState(new Date((new Date()).setMonth((new Date()).getMonth() + 1)));
  const [dob, setDOB] = useState(null);
  const history = useHistory();
  // const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState(false);
  async function addUserToDataBase(user) {
    setLoadingState(true);
    await fetch('https://bolt-backend.herokuapp.com/api/add_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    setLoadingState(false);
    // dispatch();
    history.push({
      pathname: '/',
      newUserAdded: true,
    });
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    const user = {
      name,
      mobileNo,
      amountDue,
      doj,
      dueDate,
      dob,
    };
    addUserToDataBase(user);
    // dispatch();
    // history.push('/');
    // dispatch(getUsers());
  }
  if (loadingState === true) return <AddFormLandingLoader />;
  return (
    <Paper className={classes.paper} elevation={3}>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleFormSubmit}>
        <div className={classes.textField}>
          <TextField
            required
            id="outlined-text"
            label="Name"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className={classes.textField}>
          <TextField
            required
            id="outlined-text"
            label="Mobile No"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={(e) => setMobileNo(e.target.value)}
            value={mobileNo}
            type="number"
          />
        </div>

        <div className={classes.textField}>
          <KeyboardDatePicker
            required
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="DOJ"
            format="dd/MM/yyyy"
            value={doj}
            InputAdornmentProps={{ position: 'start' }}
            onChange={(date) => setDOJ(date)}
          />
        </div>
        <div className={classes.textField}>
          <KeyboardDatePicker
            required
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="DOB"
            format="dd/MM/yyyy"
            value={dob}
            InputAdornmentProps={{ position: 'start' }}
            onChange={(date) => setDOB(date)}
          />
        </div>

        <div className={classes.textField}>
          <TextField
            required
            id="outlined-text"
            label="Amount Due"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={(e) => setamountDue(e.target.value)}
            value={amountDue}
            type="number"
          />
        </div>

        <div className={classes.textField}>
          <KeyboardDatePicker
            required
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="Due Date"
            format="dd/MM/yyyy"
            value={dueDate}
            InputAdornmentProps={{ position: 'start' }}
            onChange={(date) => setdueDate(date)}
          />
        </div>
        <div className={classes.button}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </div>
      </form>
    </Paper>
  );
}
