import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        axios.post('http://localhost:5000/product', product , {
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
        <>
            <input 
                type="text" 
                name="name"
                value={product.name}
                onChange={handleInputChange}
                placeholder="Name"
            />
            <input 
                type="text" 
                name="description"
                value={product.description}
                onChange={handleInputChange}
                placeholder="Description"
            />
            <input 
                type="text" 
                name="id"
                value={product.id}
                onChange={handleInputChange}
                placeholder="ID"
            />
            <button onClick={addProduct}>Add</button>
        </>
    );
}

export default ProductAdding;