import React from 'react';
import PropTypes from 'prop-types';

import Channel from './Channel';

const ChannelList = ({ channels, setChannel }) => {
	return (
		<ul>
			{channels.map(c => (
				<Channel channel={c} setChannel={setChannel} />
			))}
		</ul>
	);
};

ChannelList.propTypes = {
	channels: PropTypes.arrayOf(PropTypes.shape({})),
	setChannel: PropTypes.func.isRequired,
};

export default ChannelList;
