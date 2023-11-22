// FlightSearchBox.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { throttle } from 'lodash';
import { myContext } from './App';

const FlightSearchBox = () => {


const navigate = useNavigate();


const [error,seterror]=useState(false)


 const { myflight, setMyflight, activeTab, setActiveTab, from, setFrom, departDate, setDepartDate, returnDate, setReturnDate, numTravelers, setNumTravelers, to, setTo, fromInput, setFromInput, toInput, settoInput, fromhide, setfromhide, tohide, settohide, airports, setAirports, fromAirportCode, setFromAirportCode, toAirportCode, setToAirportCode, fromAirportCity, setFromAirportCity, toAirportCity, setToAirportCity, cabinClass, setcabinClass } = useContext(myContext);

  useEffect(() => {
    
    fetch('https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json')
      .then(response => response.json())
    .then(data => setAirports(data));
  
  
  }, []);
  

  const  filteredAirportsfromThrottled = throttle((e) => {
  setFromInput(e.target.value);

  const fromList = airports.filter((airport) =>
    airport.name.toLowerCase().includes(fromInput.toLowerCase())
  );

  setFrom(fromList);
}, 300);
const  filteredAirportstoThrottled= throttle((e) => {
  settoInput(e.target.value);

  const toList = airports.filter((airport) =>
    airport.name.toLowerCase().includes(toInput.toLowerCase())
  );

  setTo(toList);
}, 300); 
  
 
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  const checkLimit = (e) => {
  if(e.target.value > 8)setNumTravelers(8)
  if(e.target.value < 1)setNumTravelers(1)
  
}

  const handleSearch = (async () => {


    if (fromInput == "" || toInput == "" || departDate == "" || numTravelers == "" || cabinClass == "") {

      
      seterror(true);
 
 
      setTimeout(() => {
      seterror(false);
        
      }, 2000);

    }
    else {
      const setflights = await axios.post('https://fligthback.onrender.com/api/fligthSearch', {
      
        "departureAirportCode": fromAirportCode,
        "departureAirport": fromInput,
        "departureCity": fromAirportCity,
        "arrivalAirportCode": toAirportCode,
        "arrivalAirport": toInput,
        "arrivalCity": toAirportCity,
        "departureDate": departDate,
        "returnDate": returnDate,
        "passengercount": numTravelers,
        "cabinClass": cabinClass
    
      });
    
      const result = await setflights.data.data
      console.log(result);
      

      setFromInput("");
      settoInput("");
      setDepartDate('');
      setReturnDate('');
      setNumTravelers('');
      setcabinClass("");

      navigate('/loading');

    setTimeout(() => {

      navigate('/flightlist')

    }, 4000); 
    


    } 
  
    });

console.log(cabinClass);
  return (
 
    <div className="container searchbox mt-5 pt-5">
          <ul className="nav nav-tabs">
        <li className="nav-item ">
          <button
            className={`nav-link  ${activeTab === 'oneWay' ? 'active' : ''}`}
            onClick={() => handleTabChange('oneWay')}>
            One Way
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'return' ? 'active' : ''}`}
            onClick={() => handleTabChange('return')} 
          >
            Return
          </button>
        </li>
      
      </ul>

      <div className="tab-content mt-3">
        <div
          className={`tab-pane fade ${activeTab === 'oneWay' ? 'show active' : ''}`}
          id="oneWayTab"
        >
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="Ofrom">From</label>
                <input
                  type="text"
                  className="form-control"
                  id="Ofrom"
                  placeholder="Departure City"
                  value={fromInput}
                  onChange={ filteredAirportsfromThrottled}
                  onBlur={() =>  setTimeout(() => {
                    setfromhide(true)
                  }, 200)}
                  onFocus={() => setfromhide(false)}
                />

{
 fromhide || !fromInput ? null : (  <ul className='unlist '>
                    {fromInput && from.slice(0, 5).map(airport => (<li onClick={() => { setFromInput(airport.name); setFromAirportCode(airport.code); setFromAirportCity(airport.city) }} key={airport  .code}>{`${airport.name} - ${airport.code}`}<hr className='hrlist'/> </li>  ))
                  
                  }
      </ul>)
}
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="Oto">To</label>
                <input
                  type="text"
                  className="form-control"
                  id="Oto"
                  placeholder="Destination City"
                  value={toInput} onChange={ filteredAirportstoThrottled}
                  onBlur={() =>  setTimeout(() => {
                    settohide(true)
                  }, 200)}
                  onFocus={() => settohide(false)} />
             
             {
 tohide || !toInput ? null : (  <ul className='unlist '>
                    {toInput && to.slice(0, 5).map(airport => (<li onClick={() => { settoInput(airport.name); setToAirportCode(airport.code); setToAirportCity(airport.city) }} key={airport.code}>{`${airport.name} - ${airport.code}`}
                    <hr className='hrlist'/></li>))
                  }
      </ul>)
}
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="OdepartDate">Depart</label>
                <input
                  type="date"
                  className="form-control"
                  id="OdepartDate"
                  placeholder="Depart Date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                />
              </div>
            </div>

          </div>
        </div>

          <div
          className={`tab-pane fade ${activeTab === 'return' ? 'show active' : ''}`}
          id="returnTab">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="Rfrom">From</label>
                <input
                  type="text"
                  className="form-control"
                  id="Rfrom"
                  placeholder="Departure City"
                  value={fromInput}
                  onChange={ filteredAirportsfromThrottled}
                  onBlur={() =>  setTimeout(() => {
                    setfromhide(true)
                  }, 200)}
                  onFocus={() => setfromhide(false)} />
 {fromhide || !fromInput ? null : (  <ul className='unlist '>
                  {fromInput && from.slice(0, 5).map(airport => (<li onClick={() => { setFromInput(airport.name); setFromAirportCode(airport.code);  setFromAirportCity(airport.city)}} key={airport.code}>{`${airport.name} - ${airport.code}`}<hr className='hrlist'/> </li> ))
                  
                  }
      </ul>)
}
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="Rto">To</label>
                <input
                  type="text"
                  className="form-control"
                  id="Rto"
                  placeholder="Destination City"
                  onChange={ filteredAirportstoThrottled}
               value={toInput}
                  onBlur={() => setTimeout(() => {
                    settohide(true)
                  }, 200)}
                  onFocus={() => settohide(false)}/>       
             {
 tohide || !toInput ? null : (  <ul className='unlist '>
                    {toInput && to.slice(0, 5).map(airport => (<li onClick={() => { settoInput(airport.name); setToAirportCode(airport.code);  setToAirportCity(airport.city)}} key={airport.code}>{`${airport.name} - ${airport.code}`} <hr className='hrlist'/></li> ))
                  }
      </ul>)
}
 
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="RdepartDate">Depart</label>
                <input
                  type="date"
                  className="form-control"
                  id="RdepartDate"
                  placeholder="Depart Date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="returnDate">Return</label>
                <input
                  type="date"
                  className="form-control"
                  id="returnDate"
                  placeholder="Return Date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="RnumTravelers" className='travelers'>Travelers</label>
            <input
              type="number"
              className="form-control"
              id="RnumTravelers"
              placeholder="Number of Travelers"
              value={numTravelers}
              min={1}
              max={8}
              onBlur={checkLimit}
              onChange={(e) => setNumTravelers(e.target.value)}
            />
          </div>
        </div>
        
            <div className="col-md-12 ">
              <div className="form-group">
                <label htmlFor="OCabinclass" className='ocl'>Cabin class</label>
                <select
                  type="text"
                  className="form-control"
                  id="OCabinclass"
                  placeholder="select class"
                  value={cabinClass} onChange={(e)=>{setcabinClass(e.target.value)}}
            >
              <option >Select cabin</option>
              <option>Economy</option>
              <option>Business class</option>
                  </select>
             </div>
        </div>
      </div>

      <Link to='' onClick={handleSearch} className="btn btn-primary m-4 px-5 searchbtn">
        <span>Search</span>
          <i className='bx bxs-plane d-flex'></i>


      </Link>

{ error &&     <p className="error text-danger">plese fill all required fields  </p>
}    </div>


  );
};

export default FlightSearchBox;
