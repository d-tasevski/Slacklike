import React from 'react';
import PropTypes from 'prop-types';

const Channel = ({ channel, setChannel, activeChannel }) => {
	const active = channel.id === activeChannel ? 'active' : '';
	const onSetChannel = e => {
		e.preventDefault();
		return setChannel(channel);
	};

	return (
		<li className={active}>
			<button onClick={onSetChannel}>{channel.name}</button>
		</li>
	);
};

Channel.propTypes = {
	channel: PropTypes.shape({}).isRequired,
	setChannel: PropTypes.func.isRequired,
	activeChannel: PropTypes.shape({}).isRequired,
};

export default Channel;
