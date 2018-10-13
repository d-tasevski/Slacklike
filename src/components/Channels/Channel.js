import React from 'react';
import PropTypes from 'prop-types';

const Channel = ({ channel, setChannel }) => {
	const onSetChannel = e => {
		e.preventDefault();
		return setChannel(channel);
	};

	return (
		<li>
			<button onClick={onSetChannel}>{channel.name}</button>
		</li>
	);
};

Channel.propTypes = {
	channel: PropTypes.shape({}).isRequired,
	setChannel: PropTypes.func.isRequired,
};

export default Channel;
