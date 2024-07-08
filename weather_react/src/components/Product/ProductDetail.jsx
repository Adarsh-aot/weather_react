import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const BASE_URL = "http://localhost:5000/product";
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
        <div>
            <h2>{product.name}</h2>
            <p>{product.discription}</p>
            {/* Display other details of the product */}
            <Link to="/product">Back to List</Link>
            
        </div>
    );
}

export default ProductDetail;