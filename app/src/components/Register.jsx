import React, { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";

const Register = () => {
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitRegistration = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ document: document, email: email, address: address, state: state, city: city, phone: phone, hashed_password: password}),
    };

    console.log("enviando requisição")

    const response = await fetch("/api/vehicle_owners", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmationPassword && password.length > 5) {
      submitRegistration();
    } else {
      setErrorMessage(
        "As senhas não conferem ou possuem menos de 6 caracteres."
      );
    }
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Cadastrar</h1>
        <div className="field">
          <label className="label">Documento (CPF/CNPJ)</label>
          <div className="control">
            <input
              type="text"
              placeholder="Insira o Documento"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="email"
              placeholder="Insira o Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Endereço</label>
          <div className="control">
            <input
              type="text"
              placeholder="Insira o Endereço"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Cidade</label>
          <div className="control">
            <input
              type="text"
              placeholder="Insira a Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Estado (UF)</label>
          <div className="control">
            <input
              type="text"
              placeholder="Insira o Estado (UF)"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Telefone</label>
          <div className="control">
            <input
              type="text"
              placeholder="Insira o Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Senha</label>
          <div className="control">
            <input
              type="password"
              placeholder="Insira a Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Confirmar Senha</label>
          <div className="control">
            <input
              type="password"
              placeholder="Enter password"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
