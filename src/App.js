// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import PurchaseHistory from './components/PurchaseHistory';
import Singleproduct from './components/Orderlist';
import Orderlist from './components/Orderlist';
import Confermation from './components/Confermation';

function App() {
    const [cart, setCart] = useState([]);

    return (
        <>
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/cart">Cart</Link>
                </nav>
                <Routes>
                   <Route path="/" element={<ProductList cart={cart} setCart={setCart} />} />
                   <Route path="/cart" element={ <Cart cart={cart} />}/>
                   <Route path="/ordernow" element={<Orderlist/>}/>
                   <Route path="/orderlist" element={<Orderlist/>}/>
                   <Route path='/confermation' element={<Confermation/>}/>
                   </Routes>
                    {/* <Route path="/">
                      
                    </Route>
                    <Route path="/cart">
                        <Cart cart={cart} />
                    </Route> */}
                
            </div>
        </>
    );
}



export default App;
