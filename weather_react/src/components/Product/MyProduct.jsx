import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function MyProduct() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000/product";

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const response = await  axios.get('http://localhost:5000/product/myproduct', {
          headers: {
            'Authorization': `${token}`
          }
        });

        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        if (err.response && err.response.status === 401) {
          setError('Session expired. Please log in again.');
        //   localStorage.removeItem('token');
          navigate('/');
        } else {
          setError('An error occurred while fetching products.');
        }
      }
    };

    fetchProducts();
  }, [navigate]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  const deleteProduct = (id) => {
    
    axios.delete(`${BASE_URL}/${id}`)
        .then(() => {
            console.log('Product deleted successfully');
            window.location.reload();
            navigate('/myproduct'); // Navigate to the list after deletion
        })
        .catch(error => console.error('Error deleting product:', error));
};

  return (
    <div className="container">
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="list-group">
          {products.map(product => (
            <li key={product.id} className="list-group-item">
              {product.name}
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyProduct;