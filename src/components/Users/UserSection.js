import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserList from './UserList';
import UserForm from './UserForm';

export class ChannelSection extends Component {
	static propTypes = {
		users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
		setUsername: PropTypes.func.isRequired,
		activeUser: PropTypes.shape({}).isRequired,
	};

	render() {
		const { users, setUsername, activeUser } = this.props;

		return (
			<div className="support card bg-light">
				<div className="card-header">
					<strong>Users</strong>
				</div>
				<div className="card-body channels">
					<UserList activeUser={activeUser} users={users} />
					<UserForm setUsername={setUsername} />
				</div>
			</div>
		);
	}
}

export default ChannelSection;
