import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user, activeUser }) => {
	const active = user.id === activeUser ? 'active' : '';

	return (
		<li className={active}>
			<button>{user.name}</button>
		</li>
	);
};

User.propTypes = {
	user: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
	activeUser: PropTypes.shape({}).isRequired,
};

export default User;
