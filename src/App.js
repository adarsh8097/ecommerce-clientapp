// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import PurchaseHistory from './components/PurchaseHistory';
import Singleproduct from './components/Singleproduct';

function App() {
    return (
        // <Router>
            <div className="App">
                 {/* <h1>This is new Apllication</h1> */}
                <Routes>
                    <Route path="/" element={<ProductList/>}/>
                    <Route path='/single' element={<Singleproduct/>}/>
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/history" element={<PurchaseHistory/>} />
                </Routes>
            </div>
        // </Router>
    );
}

export default App;
