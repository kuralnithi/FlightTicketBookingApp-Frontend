import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css'
const PaymentForm = () => {
  const [state, setState] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
      focus: '',
      
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  return (
    <div>
      <Cards 
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
              focused={state.focus}
              issuer='true'
     />
      <form>
        <input className='form-control mt-3'
          type="text"
          name="name"
          placeholder="Card holder name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
   required      />
    
        <input className='form-control mt-3'
          type="number"
          name="number"
          placeholder="Card number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />
        <input className='form-control mt-3'
          type="number"
          name="expiry"
          placeholder="  ** / **"
          value={state.expiry}
              onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
              />
              <input className='form-control mt-3'
                 maxLength={3}
          type="number"
          name="cvc"
          placeholder="cvc"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
      
        />
      </form>

    </div>
  );
}

export default PaymentForm;