import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ChannelForm extends Component {
	static propTypes = {
		addChannel: PropTypes.func.isRequired,
	};

	state = {
		name: '',
	};

	onInputChange = e => this.setState({ name: e.target.value });

	onSubmit = e => {
		e.preventDefault();
		this.props.addChannel(this.state.name);
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
					/>
				</div>
			</form>
		);
	}
}

export default ChannelForm;
