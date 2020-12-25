import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { KeyboardDatePicker } from '@material-ui/pickers';
// import { editUser } from '../actions';
import AddFormLandingLoader from './AddFormLandingLoader';
// import { SignalCellularNullSharp } from '@material-ui/icons';

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
  const url = new URL(window.location.href);
  const userId = url.searchParams.get('userId');
  const [name, setName] = useState(null);
  const [amountDue, setamountDue] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [doj, setDOJ] = useState(null);
  // eslint-disable-next-line max-len
  const [dueDate, setdueDate] = useState(null);
  const [dob, setDOB] = useState(null);
  const history = useHistory(null);
  // const dispatch = useDispatch();
  // const editUserStatus = useSelector((state) => state.users.editUserStatus);
  const [loadingState, setLoadingState] = useState(false);
  async function editUserDatabase(user) {
    setLoadingState(true);
    await fetch(`https://bolt-backend.herokuapp.com/api/edit_user?userId=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    history.push('/users');
    setLoadingState(false);
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
    editUserDatabase(user);
  }
  async function getUserDetails() {
    // const res = await fetch(`http://localhost:8080/api/get_user/?userId=${userId}`);
    // console.log(userId);
    const res = await fetch(`https://bolt-backend.herokuapp.com/api/get_user?userId=${userId}`);
    const user = await res.json();
    // console.log(user);
    setName(user.name);
    setamountDue(user.dueAmount);
    setMobileNo(user.mobileNo);
    setDOJ(user.doj);
    setDOB(user.dob);
    setdueDate(user.dueDate);
  }
  useEffect(() => {
    getUserDetails(userId);
  }, []);
  let componentToRender = null;
  if (name === null || loadingState === true) {
    componentToRender = <AddFormLandingLoader />;
  } else {
    componentToRender = (
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
  return (componentToRender);
}
