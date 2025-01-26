import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import {register} from '../services/authService'
import "bootstrap-icons/font/bootstrap-icons.css";


function Register() {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
        await register({ name, email, password})
        navigate("/welcome")
        alert('Register successful!')
    } catch (error) {
        console.log('Error in registration', error)
    } 
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const isRegisterDisabled = name.length < 5 || email === '' || password.length < 6 || loading;

  return (
    <>
    <Link to={"/"}>Back</Link>
      <h1>This is the register page</h1>
      <form>
        <input type="text" placeholder="Enter Your Name" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="email" placeholder="Enter Your email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
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
        <button  onClick={handleRegister} disabled={isRegisterDisabled}>
          {loading ? 'Signing Up ...' : 'Register'}
        </button>
      </form>
      <Link to={"/login"}>Have an account?</Link>
    </>
  );
}

export default Register;
