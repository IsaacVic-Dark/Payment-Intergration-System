import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { useAuth } from "../services/authContext";
import { useState } from "react";
// import IntlTelInput from 'react-intl-tel-input';
// import "intl-tel-input/build/css/intlTelInput.css";

function Welcome() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth(); // Correct destructuring
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneChange = (isValid, value, countryData) => {
    console.log("Phone is valid:", isValid);
    console.log("Phone value:", value);
    console.log("Country data:", countryData);
    setPhoneNumber(value);
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  return (
    <>
      {isLoggedIn && user ? (
        <>
          <h1>Welcome {user.userName}</h1>
          <button onClick={handleLogout}>Logout</button>
          <h1>Payment method</h1>
          {/* <IntlTelInput
            preferredCountries={["us", "ke"]} // Example: preferred countries
            defaultCountry="auto"
            fieldId="phone"
            fieldName="phone"
            onPhoneNumberChange={(isValid, value, countryData) =>
              handlePhoneChange(isValid, value, countryData)
            }
            onPhoneNumberBlur={(isValid, value, countryData) =>
              handlePhoneChange(isValid, value, countryData)
            }
            autoHideDialCode
            separateDialCode
          /> */}
          <form action="">
            <input type="tel" placeholder="e.g.., 254712345678" />
            <input type="number" placeholder="Enter amount ..." />
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
