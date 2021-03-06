import React, { useState, useEffect } from 'react';
import { Button, Input, Table, CustomInput } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, addData, editData, deleteData } from '../Redux/Action/todoActions';
import { API_URL } from '../Support/API_URL';

const Todo = () => {

    let userId = useSelector((state) => state.auth.id)
    
    let dispatch = useDispatch()
    // const [update, setUpdate] = useState(false)

    useEffect(() => {
        dispatch(
            fetchData(userId)
        )
        // if(update){
        //     setUpdate(false)
        // }
    },[userId, dispatch])

    let dataList = useSelector((state) => state.todo.dataList)
    let loading = useSelector((state) => state.todo.loading)
    // console.log(dataList)

    const [todo, setTodo] = useState('')
    const [image, setImage] = useState({
        imageName : 'Select File...',
        imageFile : undefined
    })
    // const [imageEdit, setImageEdit] = useState({
    //     imageName : 'Select File...',
    //     imageFile : undefined
    // })

    let handleChange = (e) => {
        setTodo(e.target.value)
    }
    let handleImage = (e) => {
        if(e.target.files[0]){
            setImage({
                imageFile : e.target.files[0],
                imageName : e.target.files[0].name
            })
        }else{
            setImage({
                imageName : 'Select File...',
                imageFile : undefined
            })
        }
    }
    // console.log(image)

    // let handleImageEdit = (e) => {
    //     if(e.target.files[0]){
    //         setImageEdit({
    //             imageFile : e.target.files[0],
    //             imageName : e.target.files[0].name
    //         })
    //     }else{
    //         setImageEdit({
    //             imageName : 'Select File...',
    //             imageFile : undefined
    //         })
    //     }
    // }
    // console.log(imageEdit)

    let handleSubmit = () => {
        // file image di image.imageFile

        let formData = new FormData();
        formData.append('image', image.imageFile);
        formData.append('todo', todo)
        setImage({
            imageName : 'Select File...',
            imageFile : undefined
        })
        setTodo('')
        dispatch(
            addData(userId, formData)
        )
        // setUpdate(true)
    }
    let handleEdit = (id) => {
        let formData = new FormData();
        formData.append('image', image.imageFile);
        formData.append('todo', editTodo)
        dispatch(
            editData(id, formData, userId)
        )
        // setUpdate(true)
        setToggle(null)
    }
    let handleDelete = (id) => {
        dispatch(
            deleteData(id, userId)
        )
        // setUpdate(true)
    }

    let [toggle, setToggle] = useState(null)
    let [editTodo, setEditTodo] = useState('')
    // console.log(editTodo)
    let renderTable = () => {
        return dataList.map((val, index) => {
            if(toggle === val.id){
                return(
                    <tr key={index}>
                        <td>{val.id}</td>
                        <td>
                            <Input
                                onChange={(e) => setEditTodo(e.target.value)}
                                defaultValue={val.todo}
                            />
                        </td>
                        <td>
                            {/* <CustomInput
                                type='file'
                                name='imageNameEdit'
                                id='imageNameEdit'
                                label={imageEdit.imageName}
                                onChange={handleImageEdit}
                                value={imageEdit.imageFile}
                            /> */}
                        </td>
                        <td>
                            <Button onClick={() => setToggle(null)}>
                                Cancel
                            </Button>
                            <Button onClick={() => handleEdit(val.id)}>
                                Confirm
                            </Button>
                        </td>
                    </tr>
                )
            }
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{val.todo}</td>
                    <td>
                        <img src={API_URL+val.imagePath} alt='Gambar Todo' height='100px'/>
                    </td>
                    <td>
                        <Button onClick={() => setToggle(val.id)}>
                            Edit
                        </Button>
                        <Button onClick={() => handleDelete(val.id)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    return ( 
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Todo
                        </th>
                        <th>
                            Image
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable()}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            #
                        </td>
                        <td>
                            <Input 
                                type='textarea'
                                name='todo'
                                id='todo'
                                onChange={handleChange} 
                                value={todo}
                            />
                        </td>
                        <td>
                            <div>
                                <CustomInput
                                    type='file'
                                    name='imageName'
                                    id='imageName'
                                    label={image.imageName}
                                    onChange={handleImage}
                                    // value={image.imageFile}
                                />
                            </div>
                        </td>
                        <td>
                            <div>
                                <Button className='form-control' onClick={handleSubmit}>
                                    {
                                        loading
                                        ?
                                        'Loading...'
                                        :
                                        'Add'
                                    }
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    );

}
 
export default Todo;