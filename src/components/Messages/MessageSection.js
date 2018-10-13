import React from 'react';
import PropTypes from 'prop-types';

import MessageList from './MessageList';
import MessageForm from './MessageForm';

const MessageSection = ({ messages, addMessage, activeChannel }) => {
	return (
		<div className="messages-container card bg-info">
			<div className="card-header">
				<strong>{activeChannel.name}</strong>
			</div>
			<div className="card-body messages">
				<MessageList messages={messages} />
				<MessageForm addMessage={addMessage} activeChannel={activeChannel} />
			</div>
		</div>
	);
};

MessageSection.propTypes = {};

export default MessageSection;
