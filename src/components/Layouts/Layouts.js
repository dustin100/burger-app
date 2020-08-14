import React, { Fragment } from 'react';
import classes from './Layouts.module.css';
import ToolBar from '../Nav/ToolBar/ToolBar';

const layout = (props) => {
	return (
		<Fragment>
			<ToolBar />
			<main className={classes.Content}>{props.children}</main>
		</Fragment>
	);
};

export default layout;
