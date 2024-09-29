import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { SERVER_BASE_URL } from './utils/constants'


function Home() {

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`${SERVER_BASE_URL}/employees`)
        .then(
            res => {
                setData(res.data)
                console.log(res.data)
            }
        )
        .catch(err => console.log("Error while fetching data: ", err))
    }, [])

    const handleDelete = (id) => {
        axios.delete(`${SERVER_BASE_URL}/employees/` + id)
        .then(
            res => {
                // setData(data.filter(item => item.id !== id))
                // alert('Employee deleted successfully')
                window.location.reload()
            }
        )
        .catch(err => console.log("Error while deleting data: ", err))
    }

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark vh-100">
        <div className="bg-light rounded w-50">
            <h1>My MERN-MySQL App</h1>
            &nbsp;<Link to='/create' className='btn btn-success mb-3'>Add</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>
                                <Link to={`/edit/${item.id}`} className='btn btn-primary'>Edit</Link>&nbsp;&nbsp;
                                <button onClick={e => handleDelete(item.id)} className='btn btn-danger'>Delete</button>
                            </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home