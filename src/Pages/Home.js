import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import io from 'socket.io-client';
import { API_URL } from '../Support/API_URL';
import { Input, Button, Table, Badge } from 'reactstrap';
import Swal from 'sweetalert2';

const Home = () => {
    const [userCount, setUserCount] = useState(0);
    const [arrSocket, setArrSocket] = useState([]);
    const [notifCount, setNotifCount] = useState(0);
    const [socket, setSocket] = useState('');
    const [orderBy, setOrderBy] = useState('DESC');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const socket = io(API_URL);
        socket.on('Connected', updateUserCount)
        socket.on('Socket', updateArrSocket)
        socket.on('notifCount', updateNotifCount)
    },[])

    useEffect(() => {
        let url = `${API_URL}/socket/get-socket?orderBy=${orderBy}`
        if(filter){
            url += ` &filterBy=${filter}`
        }
        Axios.get(url)
        .then((res) => {
            setArrSocket(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [orderBy, filter])

    let updateUserCount = (num) => {
        setUserCount(num)
    }

    let updateArrSocket = (arr) => {
        setArrSocket(arr)
    }

    let updateNotifCount = (num) => {
        setNotifCount(num)
    }

    let handleAdd = () => {
        let url = `${API_URL}/socket/add-socket?orderBy=${orderBy}`
        if(filter){
            url += ` &filterBy=${filter}`
        }
        Axios.post(url, {string : socket})
        .then((res) => {
            console.log(res.data, 'hasil axios')
        })
    }

    let handleEdit = async (id) => {
        let url = `${API_URL}/socket/update-socket/${id}?orderBy=${orderBy}`
        if(filter){
            url += ` &filterBy=${filter}`
        }
        await Axios.patch(url)
    }
    
    let handleAll = () => {
        // await Axios.patch(`${API_URL}/socket/update-all`)
        arrSocket.forEach( async (val) => {
            await Axios.patch(`${API_URL}/socket/update-socket/${val.id}`)
        })
    }

    // console.log(socket)
    console.log(arrSocket, 'hasil socket')

    let renderSocket = () => {
        return arrSocket.map((val) => {
            return(
                <tr key={val.id}>
                    <td>{val.id} </td>
                    <td>{val.string} { !val.read ? <Badge color="danger">New</Badge> : null }</td>
                    <td>
                        <Button onClick={() => handleEdit(val.id)}>
                            Mark as Read
                        </Button>
                    </td>
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
                New Notification : {notifCount}
            </div>
            <div>
                <Button onClick={handleAll}>
                    Mark All as Read
                </Button>
            </div>
            <div
                style={{
                    width : '300px'
                }}
            >
                <Input type="select" onChange={(e) => setOrderBy(e.target.value)}>
                    <option value='DESC'>Newest</option>
                    <option value='ASC'>Oldest</option>
                </Input>
            </div>
            <div
                style={{
                    width : '300px'
                }}
            >
                <Input type="select" onChange={(e) => setFilter(e.target.value)}>
                    <option value=''>All</option>
                    <option value='0'>Unread</option>
                    <option value='1'>Read</option>
                </Input>
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