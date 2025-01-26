import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { useAuth } from "../services/authContext";
import axios from "axios";

function Welcome() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(""); 

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    try {      
      e.preventDefault();
      const response = await axios.post(
        'http://localhost:3000/stkpush', {phone, amount}
      );
      console.log("Payment initiated:", response.data); 
      alert("STK Push sent successfully!"); 
    } catch (error) {
      console.error("Error in posting payment details: ", error.message);
    }
  };

  return (
    <>
      {isLoggedIn && user ? (
        <>
          <h1>Welcome {user.userName}</h1>
          <button onClick={handleLogout}>Logout</button>
          <h1>Payment method</h1>
          <form onSubmit={handleSubmit}>
            <input type="tel" placeholder="e.g.., 254712345678" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            <input type="number" placeholder="Enter amount ..." value={amount} onChange={(e) => setAmount(e.target.value)}/>
            <button type="submit">Pay</button>
          </form>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default Welcome;
