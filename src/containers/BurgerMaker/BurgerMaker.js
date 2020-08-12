import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 1,
	cheese: 0.5,
	meat: 1.5,
};

class BurgerMaker extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 5,
	};

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updateCount = oldCount + 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updateCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
	};
	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updateCount = oldCount - 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updateCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
	};
	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<Fragment>
				<Burger ingredients={this.state.ingredients} />
				<BurgerControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
				/>
			</Fragment>
		);
	}
}

export default BurgerMaker;
