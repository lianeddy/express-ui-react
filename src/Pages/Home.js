import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import io from 'socket.io-client';
import { API_URL } from '../Support/API_URL';

const Home = () => {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const socket = io(API_URL);
        socket.on('Connected', updateUserCount)
    },[])

    let updateUserCount = (num) => {
        setUserCount(num)
    }

    console.log(userCount)

    return ( 
        <div>
            <div>
                Home
            </div>
            <div>
                Users online : {userCount}
            </div>
        </div>
    );
}
 
export default Home;