import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users`);
      const users = await response.json();
       console.log(users)
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        console.log("Login successful");
        localStorage.setItem("Bloguser", JSON.stringify(user));
        navigate("/user");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };
  return (
    <>
    <Form className='form-content mt-5' onSubmit={login}>
        <h3 className='text-center mb-3'>Welcome to ExpressThoughts!</h3>
        <p className='text-center mb-3'>ExpressThoughts is a dynamic blogging platform where ideas come to life.</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email}
              onChange={(e) => setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      {error && <p className="text-danger" style={{fontSize:"12px"}}>{error}</p>}
      <Button variant="primary" type="submit" className='w-100 mt-3'>
        Login
      </Button>
      <div className='mt-3 text-center'>
      New User? <Link to={"/register"} style={{color:"white"}} className='fw-bold'>Register Here!</Link>
      </div>
    </Form>

    </>
    
  );
}

export default Login;