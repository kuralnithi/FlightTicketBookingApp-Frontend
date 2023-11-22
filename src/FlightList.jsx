

import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import './Flightlist.css'
import logopng from './assets/pngwing.png'
import { useNavigate } from 'react-router-dom';
import { myContext } from './App';
import { Modal, Button, Form } from 'react-bootstrap';
  




const FlightList = () => {

  // const [myflight, setMyflight] = useState('');

/////////////////////////////////////////////////////////////////////////////////
  const navigate = useNavigate();

  const { myflight, setMyflight, cabinClass,setcabinClass, flights, setFlights
      ,departureCity, setdepartureCity,arrivalCity, setarrivaleCity,departureDate, setDepartureDate,arrivalAirportCode, setarrivaleAirportCode,departureAirportCode, setdepartureAirportCode,passengercount, setPassengerCount,loggedin,setLoggedin,username, setUsername,emailid, setemailid,returnDate, setReturnDate
      } = useContext(myContext);


  
 const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleClose = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleShowLogin = () => setShowLogin(true);
  const handleShowSignup = () => setShowSignup(true);

  
  const handleUsericon = () => {

        navigate('/loading')
    setTimeout(() => {

      navigate('/userpage')

    }, 3000); 



}
  
  
  
  
  
  
  useEffect(() => {

    const fetchFlights = async () => {
      try {

        const response = await axios.get('https://fligthback.onrender.com/api/getflight');
    
              setFlights(response.data.data);

      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };

    fetchFlights();
  }, []);

  setTimeout(() => {

        setdepartureCity(flights[0]['departureCity']);
        setarrivaleCity(flights[0]['arrivalCity']);
        setarrivaleAirportCode(flights[0]['arrivalAirportCode'])
        setDepartureDate(flights[0]["departureDate"]); 
    
    if (flights[0]['returnDate'])  
    setReturnDate(flights[0]['returnDate']); 
    
    setPassengerCount(flights[0]['passengercount'])
        setdepartureAirportCode(flights[0]['departureAirportCode'])
        setcabinClass(flights[0]['cabinClass']);

    
        }, 1000);


          console.log("sss",flights[0]);
          console.log(departureCity);  
          console.log(departureDate);  
          console.log(arrivalCity);  
          console.log("ppp",passengercount);


  const handleBook = () => {

    if (loggedin) {
   

       navigate('/loading')
    
    setTimeout(() => {
    
      navigate('/passengerdetails');

    }, 4000); 
   
 }
    else {
      
      handleShowLogin();
   }

}
  console.log('myf',myflight);





///////////REG LOG IN/////////////////////////


  const [RegUserName, setRegUserName] = useState("");
  const [RegEmailId, setRegEmailId] = useState("");
  const [RegPassword, setRegPassword] = useState("");

  const [LoginEmailid, setLoginEmailid] = useState('');
  const [LoginPassword, setLoginPassword] = useState('');


  const [token, setToken] = useState('')


  const [userdetails, setUserdetails] = useState("");


  const [regStatus, setRgStatus] = useState('');
  const [loginStatus, setloginStatus] = useState('');

  const [loginserverStatus, setloginserverStatus] = useState('');




  const [resetMessage, setresetMessage] = useState('')










  console.log("recive token  in FE >", token);

  const handleRegUserInp = (e) => {

    setRegUserName(e.target.value);



  }

  const handleRegEmailInp = (e) => {

    setRegEmailId(e.target.value);



  }

  const handleRegPasswordInp = (e) => {

    setRegPassword(e.target.value);



  }

  const handleLoginEmailInp = (e) => {


   setLoginEmailid(e.target.value);

    
  }

  const handleLoginPasswordInp = (e) => {

    setLoginPassword(e.target.value);


  }


  //REG btn

  const handleRegBtn = async () => {

    if (RegUserName == "" || RegEmailId == "" || RegPassword == "") {

      setRgStatus("Please enter the required details");
      setTimeout(() => { setRgStatus("") }, 3000);

      return



    }




    const requestBody = JSON.stringify({
      username: RegUserName,
      emailid: RegEmailId,
      password: RegPassword
    });

    // https://password-reset-ze4r.onrender.com


    try {


      const regResponce = await fetch('https://fligthback.onrender.com/api/user/register', {

        method: 'post', headers: {

          "content-type": 'application/json'

        }, body: requestBody


      });

      const regResDetails = await regResponce.json();

      const message = regResDetails.message

      if (regResDetails) {

        setRgStatus(message);

      }
      console.log("REG STATUS", regStatus);
      setTimeout(() => { setRgStatus('') }, 3000)

    } catch (error) {


      console.log("error in reg>>", error);
    }

  }







  const handleLoginBtn = async (e) => {

    e.preventDefault();


    if (LoginEmailid == "" || LoginPassword == "") {

      setloginStatus("Please enter the required details");
      setTimeout(() => { setloginStatus("") }, 3000);

      return

    }

    const loginRes = await fetch("https://fligthback.onrender.com/api/user/login", {

      method: 'post', headers: {
        "content-type": 'application/json'

      }, body: JSON.stringify({

        emailid: LoginEmailid,
        password: LoginPassword

      })


    })
    console.log("LOG REG>>>",loginRes);
    const data = await loginRes.json()
    localStorage.setItem("token", data.token)
    console.log("token setted in local",data.token);
    setToken(localStorage.getItem("token"));
    console.log("token get from local and updated in setToken()",token);
    setloginserverStatus(data.message);
    setTimeout(() => {
      setloginserverStatus("");

    }, 3000)
    console.log("TOKENNN>>>",data.token);


  }








  const handleForget = async () => {

    try {

      if (LoginEmailid == "") {

        setloginStatus("Please enter the E-mail id of forgetted password");

        setTimeout(() => { setloginStatus("") }, 3000);

        return



      }



      const forgetFetch = await fetch('https://fligthback.onrender.com/api/resetpassword', {


        method: 'post'
        , headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({

          emailid: LoginEmailid

        })


      });

      const responce = await forgetFetch.json();

      if (responce) {
        setresetMessage(responce.message);

        console.log(responce.message);
      }

      if (responce.message == "mail sent successfully to emailid") {


        setTimeout(() => {

          navigate('/Preset')
        }, 2000)


        console.log(resetMessage);

      }



      setTimeout(() => {

        setresetMessage("");


      }, 5000)



    } catch (error) {


      console.log(error)
    }





  }






  useEffect(() => {

    fetchdata();


  }, [token]);

  const fetchdata = async () => {

    try {
  
      setToken(localStorage.getItem("token"));
    console.log("token get from local and updated in setToken()",token);
  

      const responce = await fetch("https://fligthback.onrender.com/api/getuser", {

        method: 'get', headers: {
          "content-type": 'application/json',
          "authorization": token,
        }

      });


      const data = await responce.json();

      if (data.username)
      {

        console.log("user found__Log in auth successfull",data);
       setUserdetails(data);
      setUsername(data.username);
        setemailid(data.emailid)
        setLoggedin(true);

      }


    } catch (error) {
      console.log('errorrr>>>>>', error);
    }
  }
        console.log("user name>>",username);
        console.log("email id>>",emailid);







  return (
   <div className="flightlistmain">

      
      
      <header>
              <div className="headbox d-flex">
                    <div className="logo" onClick={()=>{navigate('/search')}}> <img className='logoimg' src={logopng} alt="" /><span className='brand'>Skyways</span>
                </div>
                <hr className='hrbrand'/>        
<div className="logregfl mx-5">
  {loggedin ? (
    <i onClick={handleUsericon} className='bx bx-user bx-lg usericonfl'></i>
  ) : (
    <div className="logregbtn">
      <Button className='mx-5 mb-1 mt-1' variant="primary" onClick={handleShowLogin}>
        Login
      </Button>
      <Button className=' mb-1 mt-1 mx-5' variant="secondary" onClick={handleShowSignup}>
        Signup
      </Button>
    </div>
  )}
</div>

          <div>

      <Modal show={showLogin || showSignup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{showLogin ? 'Login' : 'Signup'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
         {showSignup &&  <Form.Group controlId="formBasicEmail">
              <Form.Label>User name</Form.Label>
              <Form.Control type="text" value={RegUserName} onChange={handleRegUserInp} placeholder="Enter username" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>}
         { showSignup &&  <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={RegEmailId} onChange={handleRegEmailInp} placeholder="Enter email" />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>}
           { showSignup &&
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"  value={RegPassword} onChange={handleRegPasswordInp} placeholder="Password" />
            </Form.Group>}
                { showLogin &&  <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={LoginEmailid} onChange={handleLoginEmailInp} placeholder="Enter email" />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>}
           { showLogin &&
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"  value={LoginPassword} onChange={handleLoginPasswordInp} placeholder="Password" />
            </Form.Group>}
               { showLogin ?
                  (<>
                    <Button className='m-3' variant="primary" type="submit" onClick={(e)=>{handleLoginBtn(e)}}>Login
                    </Button>
                   <a className="mx-2 forget" onClick={handleForget} > Forget password? </a>  
                 </> ) :
                  ( <Button className='m-3' variant="dark" type="submit" onClick={handleRegBtn}>Signup
                  </Button>
    
) 

                }
              </Form>
        </Modal.Body>
        <Modal.Footer>

  {   <p>{regStatus}</p>}
            {<p>{loginStatus}</p>}
            {<p>{loginserverStatus}</p>}

        </Modal.Footer>
      </Modal>

</div>

          
  </div>
              
        <div className="flightlisthead ">
          

          <div className='flightheadname'> {`${departureCity} (${departureAirportCode}) - ${arrivalCity} (${arrivalAirportCode}) `} </div>
          
          
          <div className='date text-dark'> {`Depart - ${departureDate.slice(8)} ____  Return - ${departureDate.slice(8)} `} </div>

          <div className='flightheadname  userflightlist'> passengers - {` ${passengercount}`} - {`${cabinClass}`}  </div>
          
        </div>
              
                       
      </header>

   <main>

    <div className="container-fluid mx-2 mb-2 row">
     
            
      <div className="row">
        {flights.map((flight) => (
          <div className="col-12 mb-4 flightcard" key={flight.id}>
            <div className="card w-100">
              
              <div className="card-body row">

                              <div className="flogo col-md-3 col-sm-12 text-center mx-2">
                  <img src={flight.logo_url} alt="" /><span className='airlinename'>{flight.airline}</span>
                             </div>

                <div className="flightdetails  row col-md-6 col-sm-12 text-center">
                            
                  <div className="departure departure1 col-4">
                                    <div className="dflighttime"> {flight.departureTime} </div>
                                    <div className="airportcode">{flight.departureAirportCode} </div>
                  </div>
                  
                  <div className="departure departure2 row col-4 ">
                                    <div className="hrs col-12">{flight.flightDuration.slice(0,1).concat('h')}</div>
                                    <div className="flightdir col-12"><svg className='svg' xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 12 12" ><path fill="#898294" d="M3.922 12h.499a.52.52 0 0 0 .444-.247L7.949 6.8l3.233-.019A.8.8 0 0 0 12 6a.8.8 0 0 0-.818-.781L7.949 5.2 4.866.246A.525.525 0 0 0 4.421 0h-.499a.523.523 0 0 0-.489.71L5.149 5.2H2.296l-.664-1.33a.523.523 0 0 0-.436-.288L0 3.509 1.097 6 0 8.491l1.196-.073a.523.523 0 0 0 .436-.288l.664-1.33h2.853l-1.716 4.49a.523.523 0 0 0 .489.71"></path></svg></div>
                  
                  </div>
                  
                  <div className="departure departure3 row col-4 ">
                                    <div className="dflighttime"> {flight.arrivalTime} </div>
                                    <div className="airportcode">{flight.arrivalAirportCode}</div>
                  
                  </div>
                                      
                  {flight.returnDate && 
<>
       <hr className='hrline'/>
                              <div className="arrival arrival1 col-4 ">
                                    <div className="dflighttime flighttime">{ flight.departureTime.replace(flight.departureTime[1],+flight.departureTime[1]+1)}</div>
                                    <div className="airportcode">{flight.arrivalAirportCode}</div>
                  
                                </div>
                
                      <div className="arrival arrival2 row col-4 ">
                              <div className="hrs col-12"> {flight.flightDuration.slice(0,1).concat(' h')} </div>
                                          
                              <div className="flightdir col-12"><svg className='svg' xmlns="http://www.w3.org/2000/svg"  space="preserve" viewBox="0 0 12 12" ><path fill="#898294" d="M3.922 12h.499a.52.52 0 0 0 .444-.247L7.949 6.8l3.233-.019A.8.8 0 0 0 12 6a.8.8 0 0 0-.818-.781L7.949 5.2 4.866.246A.525.525 0 0 0 4.421 0h-.499a.523.523 0 0 0-.489.71L5.149 5.2H2.296l-.664-1.33a.523.523 0 0 0-.436-.288L0 3.509 1.097 6 0 8.491l1.196-.073a.523.523 0 0 0 .436-.288l.664-1.33h2.853l-1.716 4.49a.523.523 0 0 0 .489.71"></path></svg> </div>
                      
                      </div>
                
                      <div className="arrival arrival3 row col-4 ">
                                    <div className="aflighttime flighttime">{flight.arrivalTime.replace(flight.arrivalTime[1],+flight.arrivalTime[1]+1)}</div>
                        <div className="airportcode">{ flight.arrivalAirportCode}</div>
                    
                      </div>

              
  </>            
              }
         </div>
<hr className='buttonhr'/>
                <div className="button col-md-3 col-sm-12  text-center">
                  <div className="price ">{ "₹ " + flight.price.slice(1) * passengercount }</div>              
                  <button className="btn mt-1 mb-1" onClick={() => { setMyflight(flight); handleBook()} }>Book</button>
                               </div>
              </div>
                
            </div>
          </div>
        ))}
      </div>
    </div>
</main>
    
    </div>
      );
};

export default FlightList;
