import React, { useContext, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { myContext } from './App';
import './PassengerTicket.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PassengerTicket = () => {

  var { cabinClass, setcabinClass, myflight, setMyflight, passengerDetails , setPassengerDetails, selectedSeats, setSelectedSeats,totalCost, setTotalcost, passengercount, totalCost,bookedDate, setBookedDate, username,emailid} = useContext(myContext);

  const navigate = useNavigate();

    var date = new Date();

  setBookedDate(`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`);
    console.log(myflight);


  console.log("passenger details",passengerDetails);
useEffect(() => {
  
  updateUserBooking();

}, [])
  
  
const updateUserBooking=async()=>{

  
  try {
  
  await setBookedDate(`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`);
  
  const postBookingDetails = await axios.post('https://fligthback.onrender.com/api/userBooking', {

    
    "username":username ,
    "emailid": emailid,
    "passengerDetails": passengerDetails,
    "airline":myflight.airline ,
    "arrivalAirport": myflight.arrivalAirport,
    "arrivalAirportCode": myflight.arrivalAirportCode,
    "arrivalCity": myflight.arrivalCity,
    "arrivalTime": myflight.arrivalTime,
    "availableSeats": myflight.availableSeats,
    "dapartureDate": myflight.departureDate,
    "departureAirport":myflight.departureAirport ,
    "departureAirportCode":myflight.departureAirportCode,
    "departureCity": myflight.departureCity,
    "departureDate": myflight.departureDate,
    "departureTime": myflight.departureTime,
    "flightDuration": myflight.flightDuration,
    "flightNumber": myflight.flightNumber,
    "logo_url": myflight.logo_url,
    "passengercount": myflight.passengercount,
    "passengers": "",
    "price": "",
    "returnDate": myflight.returnDate ? myflight.returnDate: "" ,
    "cabinClass": myflight.cabinClass ,
    "totalCost": myflight.totalCost,
    "bookedDate":bookedDate
  });

  const userBookingResponce = await postBookingDetails.data;

console.log("userbook responce>>>",userBookingResponce); 

} catch (error) {

  console.log("error in client __sending passenger booking details",error);

}

}


  
    console.log(passengerDetails);
  
    const ticketRef = useRef(null);

    const downloadPDF = () => {
    const ticket = ticketRef.current;

    html2canvas(ticket).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('passenger_ticket.pdf');
    });
  };

  //ticket number
    
  function generateTicketNumber() {
  
  let ticketNumber = '';

  const digits = 10; 
  for (let i = 0; i < digits; i++) {
  
    const randomDigit = Math.floor(Math.random() * 10); 
    ticketNumber += randomDigit;
  
  }

  return ticketNumber;

  }

   console.log(generateTicketNumber());
  
  
  //date


    console.log(`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`);  
    
  setBookedDate(`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`);
    console.log(myflight);
  
  const handleBack =()=>{
    
    navigate('/loading')

    setTimeout(() => {
    
      navigate('/')

    }, 4000); 

  }
  
  return (
        <div>

            <button className='btn btn-primary bx bx-download tdbtn  mt-1' onClick={downloadPDF}>  Download Ticket </button>
            <button className='btn btn-primary bx bxs-plane mx-5 gobackbtn mt-1 ' onClick={handleBack}> Search fligth</button>
    
          <div ref={ticketRef} className='container'>

          <header>
              
              <div className="tickethead row p-5">
                  
<div className="ticket-logo col-3 "> <img src={myflight.logo_url} alt="" /></div>
<div className="title col-9"><h1>E-Ticket Receipt & Itinerary </h1></div>
<hr className='tickethr'/>
</div>

</header>
          <main>
              
              <div className=" container para">
                  
                  <p className="p1">
                      Your electronic ticket is stored in our computer reservation system. This e-Ticket receipt / itinerary is your record of your electronic ticket and forms part of your contract of carriage. You may need to show this receipt to enter the airport and/or to prove return or onward travel to customs and immigration officials.  </p>

<p className="p2">Your attention is drawn to the Conditions of Contract and Other Important Notices set out in the attached document.</p>
<p className="p3">Economy Class passengers should report to Emirates check-in desks 3 hours prior to departure of all flights. First and Business Class passengers should report to Emirates check-in desks not later than 1 hour prior to departure. Boarding for your flight begins at least 35 minutes before your scheduled departure time. Gates close 15 minutes prior to departure. </p>
              <p className="p4"><b>Please check with departure airport for restrictions on the carriage of liquids, aerosols and gels in hand baggage.</b></p>
              </div>

  <div className="container details">
              <h6>Below are the details of your electronic ticket. Note: all timings are local. </h6>
       
       
        {/* Display passenger details */}
        <div className='container passengerdetails'>
       
              <h1 className='mhead'> PASSENGER AND TICKET INFORMATION</h1>
       
       
                        {passengerDetails.map((passenger, index) => (


              <div key={index}>
  
                  <table className='my-4 table table-striped table-bordered table-hover table-responsive border border-dark '>
                      <tr>
                        <td >PASSENGER NAME</td>
                          <th >{passenger.name}</th >
                      </tr>
                      <tr>
                        <td scope="col">E-RICKET NUMBER</td>
                          <th >{generateTicketNumber()}</th>
                      </tr>
                      <tr>
                        <td >ISSUED BY DATE</td>
                          <th >{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</th>
                      </tr>
       </table>           
  
            </div>
          ))}
        </div>

                    <div className="travelinfo container-fluid ">
                        <h1 className='mhead'>TRAVEL INFORMATION</h1>
                        <table className='table table-striped table-bordered table-hover table-responsive border border-dark '>
                                                
                                              <tr>
                                                <th>FLIGHT              </th>
                                                <th>DEPART/ARRIVE       </th>
                                                <th>AIRPORT/TERMINAL    </th>
                                                <th>CHECK-IN OPENS      </th>
                                                <th>CLASS               </th>
                                             </tr>
                                                                <tr>
                                            
                  <td>{myflight.flightNumber} <br /> CONFIRMED </td>
                                                                    <td>{myflight.departureDate }</td>
                                                                    <td>{ myflight.departureAirport}</td>
                                                                    <td>{myflight.departureDate }</td>
                                                                    <td>{ cabinClass}</td>
                                                               </tr>
                                                      
                                                                <tr>
                                                                    <td></td>
                                                                    <td>{myflight.departureDate }</td>
                                                                    <td>{ myflight.arrivalAirport}</td>
                                                                    <td>{myflight.departureDate}</td>
                                                                    <td></td>
                                                                    </tr>
                            </table>
                            
                        <hr className='tablehr ' />
                           
                            {   myflight.returnDate!=="" &&
                                            <table className='table table-striped table-bordered table-hover table-responsive border border-dark'>
                                                                        <tr>
                                                <th>FLIGHT</th>
                                                <th>DEPART/ARRIVE</th>
                                                <th>AIRPORT/TERMINAL</th>
                                                <th>CHECK-IN OPENS</th>
                                                <th>CLASS</th>
                                                                </tr>
                                                                <tr>
                                                                    <td>{myflight.flightNumber} <br /> CONFIRMED </td>
                                                                    <td>{myflight.returnDate }</td>
                                                                    <td>{ myflight.arrivalAirport}</td>
                                                                    <td>{myflight.returnDate }</td>
                                                                    <td>{ cabinClass}</td>
                                        </tr>
                                                                <tr>
                                                                    <td></td>
                                                                    <td>{myflight.returnDate }</td>
                                                                    <td>{myflight.departureAirport}</td>
                                                                    <td>{myflight.returnDate}</td>
                                                                    <td>{cabinClass}</td>
                                                                    </tr>

                        </table>

                        }

                    </div>

                            <div className="fareinfo container">
                            <h1 className='mhead'>FARE INFORMATION</h1>
                            <table className='table'>
                                <tr>
                                    <td>FARE</td>
                                    <td>{totalCost}</td>
                                </tr>
                                
                                <tr>
                                    <td>TAXES/FEES/CHARGES</td>
                                    <td>₹3000</td>
                                </tr>
                                
                                <tr>
                                    <th>TOTAL</th>
                                    <th>{totalCost+3000}</th>
                                </tr>
    
                                <tr>
                                    <td>FORM OF PAYMENT</td>
                                    <td>CREDIT CARD</td>
                                </tr>
                            </table>        

<p className="checkininfo mx-5 my-4">  *AT CHECK-IN YOU MAY NEED TO PRESENT THE CREDIT CARD USED FOR PAYMENT OF THIS TICKET*</p>

                            </div>

              
              </div>

              
    </main>
          <footer>
<p className="foot"> &copy; 2010 {myflight.airline}. All rights reserved.</p>
                    
          </footer>

                            </div>
    
            
</div>
            );
};

export default PassengerTicket;
