import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css'
import Button from '../../../UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../UI/Spinner/Spinner';
import Input from '../../../UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';
import { checkValidity } from '../../../hoc/shared/utility';

class ContactData extends Component {

  state = {
    customerForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 20
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP CODE'
        },
        value: '',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 4
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    validForm: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    const customerForm = {};

    for(let key in this.state.customerForm) {
      customerForm[key] = this.state.customerForm[key].value
    }

    const order = {
      ingredients: this.props.ings,
      totalPrice: this.props.price,   
      customerForm: customerForm,
      userId: this.props.userId
    }

    this.props.onBurgerOrder(order, this.props.token);
  }

  inputChangedHandler = (event, key) => {
    const updatedCustomerForm = {
      ...this.state.customerForm
    }
    const updatedElement = {
      ...updatedCustomerForm[key]
    }

    updatedElement.value = event.target.value;
    updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation);
    updatedElement.touched = true;
    updatedCustomerForm[key] = updatedElement;

    let validForm = true;
    for (let key in updatedCustomerForm) {
      validForm = updatedCustomerForm[key].valid && validForm;
    }

    this.setState({ customerForm: updatedCustomerForm, validForm: validForm });
  }

  render() {

    const formElementsArray = [];

    for (let key in this.state.customerForm) {
      formElementsArray.push({
        id: key,
        config: this.state.customerForm[key]
      });
    }

    let form = (
      <form onSubmit={ this.orderHandler } >          
          { formElementsArray.map(formElement => {
            return <Input
                      key={ formElement.id }
                      elementType={ formElement.config.elementType } 
                      elementConfig={ formElement.config.elementConfig }
                      value={ formElement.config.value }
                      invalid={ !formElement.config.valid }
                      shouldValidate={ formElement.config.validation }
                      touched={ formElement.config.touched }
                      changed={(event) => this.inputChangedHandler(event, formElement.id) } />
          }) }          
          <Button disabled={ !this.state.validForm } btnType='Success'>Order</Button>
      </form>
    )

    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className={ classes.ContactData} >
        <h4>Enter you contact data</h4>
        { form }
      </div>
    );
  }
}

const mapStoreToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onBurgerOrder: (order, token) => dispatch(actionCreators.purchaseBurger(order, token))
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));