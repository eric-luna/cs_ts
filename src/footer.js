import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
    	<div>
      	<footer className={this.props.class}>
			<p>Coded & Designed by <a href="http://ericandrewluna.com" target="_blank">Eric Luna</a></p>
		</footer>
		</div>
    );
  }
}

export default Footer;
