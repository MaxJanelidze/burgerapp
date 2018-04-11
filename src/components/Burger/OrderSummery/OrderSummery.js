import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../../UI/Button/Button';

const orderSummery = (props) => {

  const ingredientsSummery = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={ igKey }>
        <span style={{ textTransform: "capitalize" }}>{ igKey }: { props.ingredients[igKey] }</span>          
        </li>
      )
    })

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A dilicious burger with following ingredients: </p>
      <ul>
        { ingredientsSummery }
      </ul>
      <p><strong>Current Price: { props.price.toFixed(2) }&#36;</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={ props.purchaseClose }>Cancel</Button>
      <Button btnType="Success" clicked={ props.purchaseContinue }>Continue</Button>
    </Aux>
  )
}

export default orderSummery;