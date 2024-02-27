import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/PassengerDetails.css";
import axios from "axios";
import { myContext } from "../App";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../Payment/PaymentModal";

const PassengerDetails = () => {
  const [passengerCount, setPassengerCount] = useState("");
  const [flights, setFlights] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const {
    myflight,
    passengerDetails,
    setPassengerDetails,
    selectedSeats,
    setSelectedSeats,
    totalCost,
    setTotalcost,
  } = useContext(myContext);

  setTotalcost(+myflight.price.slice(1) * passengerCount);

  console.log(passengerDetails);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(
          "https://fligthback.onrender.com/api/getflight"
        );
        setFlights(response.data.data);
        setPassengerCount(response.data.data[0]["passengercount"]);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlights();
  }, []);

  useEffect(() => {
    if (passengerCount !== "") {
      const initialDetails = Array.from({ length: passengerCount }, () => ({
        name: "",
        age: "",
        gender: "",
        seatNumber: null,
        email: "",
        mobile: "",
      }));
      setPassengerDetails(initialDetails);
    }
  }, [passengerCount]);

  const handleSeatSelection = (seatNumber) => {
    const index = selectedSeats.indexOf(seatNumber);
    if (index === -1 && selectedSeats.length < passengerCount) {
      setSelectedSeats([...selectedSeats, seatNumber]);
      // Find the first passenger without a seatNumber and assign the selected seat
      const passengerIndex = passengerDetails.findIndex(
        (passenger) => !passenger.seatNumber
      );
      if (passengerIndex !== -1) {
        const updatedDetails = [...passengerDetails];
        updatedDetails[passengerIndex].seatNumber = seatNumber;
        setPassengerDetails(updatedDetails);
      }
    } else {
      const updatedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
      setSelectedSeats(updatedSeats);
      const passengerIndex = passengerDetails.findIndex(
        (passenger) => passenger.seatNumber === seatNumber
      );
      if (passengerIndex !== -1) {
        const updatedDetails = [...passengerDetails];
        updatedDetails[passengerIndex].seatNumber = null;
        setPassengerDetails(updatedDetails);
      }
    }
  };

  const handlePassengerDetailsChange = (index, field, value) => {
    const updatedDetails = [...passengerDetails];

    updatedDetails[index][field] = value;

    setPassengerDetails(updatedDetails);
  };

  const renderSeats = () => {
    const seats = [];
    const groups = ["A", "B", "C"];

    for (let i = 0; i < groups.length; i++) {
      seats.push(
        <div key={groups[i]} className="seat-group ">
          <h3 className="m-md-5 m-4 seath">{groups[i]}</h3>
          <div className="seat-row ">{renderGroupSeats(groups[i])}</div>
          {console.log(renderGroupSeats(groups[i]))}  
        </div>
      );
    }

    return seats;
  };

  const renderGroupSeats = (group) => {
    const rows = 5;
    const cols = 3;
    const groupSeats = [];

    for (let i = 1; i <= rows; i++) {
      const rowSeats = [];
      for (let j = 1; j <= cols; j++) {
        const seatNumber = `${group}${i}${j}`;
        const seatClass = selectedSeats.includes(seatNumber) ? "selected" : "";
        rowSeats.push(
          <div
            key={seatNumber}
            className={`seat ${seatClass}`}
            onClick={() => handleSeatSelection(seatNumber)}
          >
            {seatNumber}
          </div>
        );
      }
      groupSeats.push(
        <div key={i} className="seat-row">
          {rowSeats}
        </div>
      );
    }

    return groupSeats;
  };

  console.log("aaa", myflight);

  const handleCancel = () => {
    navigate("/");
  };

  const handleConfirmPayment = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container-fluid text-center passengercontainer">
      <h1 className="psdh">Passenger Details</h1>

      {/* Passenger details input */}
      {passengerDetails.map((passenger, index) => (
        <div
          key={index}
          className="form-control passenger-detailscard row container-fluid "
        >
          <h3 className="pslisth">Passenger {index + 1} </h3>

          <input
            className="form-control col-md-3 col-12 mx-1 "
            required
            type="text"
            placeholder="Name"
            value={passenger.name}
            onChange={(e) =>
              handlePassengerDetailsChange(index, "name", e.target.value)
            }
            id="passengername"
          />

          <input
            className="form-control col-md-3 col-12 mt-4 mx-1"
            max={130}
            min={1}
            required
            type="number"
            placeholder="Age"
            value={passenger.age}
            onChange={(e) =>
              handlePassengerDetailsChange(index, "age", e.target.value)
            }
          />
          <select
            className="form-select col-md-3 col-12 mt-4 mx-1"
            value={passenger.gender}
            required
            onChange={(e) =>
              handlePassengerDetailsChange(index, "gender", e.target.value)
            }
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            className="form-control col-md-3 col-12 mt-4 mx-1"
            required
            placeholder="Enter email id"
            type="email"
            value={passenger.email} // Link to passenger.email in state
            onChange={(e) =>
              handlePassengerDetailsChange(index, "email", e.target.value)
            }
          />

          <input
            className="form-control col-md-3 col-12 mt-4 mx-1"
            placeholder="Enter mobile number"
            type="tel"
            required
            value={passenger.mobile} // Link to passenger.mobile in state
            onChange={(e) =>
              handlePassengerDetailsChange(index, "mobile", e.target.value)
            }
          />
        </div>
      ))}

      {/* Seat selection */}
      <div className="seat-container container-fluid ">
        <h3 className="selectseats">Select Seats </h3>
        <div className="seats ">{renderSeats()}</div>
      </div>

      {/* Display passenger details below seat selection */}
      <div className="selected-passenger-details">
        <h1 className="passlisttitl1 selectseats mt-5  "> PASSENGER INFO </h1>
        {passengerDetails.map((passenger, index) => (
          <div key={index} className="passenger-details-box">
            <h4 className="selectedpsh">Passenger {index + 1} Details</h4>
            <p className="selectedps">Seat Number: {passenger.seatNumber}</p>
            <p className="selectedps">Name: {passenger.name}</p>
            <p className="selectedps">Age: {passenger.age}</p>
            <p className="selectedps">Gender: {passenger.gender}</p>
            <p className="selectedps">E-mail: {passenger.email}</p>
            <p className="selectedps">Mobile: {passenger.mobile}</p>
            <p className="selectedps">price: {myflight.price}</p>
          </div>
        ))}
        <hr className="pshrline" />
        <div className="total">
          <span>
            Total Price = ₹ {+myflight.price.slice(1) * passengerCount}{" "}
          </span>{" "}
        </div>
        <button className="btn payconbtn" onClick={handleConfirmPayment}>
          confirm payment
        </button>{" "}
        <br />
        <button className="btn payconbtn" onClick={handleCancel}>
          back to main
        </button>
      </div>

      <PaymentModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default PassengerDetails;
