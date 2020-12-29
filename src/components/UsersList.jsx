/* eslint-disable dot-notation */
import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getUsers } from '../actions';
import UserDetailsCard from './UserDetailsCard';
import SearchBar from './SearchBar';

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
function sortUsersByNameAsc(users) {
  const sortedUsers = users.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
  });
  return sortedUsers;
}
export default function UsersList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const getUsersStatus = useSelector((state) => state.users.getUsersStatus);
  const users = useSelector((state) => state.users.users);
  const usersToDisplay = sortUsersByNameAsc(users);
  useLayoutEffect(() => {
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
  const renderedUsersList = usersToDisplay.map((user) => {
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
        id={user['_id']}
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
      <SearchBar />
      <ul className="userList">
        {renderedUsersList}
      </ul>
    </>
  );
}
