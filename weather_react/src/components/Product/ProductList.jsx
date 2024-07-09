import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductList.css';

function ProductList() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const BASE_URL = "https://backend-l627.onrender.com/product";
    const BUY_URL = "https://backend-l627.onrender.com/order";


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        } else {
            axios.get(BASE_URL)
                .then(response => setData(response.data))
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [navigate]);

    const buy = (name, data) => {   
        const token = localStorage.getItem('token');    

        if (!token) {
            navigate('/');
            return;
        }

        axios.post(`${BASE_URL}`, { name, data }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
            .then(() => {
                alert("Product bought successfully");
                console.log('Product bought successfully');         
            })
            .catch(error => console.error('Error buying product:', error));
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Products</h1>
                <div className="header-buttons">
                    <Link to="/add" className="btn btn-primary">Add Product</Link>
                    <Link to="/myproduct" className="btn btn-primary ml-2">My Product</Link>
                    <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }} className="btn btn-secondary ml-2">Logout</button>
                </div>
            </div>
            <hr />
            <div className="card-deck">
                {data.map((item) => (
                    <div key={item.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to={`/product/${item.id}`}>{item.name}</Link><button className="btn btn-primary ml-2" onClick={() => buy(item.name  , item.data)}>Buy</button>
                            </h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;