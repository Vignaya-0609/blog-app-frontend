import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(""); 

  const navigate = useNavigate();

  const usernameCheck = () => {
    let nameRegex = /^[a-zA-Z\s_]*$/;
    if (!username.trim() || !nameRegex.test(username.trim())) {
      setUsernameError('Valid Username is required');
    } else {
      setUsernameError('');
    }
  };

  const userEmailCheck = () => {
    const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9]+@[a-z]+[.]+[a-z]{2,3}$/;
    const emailRegex2 = /^[a-zA-Z0-9]+[a-zA-Z0-9]+@[a-z]+[.]+[a-z]+[.]+[a-z]{2,3}$/;

    if (email.trim().match(emailRegex) || email.trim().match(emailRegex2)) {
      setEmailError('');
    } else {
      setEmailError('Valid Email is required');
    }
  }

  const userPasswordCheck = () => {
    if (!password.trim()) {
      setPasswordError('Password is required');
    } else if (password.trim().length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
  }

  const signup = async (e) => {
    e.preventDefault();

    // Validate fields
    usernameCheck();
    userEmailCheck();
    userPasswordCheck();

    // If there are no errors, proceed with the form submission
    if (usernameError || emailError || passwordError || username === "" || email === "" || password === "") {
      console.log("Validation failed");
    } else {
      console.log(username, email, password);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
          navigate("/");
        } else {
          setToastMessage("Signup failed! Please try again with different mail id.");
          setShowToast(true);
        }
      } catch (error) {
        setToastMessage("An unexpected error occurred. Please try again.");
        setShowToast(true);
        console.error("Error:", error);
      }
    }
  }

  return (
    <>
      <Form className='form-content mt-5' onSubmit={signup}>
        <h2 className='mb-5 text-center'>Register Here</h2>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username <span className='text-danger'>*</span></Form.Label>
          <Form.Control type="text" placeholder="Enter Username" value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={usernameCheck} />
          {usernameError && <p className="text-danger" style={{ fontSize: "12px" }}>{usernameError}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address <span className='text-danger'>*</span></Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={userEmailCheck} />
          {emailError && <p className="text-danger" style={{ fontSize: "12px" }}>{emailError}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password <span className='text-danger'>*</span></Form.Label>
          <Form.Control type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={userPasswordCheck} />
          {passwordError && <p className="text-danger" style={{ fontSize: "12px" }}>{passwordError}</p>}
        </Form.Group>
        <Button variant="primary" type="submit" className='w-100 mt-3'>
          Register
        </Button>
      </Form>

      {/* Toast for error messages */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast bg="danger" onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body className='text-light'>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default SignUp;
