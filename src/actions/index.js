/* eslint-disable */
import {
    ADD_USER_STATUS,
    GET_USERS_STATUS,
} from './actionTypes';
import {
    createStatusAction,
    createAddUserAction,
    createGetUsersAction,
    createNewUserAddedAction,
    createIncrementDailyCountAction,
} from './actionCreators';

export function addUser(user) {
    return function (dispatch) {
        dispatch(createStatusAction({ type: ADD_USER_STATUS, started: true }));
        dispatch(createNewUserAddedAction(false));
        fetch('http://localhost:8080/api/add_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((user) => {
                dispatch(createStatusAction({
                    type: ADD_USER_STATUS,
                    successful: true,
                }));
                dispatch(createNewUserAddedAction(true));
            })
            .catch((err) => {
                console.log(err);
                dispatch(createStatusAction({
                    type: ADD_USER_STATUS,
                    failed: true,
                }));
            });
    };
}

export function getUsers() {
    return function (dispatch) {
        dispatch(createStatusAction({
            type: GET_USERS_STATUS,
            started: true,
        }));
        fetch('http://localhost:8080/api/get_users')
            .then((res) => res.json())
            .then((users) => {
                dispatch(createStatusAction({
                    type: GET_USERS_STATUS,
                    successful: true,
                }));
                // console.log('usersPayload', users);
                dispatch(createGetUsersAction(users));
            })
            .catch((err) => {
                dispatch(createStatusAction({
                    type: GET_USERS_STATUS,
                    failed: true,
                }));
            });
    };
}

export function updateINTime(userId) {
    return function (dispatch) {
        fetch('http://localhost:8080/api/in_time', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        })
            .then(() => {
                dispatch(createIncrementDailyCountAction())
                console.log(`In time for user ${userId} updated successfuly!`);
            })
            .catch(() => {
                console.log(`Failed to update in time`);
            })
    }
}

export function updateOUTTime(userId) {
    return function (dispatch) {
        fetch('http://localhost:8080/api/out_time', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        })
            .then(() => {
                console.log(`OUT time for user ${userId} updated successfuly!`);
            })
            .catch(() => {
                console.log(`Failed to update out time`);
            })
    }
}