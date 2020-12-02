/* eslint-disable dot-notation */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserCard from './UserCard';
import AddUserSuccessMsg from './AddUserSuccessMsg';
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
export default function HomePage({ getUsers, users, newUserAdded }) {
  const classes = useStyles();
  const getUsersStatus = useSelector((state) => state.users.getUsersStatus);
  useEffect(() => {
    getUsers();
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
  const renderedUsersList = users.map((user) => (
    // eslint-disable-next-line dot-notation
    <UserCard id={user.id} name={user.name} inTime={user.inTime} outTime={user.outTime} />
  ));

  return (
    <>
      {/* <DailyCount /> */}
      <ul className="userList">
        {renderedUsersList}
      </ul>
      {newUserAdded
        && <AddUserSuccessMsg />}
    </>
  );
}
HomePage.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.instanceOf(Array).isRequired,
  newUserAdded: PropTypes.bool.isRequired,
};
