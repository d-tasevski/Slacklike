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
			<div className="support panel panel-primary">
				<div className="panel-heading">
					<strong>Users</strong>
				</div>
				<div className="panel body channels">
					<UserList activeUser={activeUser} users={users} />
					<UserForm setUsername={setUsername} />
				</div>
			</div>
		);
	}
}

export default ChannelSection;
