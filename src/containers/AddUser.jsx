import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addUser as addUserToDatabase } from '../actions';
import AddUser from '../components/AddUser';

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const addUser = (user) => {
    dispatch(addUserToDatabase(user));
    history.push('/');
  };
  return <AddUser addUser={addUser} />;
};
