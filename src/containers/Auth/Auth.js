import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actionCreators from '../../store/actions/index';
import { checkValidity } from '../../hoc/shared/utility';

class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Mail Address'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({controls: updatedControls});
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup};
    });
  };

  render () {
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map( formElement => (
      <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
    ) );

    if (this.props.loading) {
      form = <Spinner />
    }

    let errMsg = null;

    if (this.props.error) {
      errMsg = (
        <p>{this.props.error.message}</p>
      );
    }

    let authRedirect = null;

    if (this.props.isAuthenticated) {
      const path = this.props.building ? '/checkout' : '/';
      authRedirect = <Redirect to={path}/>
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errMsg}
        <form onSubmit={ this.submitHandler }>
          {form}
          <Button btnType="Success">Submit</Button>
          <br />          
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}</Button>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actionCreators.auth(email, password, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
