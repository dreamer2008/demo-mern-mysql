import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Create() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(firstName, lastName, email, phone)
        axios.post('http://localhost:8081/employees', { firstName, lastName, email, phone })
            .then(res => {
                console.log(res)
                navigate('/')
            }).catch(error => console.log(error))
    }

    return (
        <div className='d-flex bg-primary justify-content-center align-items-center h-100'>
            <div className='w-50 bg-white p-5'>
                <form onSubmit={handleSubmit}>
                    <h2>Add an employee</h2>
                    <div className='mb-3'>
                        <label htmlFor='firstName' className='form-label'>First Name</label>
                        <input type='text' className='form-control' id='firstName' placeholder='Enter first name' aria-describedby='firstNameHelp'
                            value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='lastName' className='form-label'>Last Name</label>
                        <input type='text' className='form-control' id='lastNamet' placeholder='Enter last name' aria-describedby='lastNameHelp'
                            value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input type='text' className='form-control' id='email' placeholder='Enter email' aria-describedby='emailHelp'
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='phone' className='form-label'>Phone</label>
                        <input type='text' className='form-control' id='phone' placeholder='Enter phone' aria-describedby='phoneHelp'
                            value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Create