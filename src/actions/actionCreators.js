import {
  ADDUSER, GETUSERS, NEW_USER_ADDED, UPDATE_IN_TIME, UPDATE_OUT_TIME,
  INCREMENT_DAILY_COUNT,
} from './actionTypes';

export function createStatusAction({
  type, started = false, successful = false, failed = false,
}) {
  return {
    type,
    status: {
      started,
      successful,
      failed,
    },
  };
}
export function createAddUserAction(user) {
  return {
    type: ADDUSER,
    user,
  };
}
export function createGetUsersAction(users) {
  return {
    type: GETUSERS,
    users,
  };
}
export function createNewUserAddedAction(newUserAdded) {
  return {
    type: NEW_USER_ADDED,
    newUserAdded,
  };
}
export function createINTimeAction(userId) {
  return {
    type: UPDATE_IN_TIME,
    userId,
  };
}
export function createOUTTimeAction(userId) {
  return {
    type: UPDATE_OUT_TIME,
    userId,
  };
}
export function createIncrementDailyCountAction() {
  return {
    type: INCREMENT_DAILY_COUNT,
  };
}
