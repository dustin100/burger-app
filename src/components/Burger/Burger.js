import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import BurgerMaker from '../../containers/BurgerMaker/BurgerMaker';

const burger = (props) => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map((igkey) => {
			return [...Array(props.ingredients[igkey])].map((_, index) => {
				return <BurgerIngredient key={igkey + index} type={igkey} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);
	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients</p>;
	}
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
