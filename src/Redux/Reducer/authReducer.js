import {
    API_AUTH_START,
    API_AUTH_SUCCESS,
    API_AUTH_FAILED,
    LOGIN
} from '../types';

const INITIAL_STATE = {
    id : 0,
    username : '',
    loading : false,
    status : '',
    message : ''
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case API_AUTH_START : 
            return {
                loading : true
            }
        case API_AUTH_SUCCESS : 
            return {
                ...state,
                loading : false,
                message : action.payload.message,
                status : action.payload.status
            }
        case API_AUTH_FAILED : 
            return {
                ...state,
                loading : false,
                message : action.payload.message,
                status : action.payload.status
            }
        case LOGIN : 
            return {
                ...state,
                ...action.payload
            }
        default : 
            return state
    }
}