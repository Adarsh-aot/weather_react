import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
    const [data, setData] = useState([]);
    const BASE_URL = "http://localhost:5000/product";

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            window.location.href = '/';
        }
        else{
        axios.get(BASE_URL)
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }
    }, []);

    return (
        <div>
            <h1>Products</h1><Link to="/add">Add Product</Link><Link to="/myproduct">My Product</Link><button onClick={() => {localStorage.removeItem('token');window.location.reload();}}>Logout</button>
            <hr/>
            {data.map((item) => (
                <div key={item.id}>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                </div>
            ))}
        </div>
    );
}

export default ProductList;