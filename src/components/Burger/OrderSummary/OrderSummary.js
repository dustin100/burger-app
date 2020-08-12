import React, { Fragment } from 'react';

const orderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients).map((igkey) => {
		return (
			<li key = {igkey}>
				<span>{igkey}</span>: {props.ingredients[igkey]}
			</li>
		);
	});
	return (
		<Fragment>
			<h3>Your ORder</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>{ingredientSummary}</ul>
			<p>Continue to checkout?</p>
		</Fragment>
	);
};

export default orderSummary;
