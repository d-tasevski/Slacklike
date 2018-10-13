import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Message = ({ message: { author, body, createdAt } }) => {
	return (
		<li className="message">
			<div className="author">
				<strong>{author}</strong>
				<i className="timestamp">{moment(createdAt).format('HH:mm:ss, DD MMM')}</i>
			</div>
			<div className="body">{body}</div>
		</li>
	);
};

Message.propTypes = {
	message: PropTypes.shape({}).isRequired,
};

export default Message;
