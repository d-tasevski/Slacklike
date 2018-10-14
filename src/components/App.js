import React, { Component } from 'react';

import './app.css';
import Socket from '../Socket';
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
		this.socket = new Socket();

		this.socket.on('connect', this.onConnect);
		this.socket.on('disconnect', this.onDisconnect);

		this.socket.on('create-channel', this.onAddChannel);
		this.socket.on('create-user', this.onAddUser);
		this.socket.on('create-message', this.onAddMessage);

		this.socket.on('edit-user', this.onEditUser);
		this.socket.on('ban-user', this.onBanUser);
	}

	onConnect = () => {
		this.setState({ connected: true });
		this.socket.emit('subscribe-channel');
		this.socket.emit('subscribe-user');
	};
	onDisconnect = () => this.setState({ connected: false });

	createChannel = channel => this.socket.emit('create-channel', channel);
	createMessage = message => this.socket.emit('create-message', message);
	createUser = user => this.socket.emit('create-user', user);

	onAddChannel = channel => this.setState({ channels: [...this.state.channels, channel] });
	onAddMessage = message => this.setState({ messages: [...this.state.messages, message] });
	onAddUser = user => this.setState({ users: [...this.state.users, user] });

	onEditUser = user => {
		const users = this.state.users.filter(u => u.id !== user.id);
		return this.setState({ users: [...users, user] });
	};
	onBanUser = user => {
		const users = this.state.users.filter(u => u.id !== user.id);
		return this.setState({ users });
	};

	setActiveChannel = activeChannel => {
		this.socket.emit('unsubscribe-message');
		this.setState({ activeChannel, messages: [] });
		this.socket.emit('subscribe-message', { channelId: activeChannel.id });
	};

	render() {
		return (
			<div className="app bg-info">
				<div className="nav">
					<ChannelSection
						{...this.state}
						setChannel={this.setActiveChannel}
						createChannel={this.createChannel}
					/>
					<UserSection {...this.state} createUser={this.createUser} />
				</div>
				<MessageSection {...this.state} createMessage={this.createMessage} />
			</div>
		);
	}
}

export default App;
