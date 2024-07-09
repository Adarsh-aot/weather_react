import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate  , Link } from 'react-router-dom';
import './ProductAdding.css';

function ProductAdding() {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        id: ''
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const addProduct = () => {
        console.log(product);
        const token = localStorage.getItem('token');
        axios.post('https://backend-l627.onrender.com/product', product , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }   
        })
            .then(() => navigate('/product'))
            .catch((error) => {
                console.error('Error adding product:', error);
                navigate('/product');
            });
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Add Product</h5>
                <input 
                    type="text" 
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="form-control mb-2"
                />
                <input 
                    type="text" 
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    className="form-control mb-2"
                />
                <input 
                    type="text" 
                    name="id"
                    value={product.id}
                    onChange={handleInputChange}
                    placeholder="ID"
                    className="form-control mb-2"
                />
                <div className="card-container">
                <button onClick={addProduct} className="btn btn-primary">Add</button>
                <Link to="/product" className="btn btn-primary">Back</Link>
                </div>
            </div>
        </div>
    );
}

export default ProductAdding;