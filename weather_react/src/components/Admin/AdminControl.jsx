import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminControl.css';

function AdminControl() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const BASE_URL = "https://backend-l627.onrender.com/admin";
    // const BASE_URL = "http://localhost:5000/admin";
    
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        } else {
            axios.get(BASE_URL , {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }})
                .then(response => setData(response.data))
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [navigate]);

    const deleteProduct = (id) => {
        axios.delete(`${BASE_URL}/${id}`)
          .then(() => {
            console.log('Product deleted successfully');
            window.location.reload();
            navigate('/myproduct');
          })
          .catch(error => console.error('Error deleting product:', error));
    };

    return (
        <>
        <div className="header">
            <h1>Users</h1>
            <Link to="/" className="btn btn-primary">Back</Link>
        </div>
            <div className="container">
            {data.map((item) => (
                <div key={item.id} className="admin-card">
                    <div className="admin-card-body">
                        <h5 className="admin-card-title">
                            <div className="admin-card-content">
                                <h1>{item.id}</h1>
                                <h1>{item.email}</h1>   
                                <button onClick={() => deleteProduct(item.id)} className="btn btn-danger ml-2">Delete</button>
                            </div>
                        </h5>
                    </div>
                </div>
            ))}
            </div>
        </>
    );
}

export default AdminControl;