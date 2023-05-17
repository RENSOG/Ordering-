import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Food.css";
import axios from "axios";

const Food = () => {
    const [cartItems, setCartItems] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: "",
        address: "",
        phoneNumber: "",
        email: "",
    });

    const addToCart = (food) => {
        const existingItem = cartItems.find((item) => item.id === food.id);
        if (existingItem) {
            const updatedCartItems = cartItems.map((item) => {
                if (item.id === food.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...food, quantity: 1 }]);
        }
    };

    const incrementQuantity = (food) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === food.id) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleInputChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckout = () => {
        
       console.log(cartItems, userDetails)
        // Sending email using a hypothetical sendEmail function
        sendEmail(cartItems, userDetails);
    };

    

    const sendEmail = () => {
        const orderData = {
          cartItems: cartItems,
          userDetails: userDetails
        };
      
        axios.post("http://localhost:2000/email", orderData)
          .then(response => {
            console.log("Email sent successfully");
          })
          .catch(error => {
            console.error("Email sending failed", error);
          });
      };
      
    

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`container${darkMode ? " dark-mode" : ""}`}>
            <div className="text-end mt-2">
                <button className="btn btn-secondary" onClick={toggleDarkMode}>
                    Toggle Dark Mode
                </button>
            </div>
            <h1 className="mt-3">Food Ordering Web Application</h1>
            <div className="row mt-4">
                {/* Food Item 1 */}
                <div className="col-lg-4 mb-4">
                    <div className="card">
                        <img
                            src="https://source.unsplash.com/random/800x600"
                            className="card-img-top"
                            alt="Food 1"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Food Item 1</h5>
                            <p className="card-text">Price: $10</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => addToCart({ id: 1, name: "Food 1", price: 10 })}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Food Item 2 */}
                <div className="col-lg-4 mb-4">
                    <div className="card">
                        <img
                            src="https://source.unsplash.com/random/800x600"
                            className="card-img-top"
                            alt="Food 2"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Food Item 2</h5>

                            <p className="card-text">Price: $15</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => addToCart({ id: 2, name: "Food 2", price: 15 })}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
                javascript
                Copy code
                {/* Add more food items as needed */}
            </div>
            <div className="mt-4">
                <h2>Cart</h2>
                {/* ...Rest of the code... */}
                {cartItems.map((item) => (
                    <div key={item.id} className="card mb-2">
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">Price: ${item.price}</p>
                            <p className="card-text">Quantity: {item.quantity}</p>
                            <button
                                className="btn btn-secondary"
                                onClick={() => incrementQuantity(item)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Checkout Form */}
            <div className="mt-4">
                <h2>Checkout</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={userDetails.name}

                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        Address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={userDetails.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
          />
        </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={userDetails.phoneNumber}
                        onChange={handleInputChange}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleCheckout}>
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Food;