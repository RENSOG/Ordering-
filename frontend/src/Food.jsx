import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Food.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Food = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    // Perform logout logic here, such as clearing user session or token
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/");
  };

  const handleCheckout = () => {
    // Validate input form
    if (
      userDetails.name.trim() === "" ||
      userDetails.address.trim() === "" ||
      userDetails.phoneNumber.trim() === "" ||
      userDetails.email.trim() === ""
    ) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    // Validate food order
    if (cartItems.length === 0) {
      toast.error("Please select at least one food item to place an order.");
      return;
    }

    // Show confirmation message
    const confirmMessage = `Are the following details correct?\n\nName: ${
      userDetails.name
    }\n\nAddress: ${userDetails.address}\nPhone Number: ${
      userDetails.phoneNumber
    }\n\nItems:\n${cartItems
      .map((item) => `- ${item.name}, (quantity:${item.quantity})`)
      .join("\n")}`;

    if (window.confirm(confirmMessage)) {
      // Sending email using a hypothetical sendEmail function
      sendEmail(cartItems, userDetails);

      toast.success(
        "Successfully Placed , Check your Email,  Your Food will be before One Hour "
      );
      setUserDetails({
        name: "",
        address: "",
        phoneNumber: "",
        email: "",
      });
      setCartItems([]);
    }
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const sendEmail = () => {
    const orderData = {
      cartItems: cartItems,
      userDetails: userDetails,
    };

    axios
      .post("http://localhost:2000/email", orderData)
      .then((response) => {
        console.log("Email sent successfully");
        toast.success("Check Your Email");
      })
      .catch((error) => {
        console.error("Email sending failed", error);
        toast.error("Error On Email");
      });
  };

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`body ${darkMode ? "dark-mode" : ""}`}
      style={{ marginTop: "-25px" }}
    >
      <br></br>
      <br></br>
      <h1
        className="mt-3 text-center"
        style={{ fontFamily: "fantasy" }}
      >
        Cuddalore Fish Ordering App&nbsp;<i class="bi bi-egg-fried"></i>
        &nbsp;&nbsp;
        <button
          className={`btn ${darkMode ? "btn-light" : "btn-dark"}`}
          onClick={toggleDarkMode}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </h1>
      <br></br>
      <div className="row mt-4 p-5">
        {/* Food Item 1 */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card shadow rounded-5">
            <div className="card-img-container shadow rounded-5">
              <img
                src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="card-img-top food-image"
                alt="Food 1"
              />
            </div>
            <div className="card-body  rounded-5">
              <h5 className="card-title" style={{ fontFamily: "cursive" }}>
                Strawberry<i class="bi bi-egg-fill"></i>
              </h5>
              <p className="card-text">Price: $15</p>
              <button
                className="btn btn-success"
                onClick={() =>
                  addToCart({ id: 1, name: "Strawberry", price: 15 })
                }
              >
                Add to Cart&nbsp;<i class="bi bi-cart-plus-fill"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Food Item 2 */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card shadow">
            <div className="card-img-container">
              <img
                src="https://th.bing.com/th/id/OIP.CuZulFJLaSLOWobjBM7j2wHaE8?w=262&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                className="card-img-top food-image"
                alt="Food 2"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: "cursive" }}>
                Mutton Fry<i class="bi bi-egg-fill"></i>
              </h5>
              <p className="card-text">Price: $35</p>
              <button
                className="btn btn-success"
                onClick={() =>
                  addToCart({ id: 2, name: "Mutton Fry", price: 35 })
                }
              >
                Add to Cart&nbsp;<i class="bi bi-cart-plus-fill"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Food Item 2 */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card shadow">
            <div className="card-img-container">
              <img
                src="https://th.bing.com/th/id/OIP.qIBkr1Z7bnchJYjkrk1j2QHaEw?w=293&h=189&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                className="card-img-top food-image"
                alt="Food 2"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: "cursive" }}>
                Fire Burger<i class="bi bi-egg-fill"></i>
              </h5>
              <p className="card-text">Price: $305</p>
              <button
                className="btn btn-success"
                onClick={() =>
                  addToCart({ id: 3, name: "Fire Burger", price: 305 })
                }
              >
                Add to Cart&nbsp;<i class="bi bi-cart-plus-fill"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Food Item 2 */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card shadow">
            <div className="card-img-container">
              <img
                src="https://images.pexels.com/photos/2116094/pexels-photo-2116094.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="card-img-top food-image"
                alt="Food 2"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: "cursive" }}>
                Pizza<i class="bi bi-egg-fill"></i>
              </h5>
              <p className="card-text">Price: $350</p>
              <button
                className="btn btn-success"
                onClick={() => addToCart({ id: 4, name: "Pizza", price: 350 })}
              >
                Add to Cart&nbsp;<i class="bi bi-cart-plus-fill"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Food Item 2 */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card shadow">
            <div className="card-img-container">
              <img
                src="https://th.bing.com/th/id/OIP.JnMF30lk9598qebi2zfyEwHaEK?w=320&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                className="card-img-top food-image"
                alt="Food 2"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: "cursive" }}>
                Burger<i class="bi bi-egg-fill"></i>
              </h5>
              <p className="card-text">Price: $35</p>
              <button
                className="btn btn-success"
                onClick={() => addToCart({ id: 5, name: "Burger", price: 35 })}
              >
                Add to Cart&nbsp;<i class="bi bi-cart-plus-fill"></i>
              </button>
            </div>
          </div>
        </div>
        {/* Food Item 2 */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card shadow">
            <div className="card-img-container">
              <img
                src="https://th.bing.com/th/id/OIP.jZNp-_jfjm_mRR0sJmmzWQHaF7?w=230&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                className="card-img-top food-image"
                alt="Food 2"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: "cursive" }}>
                Chicken<i class="bi bi-egg-fill"></i>
              </h5>
              <p className="card-text">Price: $100</p>
              <button
                className="btn btn-success"
                onClick={() =>
                  addToCart({ id: 6, name: "Chicken", price: 100 })
                }
              >
                Add to Cart&nbsp;<i class="bi bi-cart-plus-fill"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Add more food items as needed */}
      </div>
      <div className=" cart mt-4 shadow ">
        <div className="row p-5">
          <h2><i class="bi bi-cart-check-fill"></i> &nbsp;Cart</h2>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Price: ${item.price}</p>
                  <p className="card-text">Quantity: {item.quantity}</p>
                  <button
                    type="button"
                    className="btn btn-outline-success position-relative"
                    onClick={() => incrementQuantity(item)}
                  >
                    {item.name}
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {item.quantity}
                      <span className="visually-hidden">Quantity</span>
                    </span>
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeFromCart(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br></br>

      <div className="card-1 shadow mb-2">
        <div className="card-body p-5">
          <h3 className="card-title"><i class="bi bi-brightness-high"></i> &nbsp;Order Summary</h3>
          <br></br>
          <p className="card-text-success">Total Quantity: {totalQuantity}</p>
          <p className="total-cost">
            Total Cost:{" "}
            <span className="cost-pill">${totalCost.toFixed(2)}</span>
          </p>
        </div>
      </div>

      <div className="mt-4 p-5">
  <h2>Checkout&nbsp;<i class="bi bi-bag-check-fill"></i></h2>
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <form>
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
          <div className="d-flex justify-content-start align-items-center">
            <button
              className="btn btn-info"
              onClick={handleCheckout}
            >
              Place Order &nbsp;<i class="bi bi-shop"></i>
            </button>
            <div className="d-flex justify-content-end m-3">
              <button
                className="btn btn-danger m-2"
                onClick={handleLogout}
              >
                Logout&nbsp;<i class="bi bi-box-arrow-right"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

   

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Food;
