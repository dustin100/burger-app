import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false,
	};

	orderHandler = (e) => {
		e.preventDefault();
		this.setState({
			loading: true,
		});
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: ' Dustin',
				address: '123 main st',
				postalCode: '2g3g4g5',
			},
			email: 'name@email.com',
			deliveryMethod: 'pickup',
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

	render() {
		let form = (
			<form action="">
				<input
					className={classes.Input}
					type="text"
					name="name"
					placeholder="Your Name"
				/>
				<input
					className={classes.Input}
					type="email"
					name="email"
					placeholder="Your Email"
				/>
				<input
					className={classes.Input}
					type="text"
					name="street"
					placeholder="Your Street"
				/>
				<input
					className={classes.Input}
					type="text"
					name="postalCode"
					placeholder="Your postal Code"
				/>
				<Button clicked={this.orderHandler} btnType="Success">
					Order
				</Button>
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
