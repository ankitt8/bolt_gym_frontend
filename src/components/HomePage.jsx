import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserCard from './UserCard';
import AddUserSuccessMsg from './AddUserSuccessMsg';
import SearchBar from './SearchBar';
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
// function search(renderedUsersList) {
//   console.log(renderedUsersList);
// }
export default function HomePage({ getUsers, users, ...rest }) {
  // console.log(rest?.location?.newUserAdded);
  // console.log(rest);
  const classes = useStyles();
  const getUsersStatus = useSelector((state) => state.users.getUsersStatus);
  useLayoutEffect(() => {
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
    <UserCard
      key={user.id}
      id={user.id}
      name={user.name}
      inTime={user.inTime}
      outTime={user.outTime}
    />
  ));
  // const ele = renderedUsersList[0];
  // console.log({ ele });
  // if (ele !== undefined) ele.style.display = 'none';
  // renderedUsersList[0]?.style.display = 'none';
  // search(renderedUsersList);
  return (
    <>
      {/* <DailyCount /> */}
      <SearchBar />
      <ul className="userList">
        {renderedUsersList}
      </ul>
      {rest?.location?.newUserAdded
        && <AddUserSuccessMsg />}
    </>
  );
}
HomePage.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.instanceOf(Array).isRequired,
  // rest: PropTypes.instanceOf(Object),
};
