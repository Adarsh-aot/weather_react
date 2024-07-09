import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './MyProduct.css';

function MyProduct() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const BASE_URL = "https://backend-l627.onrender.com/product";

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const response = await  axios.get('https://backend-l627.onrender.com/product/myproduct', {
          headers: {
            'Authorization': `${token}`
          }
        });

        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        if (err.response && err.response.status === 401) {
          setError('Session expired. Please log in again.');
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
        navigate('/myproduct');
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div className="container">
      <div className="card-body"><h2>My Product List</h2> <Link to="/product" className="btn btn-primary">Back</Link></div>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="card-deck">
          {products.map(product => (
            <div key={product.id} className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <Link to={`/product/${product.id}`} className="btn btn-primary">View</Link>
                <button onClick={() => deleteProduct(product.id)} className="btn btn-danger ml-2">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProduct;