import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import * as actionType from '../../store/actions';

class BurgerMaker extends Component {
	state = {
		showModal: false,
		loading: false,
		error: false,
	};

	// componentDidMount() {
	// 	axios
	// 		.get('https://react-burger-b0a20.firebaseio.com/ingredients.json')
	// 		.then((res) => {
	// 			this.setState({
	// 				ingredients: res.data,
	// 			});
	// 		})
	// 		.catch((err) => {
	// 			this.setState({
	// 				error: true,
	// 			});
	// 		});
	// }

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	modalHandler = () => {
		this.setState({
			showModal: true,
		});
	};

	closedModalHandler = () => {
		this.setState({ showModal: false });
	};

	continueWithPurchaseHandler = () => {
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {
			...this.props.ings,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = (
			<OrderSummary
				purchaseCanceled={this.closedModalHandler}
				purchaseContinue={this.continueWithPurchaseHandler}
				ingredients={this.props.ings}
				price={this.props.price}
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
		if (this.props.ings) {
			burger = (
				<Fragment>
					<Burger ingredients={this.props.ings} />
					<BurgerControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchaseable={this.updatePurchaseState(this.props.ings)}
						price={this.props.price}
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

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) =>
			dispatch({ type: actionType.ADD_INGREDIENT, ingredientName: ingName }),
		onIngredientRemoved: (ingName) =>
			dispatch({
				type: actionType.REMOVE_INGREDIENT,
				ingredientName: ingName,
			}),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerMaker, axios));
