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
		connected: false,
	};

	componentDidMount() {
		this.ws = new WebSocket('ws://echo.websocket.org');
		this.ws.onmessage = this.onMessage;
		this.ws.onopen = this.onOpen;
		this.ws.onclose = this.onClose;
	}

	onMessage = e => {
		const event = JSON.parse(e.data);
		console.log(e);
		console.log(event);
		if (event.name === 'add-channel') {
			this.addChannel(event.data);
		}
	};
	onOpen = () => this.setState({ connected: true });
	onClose = () => this.setState({ connected: false });

	setUsername = name => this.setState({ users: [...this.state.users, { id: uuid(), name }] });
	setChannel = activeChannel => this.setState({ activeChannel });
	addChannel = channel => this.setState({ channels: [...this.state.channels, channel] });
	createChannel = name => {
		const msg = {
			name: 'add-channel',
			data: { name, id: uuid() },
		};
		return this.ws.send(JSON.stringify(msg));
	};

	addMessage = (body, author) => {
		const createdAt = new Date();
		this.setState({
			messages: [...this.state.messages, { id: uuid(), body, author, createdAt }],
		});
	};

	render() {
		return (
			<div className="app bg-info">
				<div className="nav">
					<ChannelSection
						{...this.state}
						setChannel={this.setChannel}
						createChannel={this.createChannel}
					/>
					<UserSection {...this.state} setUsername={this.setUsername} />
				</div>
				<MessageSection {...this.state} addMessage={this.addMessage} />
			</div>
		);
	}
}

export default App;
