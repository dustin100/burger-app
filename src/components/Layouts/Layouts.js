import React, { Fragment, Component } from 'react';
import classes from './Layouts.module.css';
import ToolBar from '../Nav/ToolBar/ToolBar';
import SideDrawer from '../Nav/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerClosedHandler = () => {
		this.setState({
			showSideDrawer: false,
		});
	};
	sideDrawerOpenHandler = () => {
		this.setState({
			showSideDrawer: true,
		});
	};
	render() {
		return (
			<Fragment>
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<ToolBar open = {this.sideDrawerOpenHandler}/>
				<main className={classes.Content}>{this.props.children}</main>
			</Fragment>
		);
	}
}

export default Layout;
