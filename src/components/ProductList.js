import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { BsCart4 } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
Modal.setAppElement('#root'); // This is to avoid accessibility issues


function ProductList({ cart, setCart }) {
    const [products, setProducts] = useState([]);
    const [singleProduct, setSingleProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleProduct = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
            console.log(data);
        } catch (error) {
            console.log("error Product", error);
        }
    };

    const handleCategories = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            const data = await response.json();
            setCategories(data);
            console.log("Categories", data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleProduct();
        handleCategories();
    }, []);

    const handleProductSort = async (order) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products?sort=${order}`);
            const data = await response.json();
            setProducts(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSingleProduct = async (id) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await response.json();
            setSingleProduct(data);
            console.log(data);
            setModalIsOpen(true);
        } catch (error) {
            console.log("error fetching single product", error);
        }
    };

    const fetchProductsByCategory = async (category) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
            const data = await response.json();
            setProducts(data);
            console.log(`Products in category ${category}`, data);
        } catch (error) {
            console.log("error fetching products by category", error);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSingleProduct(null);
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(data);
            setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
        } catch (error) {
            console.log("error deleting product", error);
        }
    };

    const addToCart = async (product) => {
        try {
            const response = await fetch('https://fakestoreapi.com/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: 1, // Replace with actual user ID
                    date: new Date().toISOString(),
                    products: [{ productId: product.id, quantity: 1 }]
                })
            });
            const data = await response.json();
            console.log('Added to cart:', data);
            setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
            navigate('/cart'); // Navigate to the cart page
        } catch (error) {
            console.log("error adding to cart", error);
        }
    };
    
     
    const handleRemoveItem = () => {
        const itemData = localStorage.getItem('UserData');
           console.log(itemData);
        if (itemData !== null) {
            localStorage.removeItem('UserData');
            console.log("UserData removed");
            navigate('/'); // Navigate to home or any other route after removal
        }else{
            navigate('/');
        }
    };
    
    

    return (
     <>
         <div  className=''>
         <nav className="navbar navbar-expand-lg  bg-light w-100" style={{position:"fixed",zIndex:"100"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/item">
    <img src="https://theforage.wpengine.com/wp-content/uploads/2023/04/navy-wide-logo-2x-300x90-1-120x36.png" width="110px" height="30px"/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/item">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">About</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Itemlist
          </Link>
          <ul className="dropdown-menu " aria-labelledby="navbarDropdown" style={{ textTransform:"capitalize"}}>
           
                    {categories.map((category) =>(
                        <li
                            key={category}
                            className='m-2'
                            style={{ cursor:"pointer"}}
                            onClick={() => fetchProductsByCategory(category)}
                        >
                            {category}
                        </li>
                    ))}
                    <li className=' m-2' style={{ cursor:"pointer"}} onClick={() => handleProductSort('asc')}> ascending</li>
                    <li className=' m-2' style={{ cursor:"pointer"}} onClick={() => handleProductSort('desc')}> descending</li>
                
               
            
          </ul>
        </li>
        <li className="nav-item" onClick={handleRemoveItem}>
        <p className='nav-link' style={{cursor:"pointer"}}> LogOut</p>
        </li>
      </ul>
      <form className="d-flex border border-secondary p-1" style={{borderRadius:"0.5rem"}} >
         
        <input className="" type="search" placeholder="Search" aria-label="Search" style={{  outline:"none",border:"none"}}/>
         <IoIosSearch className='mt-1 fs-4'/>
       
      </form>
    </div>
  </div>
</nav>
            
                 <div>
                    <div>
                <h3 style={{textAlign:'center'}}>This is new shopping Application</h3>
                
                </div>

                
                <div className='container mt-5' style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                    {products.map((product) => (
                        <div
                            className='card w-100 p-2'
                            key={product.id}
                            style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}
                           
                        >
                            <div  onClick={() => fetchSingleProduct(product.id)}>
                            <img src={product.image} alt="product-img" width="250px" height="300px" />
                            </div>
                            <p>Category: {product.category}</p>
                            <p>Title: {product.title}</p>
                            <p>Price: {product.price}</p>
                            <button className='btn btn-danger' title='Delete-product' onClick={()=>deleteProduct(product.id)}><MdDelete/></button>
                            {/* <button className='btn btn-success' title='Add to cart' onClick={() => addToCart(product)}><BsCart4/></button> */}
                        </div>
                    ))}
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Single Product Details"
                >
                    {singleProduct && (
                        <div className='single-product-details d-flex mt-2'>
                            <div>
                            <h2>Single Product Details</h2>
                            <img src={singleProduct.image} alt="product-img" width="250px" height="300px" />
                            <p>Category: {singleProduct.category}</p>
                            <p>Title: {singleProduct.title}</p>
                            <p>Description: {singleProduct.description}</p>
                            <p>Price: {singleProduct.price}</p>
                             <button className='btn btn-primary' title='Add to cart' onClick={() => addToCart(singleProduct)}><BsCart4/></button>
                            </div>
                           <div>
                           <button className='btn btn-secondary' onClick={closeModal}>X</button>
                           </div>
                        </div>
                    )}
                </Modal>
            </div>
            </div>
        </>
    );
}

export default ProductList;
