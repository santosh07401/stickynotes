import {userConstants} from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {loggedIn: true, user} : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.NODEMAP_REQUEST: {
            return { noteMapData:{
                    noteMapInProgress: true,
                    map: action.noteMap
                }

            };
        }
        case userConstants.NODEMAP_SUCCESS:
            return {
                noteMapData: {
                    noteMapInProgress: false,
                    noteMapSuccess: true,
                    map: action.noteMap
                }
            };
        case userConstants.NODEMAP_FAILURE:
            return {noteMapData:{}};
        case userConstants.SAVE_NOTE_REQUEST:
            return {saveNoteData:{}};
        case userConstants.SAVE_NOTE_SUCCESS:
            return {saveNoteData:{saved:"success"}};
        case userConstants.SAVE_NOTE_FAILURE:
            return {saveNoteData:{saved:"fail"}};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}
