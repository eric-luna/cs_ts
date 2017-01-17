import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
    	<div>
      	<footer className={this.props.class}>
			<p>Coded & Designed by <a href="http://ericandrewluna.com" target="_blank">Eric Luna</a></p>
			<img className="tmdb" src={require('./img/tmdb.png')} alt="tmdb"/>
		</footer>
		</div>
    );
  }
}

export default Footer;
