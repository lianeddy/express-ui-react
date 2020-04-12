import React, { useState } from 'react';
import { Input, Form, FormGroup, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const RegisterPage = () => {

    const [formInput, setFormInput] = useState({
        username : '',
        email : '',
        password : '',
        confirmPassword : ''
    })

    const handleChange = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name] : e.target.value
        })
    }

    const handleRegister = ()=> {
       
    }

    console.log(formInput)
    return(
        <div>
            <div className='row'
                style={{
                    minHeight : '80vh'
                }}
            >
                <div className='col-5'
                    style={{
                        display : 'flex',
                        justifyContent : 'center',
                        alignItems : 'center',
                        textAlign : 'center'
                    }}
                >
                    <Form
                        style={{
                            padding : '50px',
                            width : '400px'
                        }}
                    >
                        <Label>
                            Register
                        </Label>
                        <FormGroup>
                            <Input
                                type='text'
                                name='username'
                                id='username'
                                placeholder='Username'
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type='text'
                                name='email'
                                id='email'
                                placeholder='Email'
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type='password'
                                name='password'
                                id='password'
                                placeholder='Password'
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type='password'
                                name='confirmPassword'
                                id='confirmPassword'
                                placeholder='Confirm Password'
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button
                                className='form-control btn-custom gray'
                                onClick={handleRegister}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </Form>
                </div>
                <div className='col-7'
                    style={{
                        backgroundColor : 'grey',
                        display : 'flex',
                        justifyContent : 'center',
                        alignItems : 'center',
                        textAlign : 'center'
                    }}
                >
                    <div
                        style={{
                            color : 'white'
                        }}
                    >
                        <div
                            style={{
                                fontWeight : 500,
                                fontSize : '40px'
                            }}
                            className='my-3'
                        >
                            Join us!
                        </div>
                        <div
                            className='my-5'
                            style={{
                                fontWeight : 400,
                                fontSize : '20px'
                            }}
                        >
                            Join us and create your own to do list!
                        </div>
                        <div>
                            <div>
                                Already have an account?
                            </div>
                            <div>
                                <Link to='/login'>
                                    <Button
                                        className='form-control btn-custom white'
                                        >
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
 
export default RegisterPage;