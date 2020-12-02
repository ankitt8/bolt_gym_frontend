/* eslint-disable */
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateINTime, updateOUTTime } from '../actions';
import UserCard from '../components/UserCard';

export default function UserCardContainer({ user }) {
  const { id, name, inTime, outTime } = user;
  const dispatch = useDispatch();
  const handleInTimeClick = (userId) => {
    dispatch(updateINTime(userId));
  };
  const handleOutTimeClick = (userId) => {
    dispatch(updateOUTTime(userId));
  };
  return (
    <UserCard
      handleInTimeClick={handleInTimeClick}
      handleOutTimeClick={handleOutTimeClick}
      name={name}
      id={id}
      inTime={inTime}
      outTime={outTime}
    />
  );
}
UserCardContainer.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};
