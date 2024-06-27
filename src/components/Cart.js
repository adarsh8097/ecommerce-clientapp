import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cart, setCart }) {
    // Create a function to calculate the total price for each item based on quantity
     const navigate = useNavigate('');
    const calculateTotalPrice = (item) => {
        return (item.price * item.quantity).toFixed(2); // Assuming price is in float or decimal
    };

    // Create an object to keep track of quantities and total prices for unique products
    const aggregatedCart = cart.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = { ...item, total: calculateTotalPrice(item) };
        } else {
            acc[item.id].quantity += item.quantity;
            acc[item.id].total = calculateTotalPrice(acc[item.id]);
        }
        return acc;
    }, {});

    // Calculate the total sum of all prices in the cart
    const totalCartPrice = Object.values(aggregatedCart).reduce((total, item) => {
        return total + parseFloat(item.total);
    }, 0).toFixed(2); // Ensure toFixed(2) for proper formatting if needed

    // Function to handle item deletion from cart
    const deleteItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
    };

     const handleData =()=>{
        navigate('/orderlist');
     }
    return (
        <div>
            <h2>Cart Items</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Action</th> {/* Added column for delete action */}
                    </tr>
                </thead>
                <tbody>
                    {Object.values(aggregatedCart).map((item, index) => (
                        <tr key={index}>
                            <td><img src={item.image} alt="cart-item-img" style={{ width: "100px", height: "100px" }} /></td>
                            <td>{item.category}</td>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.total}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteItem(item.id)}>Delete</button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5" style={{ textAlign: "right" }}>Total:</td>
                        <td>{totalCartPrice}</td>
                         {/* Empty cell to align with action column */}
                        <td>
                            <button className='btn btn-primary' onClick={handleData}>BuyNow</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default Cart;
