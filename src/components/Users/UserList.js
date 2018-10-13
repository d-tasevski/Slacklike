import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

const UserList = ({ users, activeUser }) => {
	return (
		<ul>
			{users.map(u => (
				<User user={u} key={u.id} activeUser={activeUser} />
			))}
		</ul>
	);
};

UserList.propTypes = {
	users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	activeUser: PropTypes.shape({}).isRequired,
};

export default UserList;
