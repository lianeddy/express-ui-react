import {
    API_AUTH_START,
    API_AUTH_SUCCESS, 
    API_AUTH_FAILED, 
    LOGIN
} from '../types';

import Axios from 'axios';
import { API_URL } from '../../Support/API_URL';

export const Login = (form) => {
    return async (dispatch) => {
        // async
        // await bisa dilakukan apabila function return sebuah promise
        // let res = await Axios.post(`${API_URL}/users/login`, form)
        // console.log(res)
        // dispatch({
        //     type : API_AUTH_START
        // })
        // Axios.post(`${API_URL}/users/login`, form)
        // .then((res) => {
        //     dispatch({
        //         type : LOGIN,
        //         payload : res.data.data
        //     })
        //     dispatch({
        //         type : API_AUTH_SUCCESS
        //     })
        // })
        // .catch((err) => {
        //     dispatch({
        //         type : API_AUTH_FAILED
        //     })
        // })
        dispatch({
            type : API_AUTH_START
        })
        try{
            let res = await Axios.post(`${API_URL}/users/login`, form)
            dispatch({
                type : LOGIN,
                payload : res.data.data
            })
            localStorage.setItem('token', JSON.stringify(res.data.data))
            dispatch({
                type : API_AUTH_SUCCESS
            })
        }catch(err){
            dispatch({
                type : API_AUTH_FAILED
            })
        }
    }
}

export const Register = (form) => {
    return(dispatch) => {
        dispatch({
            type : API_AUTH_START
        })
        Axios.post(`${API_URL}/users/register`, form) // {username, password, email}
        .then((res) => {
            console.log(res.data)
            // {status : 'Success', data : {id,username, email, roleId}, message: ''}
            dispatch({
                type : LOGIN,
                payload : res.data.data
            })
            localStorage.setItem('token', JSON.stringify(res.data.data))
            dispatch({
                type : API_AUTH_SUCCESS
            })
        })
        .catch((err) => {
            dispatch({
                type : API_AUTH_FAILED
            })
        })
    }
}

export const keepLogin = (token) => {
    console.log('keeplogin')
    token = JSON.parse(token)
    let { username, password } = token;
    return async (dispatch) => {
        dispatch({
            type : API_AUTH_START
        })
        try{
            let res = await Axios.post(`${API_URL}/users/keep-login`, {username, password})
            dispatch({
                type : LOGIN,
                payload : res.data.data
            })
            dispatch({
                type : API_AUTH_SUCCESS
            })
        }catch(err){
            dispatch({
                type : API_AUTH_FAILED
            })
        }
    }
}