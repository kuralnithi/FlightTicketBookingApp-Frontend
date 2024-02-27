import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin();
  };

  return (
    <div className="login-form">
     
          <input
        type="text"
        placeholder="Email ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
         />
     
          <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
            />

          <button onClick={handleLogin}>Log in</button>


      </div>
  );
};

export default LoginForm;
