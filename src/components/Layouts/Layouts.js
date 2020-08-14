import React, { Fragment } from 'react';
import classes from './Layouts.module.css';
import ToolBar from '../Nav/ToolBar/ToolBar';
import SideDrawer from '../Nav/SideDrawer/SideDrawer';
import sideDrawer from '../Nav/SideDrawer/SideDrawer';

const layout = (props) => {
	return (
		<Fragment>
			<SideDrawer />
			<ToolBar />
			<main className={classes.Content}>{props.children}</main>
		</Fragment>
	);
};

export default layout;
