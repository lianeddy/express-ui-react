import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import io from 'socket.io-client';
import { API_URL } from '../Support/API_URL';
import { Input, Button, Table } from 'reactstrap';
import Swal from 'sweetalert2';

const Home = () => {
    const [userCount, setUserCount] = useState(0);
    const [arrSocket, setArrSocket] = useState([]);
    const [socket, setSocket] = useState('');

    useEffect(() => {
        const socket = io(API_URL);
        Axios.get(`${API_URL}/socket/get-socket`)
        .then((res) => {
            setArrSocket(res.data)
        })
        .catch((err) => {
            console.log(err)
        })

        socket.on('Connected', updateUserCount)
        socket.on('Socket', updateArrSocket)
    },[])

    let updateUserCount = (num) => {
        setUserCount(num)
    }

    let updateArrSocket = (arr) => {
        setArrSocket(arr)
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            title: arr[arr.length-1].string
          })
    }

    let handleAdd = () => {
        Axios.post(`${API_URL}/socket/add-socket`, {string : socket})
        .then((res) => {
            console.log(res.data, 'hasil axios')
        })
    }

    // console.log(socket)
    console.log(arrSocket, 'hasil socket')

    let renderSocket = () => {
        return arrSocket.map((val) => {
            return(
                <tr>
                    <td>{val.id}</td>
                    <td>{val.string}</td>
                    <td></td>
                </tr>
            )
        })
    }

    return ( 
        <div>
            <div>
                Home
            </div>
            <div>
                Users online : {userCount}
            </div>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>string</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody
                        //  style={{
                            
                        //     overflowY : 'scroll',
                        //     width: '100vw',
                        //     height: '500px',
                        //     position : 'relative'
                        // }}
                    >
                        {renderSocket()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>#</td>
                            <td>
                                <Input
                                    onChange={(e) => setSocket(e.target.value)}
                                />
                            </td>
                            <td>
                                <Button onClick={handleAdd}>
                                    Click Me
                                </Button>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        </div>
    );
}
 
export default Home;