import React, { useState, useRef } from "react";
import "./css/signup.css";
import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";

const Signup = ({ setShowRegister }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name: nameRef.current.value,
      mail: emailRef.current.value,
      password: passRef.current.value,
    };

    try {
      const res = await axios.post("/users/register", newUser);
      setSuccess(true);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className="signupContainer">
      <div className="logo">
        <Room />
        Auy
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef}></input>
        <input type="email" placeholder="email" ref={emailRef}></input>
        <input type="password" placeholder="password" ref={passRef}></input>
        <button className="btnsignup">Kayıt OL</button>
        {success && <span className="success">Başarılı Kayıt</span>}
        {error && <span className="fail">Başarısız Kayıt</span>}
      </form>
      <Cancel
        className="signupcancel"
        OnClick={() => {
          setShowRegister(false);
        }}
      />
    </div>
  );
};

export default Signup;
