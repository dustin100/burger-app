import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
			},
			address: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
			},
			postalCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Postal Code',
				},
				value: '',
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'name@email.com',
				},
				value: '',
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'pickup', displayValue: 'Pickup' },
						{ value: 'delivery', displayValue: 'Delivery' },
					],
				},
				value: '',
			},
		},
		loading: false,
	};

	orderHandler = (e) => {
		e.preventDefault();
		this.setState({
			loading: true,
		});
		const formData = {};
		for (let formElementId in this.state.orderForm) {
			formData[formElementId] = this.state.orderForm[formElementId].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		};
		axios
			.post('/order.json', order)
			.then((res) => {
				this.setState({
					loading: false,
				});
				this.props.history.push('/');
			})
			.catch((err) => {
				this.setState({
					loading: false,
				});
			});
	};

	inputChangeHandler = (e, inputVal) => {
		const updatedOrderForm = {
			...this.state.orderForm,
		};

		const updatedFormElement = { ...updatedOrderForm[inputVal] };

		updatedFormElement.value = e.target.value;
		updatedOrderForm[inputVal] = updatedFormElement;
		this.setState({ orderForm: updatedOrderForm });
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({ id: key, config: this.state.orderForm[key] });
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((formEle) => (
					<Input
						key={formEle.id}
						elementType={formEle.config.elementType}
						elementConfig={formEle.config.elementConfig}
						value={formEle.config.value}
						changed={(e) => this.inputChangeHandler(e, formEle.id)}
					/>
				))}
				<Button btnType="Success">Order</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact info</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
