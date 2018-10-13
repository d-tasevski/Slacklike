import React from 'react';
import PropTypes from 'prop-types';

import Channel from './Channel';

const ChannelList = ({ channels, setChannel, activeChannel }) => {
	return (
		<ul>
			{channels.map(c => (
				<Channel
					activeChannel={activeChannel}
					channel={c}
					setChannel={setChannel}
					key={c.id}
				/>
			))}
		</ul>
	);
};

ChannelList.propTypes = {
	channels: PropTypes.arrayOf(PropTypes.shape({})),
	setChannel: PropTypes.func.isRequired,
	activeChannel: PropTypes.shape({}).isRequired,
};

export default ChannelList;
