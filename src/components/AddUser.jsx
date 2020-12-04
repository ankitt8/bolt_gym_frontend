import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { KeyboardDatePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';

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
    margin: '0px 10px 0px 10px',
  },
  textField: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
  },
  button: {
    width: '300px',
    height: '40px',
    marginRight: '200px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
export default function AddUserForm({ addUser }) {
  const [name, setName] = useState('');
  const [feesRemaining, setFeesRemaining] = useState(600);
  const [mobileNo, setMobileNo] = useState('');
  const [doj, handleDOJChange] = useState(new Date());
  const classes = useStyles();
  function handleFormSubmit(e) {
    e.preventDefault();
    const user = {
      name,
      feesRemaining,
      mobileNo,
      doj,
    };
    addUser(user);
  }
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
            onChange={(date) => handleDOJChange(date)}
          />
        </div>

        <div className={classes.textField}>
          <TextField
            required
            id="outlined-text"
            label="Fees Remaining"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={(e) => setFeesRemaining(e.target.value)}
            value={feesRemaining}
            type="number"
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
AddUserForm.propTypes = {
  addUser: PropTypes.func.isRequired,
};
