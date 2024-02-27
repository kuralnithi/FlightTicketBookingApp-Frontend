import React, { Suspense, createContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
const PassengerDetails = React.lazy(() => import("./Pages/PassengerDetails"));
const LoadingPage = React.lazy(() => import("./Pages/LoadingPage"));
const FlightList = React.lazy(() => import("./Pages/FlightList"));
const SearchPage = React.lazy(() => import("./Pages/SearchPage"));
const LandingPage = React.lazy(() => import("./Pages/LandingPage"));
const PassengerTicket = React.lazy(() => import("./Pages/PassengerTicket"));
const UserPage = React.lazy(() => import("./UserPage/UserPage"));
const ResetPasswordpage = React.lazy(() => import("./UserPage/ResetPasswordpage"));
const UserChart = React.lazy(() => import("./UserPage/UserChart"));

export const myContext = createContext();
import { motion } from "framer-motion";

const App = () => {
  const [myflight, setMyflight] = useState("");

  //search page

  const [loggedin, setLoggedin] = useState(false);

  //flight searchbox
  const [activeTab, setActiveTab] = useState("oneWay");
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [numTravelers, setNumTravelers] = useState(1);
  const [fromInput, setFromInput] = useState("");
  const [toInput, settoInput] = useState("");
  const [fromhide, setfromhide] = useState(false);
  const [tohide, settohide] = useState(false);
  const [airports, setAirports] = useState([]);
  const [fromAirportCode, setFromAirportCode] = useState("");
  const [toAirportCode, setToAirportCode] = useState("");
  const [fromAirportCity, setFromAirportCity] = useState("");
  const [toAirportCity, setToAirportCity] = useState("");
  const [cabinClass, setcabinClass] = useState("");

  //flight list

  const [flights, setFlights] = useState([]);
  const [departureCity, setdepartureCity] = useState("");
  const [arrivalCity, setarrivaleCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  // const [returnDate, setreturnDate] = useState('');
  const [arrivalAirportCode, setarrivaleAirportCode] = useState("");
  const [departureAirportCode, setdepartureAirportCode] = useState("");
  const [passengercount, setPassengerCount] = useState("");
  // const [cabinClass, setCabinClass] = useState('');
  // const [myflight, setMyflight] = useState('');

  //passenger details

  const [passengerDetails, setPassengerDetails] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalCost, setTotalcost] = useState("");
  const [username, setUsername] = useState("");
  const [emailid, setemailid] = useState("");
  const [bookedDate, setBookedDate] = useState("");

  //userpage
  const [userList, setUserList] = useState([]);

  return (
    <>
      <myContext.Provider
        value={{
          myflight,
          setMyflight,
          activeTab,
          setActiveTab,
          from,
          setFrom,
          departDate,
          setDepartDate,
          returnDate,
          setReturnDate,
          numTravelers,
          setNumTravelers,
          to,
          setTo,
          fromInput,
          setFromInput,
          toInput,
          settoInput,
          fromhide,
          setfromhide,
          tohide,
          settohide,
          airports,
          setAirports,
          fromAirportCode,
          setFromAirportCode,
          toAirportCode,
          setToAirportCode,
          fromAirportCity,
          setFromAirportCity,
          toAirportCity,
          setToAirportCity,
          cabinClass,
          setcabinClass,
          flights,
          setFlights,
          departureCity,
          setdepartureCity,
          arrivalCity,
          setarrivaleCity,
          departureDate,
          setDepartureDate,
          arrivalAirportCode,
          setarrivaleAirportCode,
          departureAirportCode,
          setdepartureAirportCode,
          passengercount,
          setPassengerCount,
          passengerDetails,
          setPassengerDetails,
          selectedSeats,
          setSelectedSeats,
          totalCost,
          setTotalcost,
          username,
          setUsername,
          emailid,
          setemailid,
          bookedDate,
          setBookedDate,
          loggedin,
          setLoggedin,
          userList,
          setUserList,
        }}
      >
        <BrowserRouter>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/flightlist" element={<FlightList />} />
              <Route path="/passengerdetails" element={<PassengerDetails />} />
              <Route path="/PassengerTicket" element={<PassengerTicket />} />
              <Route path="/userpage" element={<UserPage />} />
              <Route path="/Preset" element={<ResetPasswordpage />} />
              <Route path="/userchart" element={<UserChart />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </myContext.Provider>
    </>
  );
};

export default App;
