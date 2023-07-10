import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import ErrorMessage from "./ErrorMessage";
import VehicleModal from "./VehicleModal";
import { UserContext } from "../context/UserContext";

const Table = () => {
  const [token] = useContext(UserContext);
  const [vehicles, setVehicles] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [id, setId] = useState(null);

  const handleUpdate = async (id) => {
    setId(id);
    setActiveModal(true);
  };

  const handleDelete = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`/api/vehicles/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Erro ao excluir o veículo.");
    }

    getVehicles();
  };

  const getVehicles = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch("/api/vehicles", requestOptions);
    if (!response.ok) {
      setErrorMessage("Não foi possível encontrar seus veículos.");
    } else {
      const data = await response.json();
      setVehicles(data);
      setLoaded(true);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const handleModal = () => {
    setActiveModal(!activeModal);
    getVehicles();
    setId(null);
  };

  return (
    <>
      <VehicleModal
        active={activeModal}
        handleModal={handleModal}
        token={token}
        id={id}
        setErrorMessage={setErrorMessage}
      />
      <button
        className="button is-fullwidth mb-5 is-primary"
        onClick={() => setActiveModal(true)}
      >
        Create Vehicle
      </button>
      <ErrorMessage message={errorMessage} />
      {loaded && vehicles ? (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Placa</th>
              <th>Cidade de Emplacamento</th>
              <th>Estado de Emplacamento</th>
              <th>Tipo do Veículo</th>
              <th>Fabricante</th>
              <th>Modelo</th>
              <th>Cor</th>
              <th>Ano</th>
              <th>RENAVAM</th>
              <th>Chassi</th>
              <th>Número de Eixos</th>
              <th>Última Atualização</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.license_plate}</td>
                <td>{vehicle.license_plate_city}</td>
                <td>{vehicle.license_plate_state}</td>
                <td>{vehicle.v_type}</td>
                <td>{vehicle.v_make}</td>
                <td>{vehicle.v_model}</td>
                <td>{vehicle.color}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.renavam}</td>
                <td>{vehicle.chassis}</td>
                <td>{vehicle.axles_number}</td>
                <td>{moment(vehicle.date_last_updated).format("MMM Do YY")}</td>
                <td>
                  <button
                    className="button mr-2 is-info is-light"
                    onClick={() => handleUpdate(vehicle.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="button mr-2 is-danger is-light"
                    onClick={() => handleDelete(vehicle.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  );
};

export default Table;
