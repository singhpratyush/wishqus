import React from 'react';
import PropTypes from 'prop-types';

import WishCard from '../WishCard';
import WishLoading from '../WishCard/WishLoading';
import uikitStyles from '../../utils/uikitStyles';
import { deleteWish } from '../../utils/firebase';

class WishList extends React.Component {
	constructor(props) {
		super(props);
		this.startWishUpdate(props);

		this.onDelete = this.onDelete.bind(this);

		this.state = { loading: true };
	}

	startWishUpdate(props) {
		this.databaseRef && this.databaseRef.off();
		this.databaseRef = props.getDatabaseRef();
		this.databaseRef.on('value', snapshot => {
			this.props.wishActions.setWishes(props.category, snapshot.val());
			this.setState({ loading: false });
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.category !== nextProps.category) {
			this.setState({ loading: true });
			this.startWishUpdate(nextProps);
		}
	}

	componentWillUnmount() {
		this.databaseRef.off();
	}

	onDelete(wishId, userId) {
		deleteWish(wishId, userId);
	}

	render() {
		return <div style={{ marginBottom: '16px' }}
			className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-center']].join(' ')}>
			<div className={[uikitStyles['uk-width-1-1@s'], uikitStyles['uk-width-2-3@m'], uikitStyles['uk-width-1-2@l']].join(' ')}
				style={{ backgroundColor: 'white', boxShadow: '0 2px 4px 0 rgba(0,0,0,0.06)', borderRadius: '4px' }}>
				{this.state.loading && (this.props.wishes.length === 0) && <WishLoading />}
				{Object.keys(this.props.wishes).map(wishId =>
					<WishCard
						data={this.props.wishes[wishId]}
						key={wishId}
						auth={this.props.auth}
						onDelete={this.onDelete}
					/>)}
			</div>
		</div>
	}
}

WishList.propTypes = {
	// Pure props
	category: PropTypes.string.isRequired,
	getDatabaseRef: PropTypes.func.isRequired,
	// From container
	wishActions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
	wishes: PropTypes.array.isRequired,
	auth: PropTypes.object.isRequired,
}

export default WishList
