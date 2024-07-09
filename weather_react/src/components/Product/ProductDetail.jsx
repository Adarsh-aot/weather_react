import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const BASE_URL = "https://backend-l627.onrender.com/product";
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    const deleteProduct = () => {
        axios.delete(`${BASE_URL}/${id}`)
            .then(() => {
                console.log('Product deleted successfully');
                navigate('/product'); // Navigate to the list after deletion
            })
            .catch(error => console.error('Error deleting product:', error));
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="card-text">{product.discription}</p>
                {/* Display other details of the product */}
                <Link to="/product" className="btn btn-secondary">Back to List</Link>
                <button onClick={deleteProduct} className="btn btn-danger ml-2">Delete</button>
            </div>
        </div>
    );
}

export default ProductDetail;