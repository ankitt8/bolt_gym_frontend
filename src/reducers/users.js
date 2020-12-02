import {
  ADD_USER_STATUS,
  GETUSERS,
  GET_USERS_STATUS,
  NEW_USER_ADDED,
  INCREMENT_DAILY_COUNT,
} from '../actions/actionTypes';

const initialState = {
  users: [],
  addUserStatus: {
    started: null,
    successful: null,
    failed: null,
  },
  getUsersStatus: {
    started: null,
    successful: null,
    failed: null,
  },
  newUserAdded: false,
  dailyCount: 0,
};
const users = (state = initialState, action) => {
  switch (action.type) {
    case NEW_USER_ADDED: {
      return {
        ...state,
        newUserAdded: action.newUserAdded,
      };
    }
    case ADD_USER_STATUS: {
      return {
        ...state,
        addUserStatus: { ...action.status },
      };
    }
    case GET_USERS_STATUS: {
      return {
        ...state,
        getUsersStatus: { ...action.status },
      };
    }
    case GETUSERS: {
      const usersPayload = action.users;
      return {
        ...state,
        users: usersPayload,
      };
    }
    case INCREMENT_DAILY_COUNT: {
      return {
        ...state,
        dailyCount: state.dailyCount + 1,
      };
    }
    default: {
      return state;
    }
  }
};
export default users;
