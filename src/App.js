import React from 'react';
import { Component } from 'react';
import Layouts from './components/Layouts/Layouts';
import BurgerMaker from './containers/BurgerMaker/BurgerMaker';

class App extends Component {
	render() {
		return (
			<div>
				<Layouts>
					<BurgerMaker />
				</Layouts>
			</div>
		);
	}
}

export default App;
