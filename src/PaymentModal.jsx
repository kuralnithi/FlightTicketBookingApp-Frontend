import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PaymentForm from './PaymentForm';
import './Payment.css'
import { useNavigate } from 'react-router-dom';
import './TicketSuccessful.css'

const PaymentModal = ({ show, handleClose }) => {

const navigate = useNavigate()


  const handlePaymentConfirmation = () => {
    console.log('Payment details:', cardDetails);
  
    
    navigate('/loading')
    setTimeout(() => {

      navigate('/PassengerTicket')
    }, 3000); 
    
    handleClose();
  };

  return (
<>
      <Modal show={show} onHide={handleClose} centered className='cardmodal' >  
      <Modal.Header closeButton>
      <Modal.Title><span className='entercard'> Enter Card Details </span></Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <PaymentForm/>
 <div id="success_tic" className="modal fade paysuccess" role="dialog">
   <div className="modal-dialog">

     <div className="modal-content">
       <a className="close" href="#" data-dismiss="modal">&times;</a>
       <div className="page-body">
            <div className="head">  
                <h3>Payment success</h3>
            </div>

         <h1 ><div className="checkmark-circle mx-5">
             <div className="background "></div>
              <div className="checkmark draw"></div>
                  </div>
              <h4 className='mx-5 mt-3'>Happy journey !!</h4>
                    
                </h1>

   </div>
                <button data-dismiss="modal"  href="#" className="btn btn-success btn-lg" type='submit' onClick={() => { handlePaymentConfirmation(); }} >Get ticket</button>

          </div>
     </div>
   </div>




        </Modal.Body >
      <Modal.Footer>
      <Button onClick={handleClose} variant="secondary" >
        Close
      </Button>
      <Button  type="button"  data-toggle="modal" data-target="#success_tic" >
      Pay
       </Button>

        </Modal.Footer>


      




      </Modal>

    



</>


  );
};

export default PaymentModal;
