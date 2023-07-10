import React, { useEffect, useState } from "react";

const VehicleModal = ({ active, handleModal, token, id, setErrorMessage }) => {
  const [licensePlate, setLicensePlate] = useState("");
  const [licensePlateCity, setLicensePlateCity] = useState("");
  const [licensePlateState, setLicensePlateState] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleRENAVAM, setVehicleRENAVAM] = useState("");
  const [vehicleChassis, setVehicleChassis] = useState("");
  const [vehicleAxles, setVehicleAxles] = useState("");

  useEffect(() => {
    const getVehicle = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`/api/vehicles/${id}`, requestOptions);

      if (!response.ok) {
        // setErrorMessage("Não foi possível encontrar o veículo.");
        console.log("Não foi possível encontrar o veículo.");
      } else {
        const data = await response.json();
        setLicensePlate(data.license_plate);
        setLicensePlateCity(data.license_plate_city);
        setLicensePlateState(data.license_plate_state);
        setVehicleType(data.v_type);
        setVehicleMake(data.v_make);
        setVehicleModel(data.v_model);
        setVehicleYear(data.year);
        setVehicleColor(data.color);
        setVehicleRENAVAM(data.renavam);
        setVehicleChassis(data.chassis);
        setVehicleAxles(data.axles_number);
      }
    };

    if (id) {
      getVehicle();
    }
  }, [id, token]);

  const cleanFormData = () => {
    setLicensePlate("");
    setLicensePlateCity("");
    setLicensePlateState("");
    setVehicleType("");
    setVehicleMake("");
    setVehicleModel("");
    setVehicleYear("");
    setVehicleColor("");
    setVehicleRENAVAM("");
    setVehicleChassis("");
    setVehicleAxles("");
  };

  const handleCreateVehicle = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        license_plate: licensePlate,
        license_plate_city: licensePlateCity,
        license_plate_state: licensePlateState,
        v_type: vehicleType,
        v_make: vehicleMake,
        v_model: vehicleModel,
        color: vehicleColor,
        year: vehicleYear,
        renavam: vehicleRENAVAM,
        chassis: vehicleChassis,
        axles_number: vehicleAxles,
      }),
    };

    const response = await fetch("/api/vehicles", requestOptions);
    if (!response.ok) {
      setErrorMessage("Erro ao cadastrar veículo.");
    } else {
      cleanFormData();
      handleModal();
    }
  };

  const handleUpdateVehicle = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        license_plate: licensePlate,
        license_plate_city: licensePlateCity,
        license_plate_state: licensePlateState,
        v_type: vehicleType,
        v_make: vehicleMake,
        v_model: vehicleModel,
        color: vehicleColor,
        year: vehicleYear,
        renavam: vehicleRENAVAM,
        chassis: vehicleChassis,
        axles_number: vehicleAxles,
      }),
    };
    const response = await fetch(`/api/vehicles/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Erro ao editar veículo.");
    } else {
      cleanFormData();
      handleModal();
    }
  };

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="modal-background" onClick={handleModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-primary-light">
          <h1 className="modal-card-title">
            {id ? "Update Vehicle" : "Create Vehicle"}
          </h1>
        </header>
        <section className="modal-card-body">
          <form>
            <div className="field">
              <label className="label">Placa</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Cidade de Emplacamento</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={licensePlateCity}
                  onChange={(e) => setLicensePlateCity(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Estado de Emplacamento</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={licensePlateState}
                  onChange={(e) => setLicensePlateState(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Tipo de Veículo</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Fabricante</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Modelo</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Cor</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Ano de Fabricação</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">RENAVAM</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={vehicleRENAVAM}
                  onChange={(e) => setVehicleRENAVAM(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Chassi</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={vehicleChassis}
                  onChange={(e) => setVehicleChassis(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Número de Eixos</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={vehicleAxles}
                  onChange={(e) => setVehicleAxles(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot has-background-primary-light">
          {id ? (
            <button className="button is-info" onClick={handleUpdateVehicle}>
              Update
            </button>
          ) : (
            <button className="button is-primary" onClick={handleCreateVehicle}>
              Create
            </button>
          )}
          <button className="button" onClick={handleModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default VehicleModal;
