import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const database = [
    {
      username: "toko1",
      password: "12345678",
      kode: "TK01"
    },
    {
      username: "toko2",
      password: "123456",
      kode: "TK02"
    },
    {
      username: "toko3",
      password: "rahasia",
      kode: "TK03"
    }
  ];

  const [errorMessages, setErrorMessages] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [state, setState] = useState({ user: "", kode: "" });
  const [logs, setLogs] = useState([]);

  const errors = {
    uname: "Username tidak ditemukan",
    pass: "Gagal login, cek kombinasi username dan password"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var { uname, pass } = document.forms[0];
    const userData = database.find((user) => user.username === uname.value);

    if (userData) {
      if (userData.password !== pass.value) {
        setErrorMessages({ name: "pass", message: errors.pass });
        setLogs((logs) => [...logs, errors.pass]);
        setState({ user: "", kode: "" });
      } else {
        setState({ user: userData.username, kode: userData.kode });
        setIsLoggedIn(true);
        setLogs((logs) => [
          ...logs,
          "User " + userData.username + " berhasil login"
        ]);
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
      setLogs((logs) => [...logs, "Gagal login, " + errors.uname]);
      setState({ user: "", kode: "" });
    }
  };

  const logout = (e) => {
    e.preventDefault();
    setLogs((logs) => [...logs, "User " + state.user + " berhasil logout"]);
    setIsLoggedIn(false);
    setState({ user: "", kode: "" });
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {!isLoggedIn && <div className="title">Form Login</div>}
        {isLoggedIn ? (
          <div>
            Selamat user {state.user} dengan kode toko {state.kode} berhasil
            login
            <div>
              <button className="btn btn-info" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          renderForm
        )}
      </div>
      <ol>
        {logs.map((result, index) => {
          return <li>{result}</li>;
        })}
      </ol>
    </div>
  );
}
