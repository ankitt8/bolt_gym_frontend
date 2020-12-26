/* eslint-disable dot-notation */
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { getUsers } from '../actions';
import HomePage from '../components/HomePage';

function outTimeUpdated(dateOutTime, today) {
  return dateOutTime.getDate() === today.getDate()
    && dateOutTime.getFullYear() === today.getFullYear();
}

function inTimeUpdated(dateInTime, today) {
  return dateInTime.getDate() === today.getDate()
    && dateInTime.getFullYear() === today.getFullYear();
}
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
const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
});
const mapStateToProps = (state) => {
  // eslint-disable-next-line prefer-destructuring
  const users = state.users.users;
  // let todayCount = 0;
  const sortedUsersByNameAsc = sortUsersByNameAsc(users);
  const usersToDisplay = sortedUsersByNameAsc.map((user) => {
    // console.log(user);
    const today = new Date();
    let inTime = null;
    let outTime = null;
    if (user.attendance.length > 0) {
      const dateInTime = new Date(user.attendance[0].inTime);
      inTime = null;
      if (inTimeUpdated(dateInTime, today)) {
        const hour = dateInTime.getHours();
        const min = dateInTime.getMinutes();
        inTime = `${hour}:${min}`;
        // console.log(user.name, inTime);
        // todayCount += 1;
      }
      const dateOutTime = new Date(user.attendance[0].outTime);
      outTime = null;
      if (outTimeUpdated(dateOutTime, today)) {
        const hour = dateOutTime.getHours();
        const min = dateOutTime.getMinutes();
        outTime = `${hour}:${min}`;
        // console.log(user.name, outTime);
      }
    }
    // console.log(user['_id']);
    return {
      name: user.name,
      id: user['_id'],
      inTime,
      outTime,
    };
  });
  return {
    users: usersToDisplay,
    newUserAdded: state.users.newUserAdded,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

// export default () => {
//   const dispatch = useDispatch();
//   function getUsers() {
//     dispatch(getUsersFromDb());
//   }
//   const users = useSelector((state) => state.users.users);
//   const newUserAdded = useSelector((state) => state.users.newUserAdded);
//   const normalizedUsers = users.map((user) => {
//     // console.log(user);
//     if (user.attendance.length > 0) {
//       const date = new Date(user.attendance[0].inTime);
//       console.log(typeof date);
//       const hour = date.getUTCHours();
//       const min = date.getUTCMinutes();
//       console.log(hour, min);
//       console.log(typeof user.attendance[0].inTime);
//     }
//     return {
//       name: user.name,
//       id: user['_id'],
//       inTime: user.attendance,
//     };
//   });
//   return <HomePage getUsers={getUsers} users={normalizedUsers} newUserAdded={newUserAdded} />;
// };
