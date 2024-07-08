import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/Product/ProductList'
import ProductDetail from './components/Product/ProductDetail';
import ProductAdding from './components/Product/ProductAdding';
import Login from './components/Login/Login';
import MyProduct from './components/Product/MyProduct';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/product" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path='/add' element={<ProductAdding />} />
                <Route path='/myproduct' element={<MyProduct />} />
            </Routes>
        </Router>
    );
}

export default App;