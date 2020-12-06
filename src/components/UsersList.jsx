/* eslint-disable dot-notation */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getUsers } from '../actions';
import UserDetailsCard from './UserDetailsCard';
// function sortUsersByName() {
//   // Declare variables
//   const input = document.getElementById('myInput');
//   const filter = input.value.toUpperCase();
//   const ul = document.getElementById('userList');
//   const li = ul.getElementsByTagName('li');
//   const a = null;
//   const txtValue = null;
//   // Loop through all list items, and hide those who don't match the search query
//   for (let i = 0; i < li.length; i++) {
//     a = li[i].getElementsByTagName("a")[0];
//     txtValue = a.textContent || a.innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// }
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),

    },
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
export default function UsersList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const getUsersStatus = useSelector((state) => state.users.getUsersStatus);
  const users = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(getUsers());
  }, [getUsers]);
  if (getUsersStatus.failed === true) {
    return (<div>Check Your InterNet connectivity!</div>);
  }
  if (getUsersStatus.successful !== true) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }
  const renderedUsersList = users.map((user) => {
    const dob = new Date(user.dob);
    const dobString = new Date(dob.getTime() - (dob.getTimezoneOffset() * 60000))
      .toISOString()
      .split('T')[0];
    const doj = new Date(user.doj);
    const dojString = new Date(doj.getTime() - (doj.getTimezoneOffset() * 60000))
      .toISOString()
      .split('T')[0];
    const dueDate = new Date(user.dueDate);
    const dueDateString = new Date(dueDate.getTime() - (dueDate.getTimezoneOffset() * 60000))
      .toISOString()
      .split('T')[0];
    // eslint-disable-next-line dot-notation
    return (
      <UserDetailsCard
        key={user['_id']}
        name={user.name}
        dob={dobString}
        doj={dojString}
        dueDate={dueDateString}
        dueAmount={user.dueAmount}
        attendance={user.attendance.length}
      />
    );
  });

  return (
    <>
      {/* <DailyCount /> */}
      <ul className="userList">
        {renderedUsersList}
      </ul>
    </>
  );
}
