import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {

  let styles = [classes.SideDrawer, classes.Close];

  if (props.open) {
    styles = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop
        show={ props.open }        
        clicked={ props.close } />
      <div className={ styles.join(' ') } onClick={ props.close } >
        <div className={ classes.Logo }>
          <Logo link='/'/>
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth}/>
        </nav>
      </div>
    </Aux>
  );
}

export default sideDrawer;