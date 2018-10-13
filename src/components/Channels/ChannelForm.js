import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

export class ChannelForm extends Component {
	static propTypes = {
		createChannel: PropTypes.func.isRequired,
	};

	state = {
		name: '',
	};

	onInputChange = e => this.setState({ name: e.target.value });

	onSubmit = e => {
		e.preventDefault();
		const channel = {
			name: this.state.name,
			id: uuid(),
		};
		this.props.createChannel(channel);
		return this.setState({ name: '' });
	};

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<div className="form-group">
					<input
						className="form-control"
						placeholder="New Cool Channel"
						type="text"
						value={this.state.name}
						onChange={this.onInputChange}
						name="channel-name"
					/>
				</div>
			</form>
		);
	}
}

export default ChannelForm;
