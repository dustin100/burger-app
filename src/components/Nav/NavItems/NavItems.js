import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.module.css';

const navItems = (props) => {
	return (
		<ul className={classes.NavItems}>
			<NavItem link="/">Burger Maker</NavItem>
			<NavItem link="/">Checkout</NavItem>
		</ul>
	);
};

export default navItems;
