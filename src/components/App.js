import React, { Component } from 'react';
import uuid from 'uuid/v4';

import './app.css';

import ChannelSection from './Channels/ChannelSection';
import UserSection from './Users/UserSection';
import MessageSection from './Messages/MessageSection';

class App extends Component {
	state = {
		channels: [],
		users: [],
		messages: [],
		activeChannel: {},
		activeUser: {},
	};

	setChannel = activeChannel => this.setState({ activeChannel });
	addChannel = name => {
		this.setState({ channels: [...this.state.channels, { id: uuid(), name }] });
		// TBD - Send to server
	};

	addMessage = (body, author) => {
		const createdAt = new Date();
		this.setState({
			messages: [...this.state.messages, { id: uuid(), body, author, createdAt }],
		});
		// TBD - Send to server
	};

	setUsername = name => {
		this.setState({ users: [...this.state.users, { id: uuid(), name }] });
		// TBD - Send to server
	};

	render() {
		return (
			<div className="app bg-info">
				<div className="nav">
					<ChannelSection
						{...this.state}
						setChannel={this.setChannel}
						addChannel={this.addChannel}
					/>
					<UserSection {...this.state} setUsername={this.setUsername} />
				</div>
				<MessageSection {...this.state} addMessage={this.addMessage} />
			</div>
		);
	}
}

export default App;
