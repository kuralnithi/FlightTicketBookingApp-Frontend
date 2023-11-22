import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import FlightSearchBox from './FlightSearchBox';
import './Search.css';
import { Modal, Button, Form } from 'react-bootstrap';
import logopng from './assets/pngwing.png'
import { Await, useNavigate } from 'react-router-dom';
import { myContext } from './App';

function SearchPage() {

  const { username, setUsername,loggedin, setLoggedin,emailid, setemailid } = useContext(myContext);

 const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleClose = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleShowLogin = () => setShowLogin(true);
  const handleShowSignup = () => setShowSignup(true);

  const navigate = useNavigate()
  
  const handleUsericon = () => {
  

      
    navigate('/loading')
    setTimeout(() => {

        navigate('/userpage')

    }, 4000); 

  }


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

  const handleRegBtn = async (e) => {

    e.preventDefault();

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


        console.log("reset msg>>",resetMessage);

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
          
    <div className = "App">
      <header>
              <div className="headbox d-flex">
                    <div className="logo"> <img className='logoimg' src={logopng} alt="" /><span className='brand'>Skyways</span>
                </div>

          <div className="logreg mx-5">
  {loggedin ? (
    <i onClick={handleUsericon} className='bx bx-user bx-lg usericon'></i>
  ) : (
    <div className="logregbtn">
      <Button className='mx-5 mb-1 mt-1' variant="primary" onClick={handleShowLogin}>
        Login
      </Button>
      <Button className=' mb-1 mt-1' variant="secondary" onClick={handleShowSignup}>
        Signup
      </Button>
    </div>
  )}
</div>

  </div>
              
              
              
                       
      </header>

        <main>

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
                  (<Button className='m-3' variant="dark" type="submit" onClick={(e) => { handleRegBtn(e) }}>Signup
                  </Button>
    
) 

                }
              </Form>
        </Modal.Body>
        <Modal.Footer>

  {   <p>{regStatus}</p>}
            {<p>{loginStatus}</p>}
            {<p>{loginserverStatus}</p>}
            {<p>{resetMessage}</p>}

        </Modal.Footer>
      </Modal>

</div>


        <FlightSearchBox />
     {/* <Carousel>
          <Carousel.Item>
            <img
              className="carimg"
              src="https://e1.pxfuel.com/desktop-wallpaper/206/823/desktop-wallpaper-airplane-phone-air-phone-thumbnail.jpg"
              alt="Flight 1"
            />
            <Carousel.Caption>
              <h3>Flight Travel Heading 1</h3>
            </Carousel.Caption>
          </Carousel.Item>
                  
                  <Carousel.Item>
            <img
              className="carimg"
              src="https://e1.pxfuel.com/desktop-wallpaper/206/823/desktop-wallpaper-airplane-phone-air-phone-thumbnail.jpg"
              alt="Flight 1"
            />
            <Carousel.Caption>
              <h3>Flight Travel Heading 1</h3>
            </Carousel.Caption>
          </Carousel.Item>
             </Carousel> */}

          </main>
      <footer className="foot">
        <ul className="footer-links">
          <li>Help</li>
          <li>Privacy Settings</li>
          <li>Log in</li>
          <li>Privacy policy</li>
          <li>Terms of service</li>
        </ul>
        <div className="explore-section">
          <div>Explore</div>
          <div>Company</div>
          <div>Partners</div>
          <div>Trips</div>
        </div>
        <div className="copyright-section">
          <p>
            Cheap flights from anywhere, to everywhere
            <br />
            © SkyWays Ltd 2002 - 2023
          </p>
        </div>
      </footer>
    </div>
  );
}

export default SearchPage;
