import React, { useState } from "react";
import "./Auth.scss";

import { login, signup } from "../services/auth";

export const Auth = ({
  match: {
    params: { type }
  },
  history: { push }
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    if (type === "login") {
      await login(email, password);
      push("/profile");
    } else if (type === "signup") {
      await signup(email, password);
      push("/auth/login");
    }
    setLoading(false);
  };
  return (
    <form className="session-form">
      <h1>{type[0].toUpperCase() + type.slice(1)}</h1>
      <label>
        Email
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
      </label>
      <button type="submit" onClick={handleSubmit} disabled={loading}>
        <i className="material-icons">check</i>
        {loading ? "Submitting.." : "Submit"}
      </button>
    </form>
  );
};
