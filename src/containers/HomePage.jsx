/* eslint-disable dot-notation */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers as getUsersFromDb } from '../actions';
import HomePage from '../components/HomePage';

// const mapDispatchToProps = (dispatch) => ({
//   getUsers: () => dispatch(getUsers()),
// });
// export default connect(null, mapDispatchToProps)(HomePage);
export default () => {
  const dispatch = useDispatch();
  function getUsers() {
    dispatch(getUsersFromDb());
  }
  const users = useSelector((state) => state.users.users);
  const newUserAdded = useSelector((state) => state.users.newUserAdded);
  const normalizedUsers = users.map((user) => {
    // console.log(user);
    if (user.attendance.length > 0) {
      const date = new Date(user.attendance[0].inTime);
      console.log(typeof date);
      const hour = date.getUTCHours();
      const min = date.getUTCMinutes();
      console.log(hour, min);
      console.log(typeof user.attendance[0].inTime);
    }
    return {
      name: user.name,
      id: user['_id'],
      inTime: user.attendance,
    };
  });
  return <HomePage getUsers={getUsers} users={normalizedUsers} newUserAdded={newUserAdded} />;
};
