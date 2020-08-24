import React from 'react';
import { Component } from 'react';
import Layouts from './components/Layouts/Layouts';
import BurgerMaker from './containers/BurgerMaker/BurgerMaker';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<div>
				<Layouts>
					<Switch>
						<Route path="/checkout" component={Checkout} />
						<Route path="/" exact component={BurgerMaker} />
					</Switch>
				</Layouts>
			</div>
		);
	}
}

export default App;
