import React, { useState } from 'react';
import { Button, Input, Table, CustomInput } from 'reactstrap';

const Todo = () => {

    const [todo, setTodo] = useState('')
    const [image, setImage] = useState({
        imageName : 'Select File...',
        imageFile : undefined
    })

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
                imageFile : 'Select File...',
                imageName : undefined
            })
        }
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
                                />
                            </div>
                        </td>
                        <td>
                            <div>
                                <Button className='form-control'>
                                    Add
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );

}
 
export default Todo;