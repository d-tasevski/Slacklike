import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

export class MessageForm extends Component {
	static propTypes = {
		activeChannel: PropTypes.shape({ name: PropTypes.string }),
		createMessage: PropTypes.func.isRequired,
	};

	state = {
		body: '',
	};

	onInputChange = e => this.setState({ body: e.target.value });

	onSubmit = e => {
		e.preventDefault();
		const message = {
			body: this.state.body,
			createdAt: new Date(),
			author: 'Thomas', // TBD
			id: uuid(),
		};
		this.props.createMessage(message);
		return this.setState({ body: '' });
	};

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<div className="form-group">
					{this.props.activeChannel.name ? (
						<input
							className="form-control"
							placeholder="Your message..."
							type="text"
							value={this.state.body}
							onChange={this.onInputChange}
							name="message"
						/>
					) : null}
				</div>
			</form>
		);
	}
}

export default MessageForm;
