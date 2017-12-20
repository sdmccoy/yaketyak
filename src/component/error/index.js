import React from 'react';
import {Link} from 'react-router-dom';
//style
import './_error.scss';

export const SigninError = () => {
  return(
    <div className='error-container'>
      Please contact the admin for a password to access this app.
      <button><Link target='_blank' to='http://scottmccoy.codes/'>Contact Admin</Link></button>
    </div>
  );
};
