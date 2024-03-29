import React, { useEffect, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading/Loading";
import "./SignIn.css";
import SocialLogin from "../SocialLogin/SocialLogin";
import useToken from "../../hooks/useToken";
import auth from "../../firebase.init";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef("");

  const from = location.state?.from?.pathname || "/";

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  const [token] = useToken(user);

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
      window.scrollTo(0, 0);
    }
  }, [token, from, navigate]);

  let errorMessage;

  // loading spinner
  if (loading || sending) {
    return <Loading height={"h-small"}></Loading>;
  }

  // display error
  if (error) {
    errorMessage = error.message;
  }

  // sign in
  const handleSignIn = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    await signInWithEmailAndPassword(email, password);
  };

  // reset password
  const handleResetPassword = async () => {
    const email = emailRef.current.value;

    if (email) {
      await sendPasswordResetEmail(email);
      toast.success(`Email Sent to ${email}!`);
    } else {
      toast.error("Please, Enter a Email Address.");
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center f-opensans">
      <div className="w-md-50 w-100 p-5 section-box">
        <h1 className="fw-bold text-center heading">Sign in here</h1>
        <p className="text-center gray-color sub-text">
          Have no account yet? <Link to="/sign-up">Sign up</Link>
        </p>
        <Form onSubmit={handleSignIn} className="pt-4">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className="input-field py-2"
              ref={emailRef}
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicPassword">
            <Form.Control
              className="input-field py-2"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <p className="text-danger mb-0 small-text">
              {error &&
                errorMessage
                  .substring(22)
                  .replace(/[()']+/g, "")
                  .replace(/[-']+/g, " ")
                  .charAt(0)
                  .toUpperCase() +
                  errorMessage
                    .substring(22)
                    .replace(/[()']+/g, "")
                    .replace(/[-']+/g, " ")
                    .slice(1)}
            </p>
            <Button
              onClick={handleResetPassword}
              className="border-0 p-0 reset-button link-button"
              variant="link"
            >
              Reset Password
            </Button>
          </div>
          <Button
            className="border-0 w-100 py-2 px-4 mt-4 rounded-3 fw-bold f-merriweather secondary-bg button"
            type="submit"
          >
            Sign in
          </Button>
        </Form>
        <SocialLogin></SocialLogin>
      </div>
    </Container>
  );
};

export default SignIn;
