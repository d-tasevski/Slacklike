import React from 'react';
import PropTypes from 'prop-types';

import MessageList from './MessageList';
import MessageForm from './MessageForm';

const MessageSection = ({ messages, createMessage, activeChannel }) => {
	return (
		<div className="messages-container card bg-info">
			<div className="card-header">
				<strong>{activeChannel.name}</strong>
			</div>
			<div className="card-body messages">
				<MessageList messages={messages} />
				<MessageForm createMessage={createMessage} activeChannel={activeChannel} />
			</div>
		</div>
	);
};

MessageSection.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	createMessage: PropTypes.func.isRequired,
	activeChannel: PropTypes.shape({}),
};

export default MessageSection;
