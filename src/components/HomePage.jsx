/* eslint-disable dot-notation */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import UserCard from '../containers/UserCard';
import DailyCount from '../containers/DailyCount';
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
export default function HomePage({ getUsers, users, newUserAdded }) {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const renderedUsersList = users.map((user) => (
    // eslint-disable-next-line dot-notation
    <UserCard user={user} />
  ));

  return (
    <>
      <DailyCount />
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
