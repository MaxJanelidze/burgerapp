import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => (
  <div className={ classes.BuildControls }>
    <p><strong>Current Price: { props.price.toFixed(2) }&#36;</strong></p>
    { controls.map(ctrl => {
      return <BuildControl
              key={ ctrl.label } 
              label={ ctrl.label }
              added={ () => props.ingredientAdded(ctrl.type) }
              removed={ () => props.ingredientRemoved(ctrl.type) }
              disabled={ props.disabled[ctrl.type] } />
    }) }
    <button 
      disabled={ !props.purchasable } 
      className={ classes.OrderButton } 
      onClick={ props.purchasing }>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
  </div>
);

export default buildControls;