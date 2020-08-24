import React from 'react';
import { Component } from 'react';
import Layouts from './components/Layouts/Layouts';
import BurgerMaker from './containers/BurgerMaker/BurgerMaker';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
	render() {
		return (
			<div>
				<Layouts>
					<BurgerMaker />
					<Checkout />
				</Layouts>
			</div>
		);
	}
}

export default App;
