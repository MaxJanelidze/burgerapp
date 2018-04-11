import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrower from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render() {
    return (
      <Aux>
          <Toolbar
            isAuth={this.props.isAutheticated}
            drawerToggleClicked={ this.sideDrawerToggleHandler }/>
          <SideDrower
            isAuth={this.props.isAutheticated}
            open={ this.state.showSideDrawer }
            close={ this.closeSideDrawerHandler } />
          <main className={ classes.Content }>
            { this.props.children }
          </main>
        </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAutheticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);