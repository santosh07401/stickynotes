import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    fetchDataForUser,
    logout,
    saveNote,
    register,
    delete: _delete
};
function getUser() {
    return "user@example.com";
}
function saveNote(note){
    let user = getUser();
    return dispatch => {
        dispatch(request({ user }));

        userService.saveUserNote(user,note)
            .then(
                res => {
                    dispatch(success(res));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
        function request(res) { return { type: userConstants.SAVE_NOTE_REQUEST, res } }
        function success(res) { return { type: userConstants.SAVE_NOTE_SUCCESS, saveNote:"success"} }
        function failure(error) { return { type: userConstants.SAVE_NOTE_FAILURE, error,saveNote:"failed" } }
    };
}

function fetchDataForUser(){


    let user = getUser();
    return dispatch => {
        dispatch(request({ user }));

        userService.getAllNodesForUser(user)
            .then(
                nodesMap => {
                    dispatch(success(nodesMap));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
        function request(user) { return { type: userConstants.NODEMAP_REQUEST, user } }
        function success(noteMap) { return { type: userConstants.NODEMAP_SUCCESS, noteMap:noteMap } }
        function failure(error) { return { type: userConstants.NODEMAP_FAILURE, error } }
    };
}
function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
