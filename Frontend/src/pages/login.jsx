import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import "bootstrap-icons/font/bootstrap-icons.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await login({ email, password });
      if (res.status === 200) {
        navigate("/welcome");
        alert(" Login successful!");
      } else if (res.status === 401) {
        alert("Invalid credentials");
      } else {
        alert("Something went wrong please try again");
        console.log(res?.status);
      }
    } catch (error) {
      console.log("Error in Login", error);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isLoginDisabled = email === "" || password.length < 1 || loading;

  return (
    <>
      <Link to={"/"}>Back</Link>
      <h1>This is the login page</h1>
      <form>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div
          style={{
            width: "170px",
            backgroundColor: "purple",
            position: "relative",
          }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
            }}
          />
          <i
            className={showPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}
            style={{
              aspectRatio: "1",
              height: "100%",
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-39%)",
              cursor: "pointer",
            }}
            onClick={handleShowPassword}
          />
        </div>

        <button onClick={handleLogin} disabled={isLoginDisabled}>
          {loading ? "Logging In ..." : "Login"}
        </button>
      </form>
      <Link to={"/register"}>Create an account</Link>
    </>
  );
}

export default Login;
