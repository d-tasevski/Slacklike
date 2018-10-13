import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

export class UserForm extends Component {
	static propTypes = {
		createUser: PropTypes.func.isRequired,
	};

	state = {
		name: '',
	};

	onInputChange = e => this.setState({ name: e.target.value });
	onSubmit = e => {
		e.preventDefault();
		const user = {
			name: this.state.name,
			id: uuid(),
		};
		this.props.createUser(user);
		return this.setState({ name: '' });
	};

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<div className="form-group">
					<input
						className="form-control"
						placeholder="Your Name"
						type="text"
						value={this.state.name}
						onChange={this.onInputChange}
						name="username"
					/>
				</div>
			</form>
		);
	}
}

export default UserForm;
