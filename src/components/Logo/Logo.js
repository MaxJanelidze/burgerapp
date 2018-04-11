import React from 'react';

import classes from './Logo.css'
import burgerlogo from '../../assests/images/burger-logo.png';

const logo = (props) => (
  <div className={ classes.Logo }>
    <img src={ burgerlogo } alt="This is logo"/>
  </div>
);

export default logo;