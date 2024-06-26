// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import PurchaseHistory from './components/PurchaseHistory';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" exact component={ProductList}/>
                    <Route path="/cart" component={Cart} />
                    <Route path="/history" component={PurchaseHistory} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
