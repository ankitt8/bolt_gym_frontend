/* eslint-disable */
import {
    ADD_USER_STATUS,
    GET_USERS_STATUS,
} from './actionTypes';
import {
    createStatusAction,
    createGetUsersAction,
    createNewUserAddedAction,
    createIncrementDailyCountAction,
    createINTimeAction,
    createOUTTimeAction,
} from './actionCreators';

const BASE_URI = 'https://bolt-backend.herokuapp.com';
export function addUser(user) {
    return function (dispatch) {
        dispatch(createStatusAction({ type: ADD_USER_STATUS, started: true }));
        dispatch(createNewUserAddedAction(false));
        fetch(`${BASE_URI}/api/add_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then(() => {
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
        fetch(`${BASE_URI}/api/get_users`)
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
                console.log(err);
                dispatch(createStatusAction({
                    type: GET_USERS_STATUS,
                    failed: true,
                }));
            });
    };
}

export function updateINTime(userId) {
    return function (dispatch) {
        fetch(`${BASE_URI}/api/in_time`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson);
                // const today = new Date();
                // const dateInTime = new Date(resJson.inTime);
                // console.log(dateInTime);
                // let inTime = null;
                // if (dateInTime.getDate() === today.getDate()
                //     && dateInTime.getFullYear() === today.getFullYear()) {
                //     const hour = dateInTime.getHours();
                //     const min = dateInTime.getMinutes();
                //     inTime = `${hour}:${min}`;
                //     // console.log(user.name, inTime);
                //     // todayCount += 1;
                // }
                // dispatch(createINTimeAction(inTime));
                // dispatch(createGetUsersAction());
                // dispatch(createIncrementDailyCountAction());
                console.log(`In time for user ${userId} updated successfuly!`);
            })
            .catch(() => {
                console.log('Failed to update in time');
            });
    };
}

export function updateOUTTime(userId) {
    return function (dispatch) {
        fetch(`${BASE_URI}/api/out_time`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        })
            .then(() => {
                // dispatch(createOUTTimeAction());
                console.log(`OUT time for user ${userId} updated successfuly!`);
            })
            .catch(() => {
                console.log('Failed to update out time');
            });
    };
}
