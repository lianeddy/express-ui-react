import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'querystring';
import { Verification } from '../Redux/Action';

const Verify = (props) => {
    let params = queryString.parse(props.location.search)
    let username  = params["?username"];
    let password = params.password

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            Verification({
                username,
                password
            })
        )
    })

    return ( 
        <div>
            Ini Verify
        </div>
    );
}
 
export default Verify;