import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
	lettuce: 0.5,
	bacon: 1,
	cheese: 0.5,
	meat: 1.5,
};

class BurgerMaker extends Component {
	state = {
		ingredients: [],
		totalPrice: 5,
		purchaseable: false,
		showModal: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		axios
			.get('https://react-burger-b0a20.firebaseio.com/ingredients.json')
			.then((res) => {
				this.setState({
					ingredients: res.data,
				});
			})
			.catch((err) => {
				this.setState({
					error: true,
				});
			});
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((igkey) => {
				return ingredients[igkey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		this.setState({
			purchaseable: sum > 0,
		});
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
		this.updatePurchaseState(updatedIngredients);
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
		this.updatePurchaseState(updatedIngredients);
	};

	modalHandler = () => {
		this.setState({
			showModal: true,
		});
	};

	closedModalHandler = () => {
		this.setState({ showModal: false });
	};

	continueWithPurchaseHandler = () => {
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(
				encodeURIComponent(i) +
					'=' +
					encodeURIComponent(this.state.ingredients[i])
			);
		}
		queryParams.push('price=' + this.state.totalPrice)
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString,
		});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = (
			<OrderSummary
				purchaseCanceled={this.closedModalHandler}
				purchaseContinue={this.continueWithPurchaseHandler}
				ingredients={this.state.ingredients}
				price={this.state.totalPrice}
			/>
		);
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		let burger = this.state.error ? (
			<p>The ingredients can't be loaded</p>
		) : (
			<Spinner />
		);
		if (this.state.ingredients) {
			burger = (
				<Fragment>
					<Burger ingredients={this.state.ingredients} />
					<BurgerControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						purchaseable={this.state.purchaseable}
						price={this.state.totalPrice}
						order={this.modalHandler}
					/>
				</Fragment>
			);
		}

		return (
			<Fragment>
				<Modal
					show={this.state.showModal}
					modalClosed={this.closedModalHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Fragment>
		);
	}
}

export default withErrorHandler(BurgerMaker, axios);
