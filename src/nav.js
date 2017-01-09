import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class Nav extends React.Component {
	render() {
		return (
				<nav className={this.props.class}>
					<Link to={this.props.link}>{this.props.version}</Link>
				</nav>
			);
	}
}

export default Nav;