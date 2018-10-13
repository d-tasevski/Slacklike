import React from 'react';
import PropTypes from 'prop-types';

import Message from './Message';

const MessageList = ({ messages }) => {
	return (
		<ul>
			{messages.map(m => (
				<Message message={m} key={m.id} />
			))}
		</ul>
	);
};

MessageList.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default MessageList;
