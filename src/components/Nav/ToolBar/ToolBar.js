import React from 'react';
import classes from './ToolBar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
const toolBar = (props) => {
	return (
		<header className={classes.ToolBar}>
			<div>Menu</div>
			<div className = {classes.Logo}>
				<Logo />
			</div>
			<nav>
				<NavItems />
			</nav>
		</header>
	);
};

export default toolBar;
