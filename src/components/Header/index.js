import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import uikitStyles from '../../utils/uikitStyles';
import SignInButton from './signInButton';

class Header extends React.Component {
	render() {
		return <nav className={[uikitStyles['uk-navbar-container'], uikitStyles['uk-margin'],
			uikitStyles['uk-padding'], uikitStyles['uk-padding-remove-top'],
			uikitStyles['uk-padding-remove-bottom']].join(' ')} uk-navbar='true'>
			<div className={[uikitStyles['uk-navbar-left']].join(' ')}>
				<Link to='/' className={[uikitStyles['uk-navbar-item'], uikitStyles['uk-logo'],
					uikitStyles['uk-text-primary']].join(' ')}>
					WISHQUS
				</Link>
				<span className={[uikitStyles['uk-text-muted']].join(' ')}>
					I wish that too!
				</span>
				<div className={[uikitStyles['uk-navbar-right']].join(' ')}>
				{!this.props.isLoggedIn && <SignInButton/>}
			</div>
			</div>
		</nav>
	}
}

Header.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
}

export default Header;