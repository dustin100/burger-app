import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger'
import burger from '../../components/Burger/Burger';

class BurgerMaker extends Component {
	render() {
		return (
			<Fragment>
				<Burger />
				<div>Controls</div>
			</Fragment>
		);
	}
}

export default BurgerMaker;