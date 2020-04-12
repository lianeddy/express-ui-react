import Axios from 'axios';
import { API_AUTH_START, LOGIN, API_AUTH_SUCCESS, API_AUTH_FAILED } from '../types';
import { API_URL } from '../../Support/API_URL';

export const Login = (form) => {
    return async (dispatch) => {
        try{
            dispatch({
                type : API_AUTH_START
            })
            let res = await Axios.post(`${API_URL}/users/login`, form)
            dispatch({
                type : LOGIN,
                payload : res.data
            })
        }
        catch(err){

        }
    }
}

export const Register = (form) => {
    return async (dispatch) => {
        dispatch({
            type : API_AUTH_START
        })
        let res = await Axios.post(`${API_URL}/users/register`, form)
        try{
            let { status, data, message } = res.data;
            console.log(res)
            dispatch({
                type : LOGIN,
                payload : data
            })
            dispatch({
                type : API_AUTH_SUCCESS,
                payload : {
                    message,
                    status
                }
            })
        }
        catch(err){
            dispatch({
                type : API_AUTH_FAILED,
                payload : err
            })
        }
    }
}