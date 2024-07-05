// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import PurchaseHistory from './components/NavabarPage';
import Singleproduct from './components/Orderlist';
import Orderlist from './components/Orderlist';
import Confermation from './components/Confermation';
import NavabarPage from './components/NavabarPage';

import Loginform from './components/LoginPage';
import SignUpform from './components/SignUpPage';

function App() {
    const [cart, setCart] = useState([]);

    return (
        <>
            <div>
                <nav>
                   {/* <NavabarPage/> */}
                </nav>
                <Routes>
                   <Route path="/item" element={<ProductList cart={cart} setCart={setCart} />} />
                   <Route path="/cart" element={ <Cart cart={cart} />}/>
                   <Route path="/ordernow" element={<Orderlist/>}/>
                   <Route path="/orderlist" element={<Orderlist/>}/>
                   <Route path='/confermation' element={<Confermation/>}/>
                   <Route path="/" element={<Loginform/>} />
                   <Route path="/sign" element={<SignUpform/>}/>
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
