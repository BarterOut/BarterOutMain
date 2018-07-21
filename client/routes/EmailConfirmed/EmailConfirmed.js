import React from 'react';
import { Link } from 'react-router-dom';

const EmailConfirmed = () => {
  return (
    <div>
      <h1>You have confirmed your email</h1>
      <h3>You can now <Link to="/login" href="/login">login</Link> to your account.</h3>
    </div>
  );
};


export default EmailConfirmed;
