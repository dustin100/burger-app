import React from 'react';
import classes from './BurgerControls.module.css';
import BurgerControl from './BurgerControl/BurgerControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
	{ label: 'Bacon', type: 'bacon' },
];

const burgerControls = (props) => {
	return (
		<div className={classes.BurgerControls}>
			<p>
				Current Price: <strong>${props.price.toFixed(2)}</strong>
			</p>
			{controls.map((ctrl) => {
				return (
					<BurgerControl
						key={ctrl.label}
						label={ctrl.label}
						added={() => props.ingredientAdded(ctrl.type)}
						removed={() => props.ingredientRemoved(ctrl.type)}
						disabled={props.disabled[ctrl.type]}
					/>
				);
			})}
		</div>
	);
};

export default burgerControls;
