import React, { Component } from 'react';
// import {  } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionCreators from '../../store/actions/index';

class BurgerBuilder extends Component {

  state = {
    purchasing: false        
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing : true });
    } else {
      this.props.history.push('/auth');
    }
  }

  purchaseCloseHandler = () => {
    this.setState({ purchasing : false });
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {

    const disabledInfo = {
      ...this.props.ings
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummery = null;
    let burger = this.props.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded</p> : <Spinner />

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={ this.props.ings } />
          <BuildControls
            ingredientAdded={ this.props.onIngredientsAdded }
            ingredientRemoved={ this.props.onIngredientsRemoved }
            disabled={disabledInfo}
            price={ this.props.price }
            purchasable={this.updatePurchaseState(this.props.ings) }
            purchasing={ this.purchaseHandler }
            isAuth={ this.props.isAuthenticated } />
        </Aux>
      );
      orderSummery = <OrderSummery 
                        ingredients={ this.props.ings } 
                        purchaseClose={ this.purchaseCloseHandler }
                        purchaseContinue={ this.purchaseContinueHandler }
                        price={ this.props.price } />  
    }

    return (
      <Aux>
        <Modal 
          show={ this.state.purchasing }
          modalClosed={ this.purchaseCloseHandler }  >
          { orderSummery }
        </Modal>
        { burger }
      </Aux>
    );
  }
}

const mapStoreToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientsAdded: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
    onIngredientsRemoved: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit())
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));