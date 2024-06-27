import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { BsCart4 } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
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

    return (
        <>
            <div>
                <h3 style={{textAlign:'center'}}>This is new shopping Application</h3>
                <button className='btn btn-primary m-2 p-2' onClick={() => handleProductSort('asc')}>Sort-Product Ascending</button>
                <button className='btn btn-primary m-2 p-2' onClick={() => handleProductSort('desc')}>Sort-Product Descending</button>
                
                <div className='d-flex'>
                    {/* <h2>Categories</h2> */}
                    {categories.map((category) =>(
                        <button
                            key={category}
                            className='btn btn-secondary m-2'
                            onClick={() => fetchProductsByCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                
                <div className='container' style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
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
                    style={{
                        content: {
                            top: '50%',
                            left: '50%',
                            right: '50%',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex:'1000'
                        }
                    }}
                >
                    {singleProduct && (
                        <div className='single-product-details d-flex' style={{zIndex:"1000"}}>
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
        </>
    );
}

export default ProductList;
