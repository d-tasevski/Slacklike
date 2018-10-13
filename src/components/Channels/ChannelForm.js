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
		return this.props.addChannel(this.state.name);
	};

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<input type="text" value={this.state.name} onChange={this.onInputChange} />
			</form>
		);
	}
}

export default ChannelForm;
