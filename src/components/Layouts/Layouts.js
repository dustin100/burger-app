import React, { Fragment } from 'react';
import classes from './Layouts.module.css';

const layout = (props) => {
	return (
		<Fragment>
			<div>Toolbar, SideDrawer, backdrop,</div>
			<main className={classes.Content}>{props.children}</main>
		</Fragment>
	);
};

export default layout;
