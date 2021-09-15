import React, { useState, useRef } from "react";
import "./css/signin.css";
import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";

const Signin = ({ setShowLogin, myStorage, setCurrentUser }) => {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name: nameRef.current.value,
      password: passRef.current.value,
    };

    try {
      const res = await axios.post("/users/login", user);
      myStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      setShowLogin(false);

      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className="signinContainer">
      <div className="logo">
        <Room />
        Auy
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef}></input>
        <input type="password" placeholder="password" ref={passRef}></input>
        <button className="btnsignin">Giriş Yap</button>

        {error && <span className="fail">Başarısız Kayıt</span>}
      </form>
      <Cancel
        className="signincancel"
        OnClick={() => {
          setShowLogin(false);
        }}
      />
    </div>
  );
};

export default Signin;
