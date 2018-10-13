import React, { Component } from 'react';
import uuid from 'uuid/v4';

import './app.css';

import ChannelSection from './Channels/ChannelSection';

class App extends Component {
	state = {
		channels: [],
		activeChannel: '',
	};

	setChannel = activeChannel => this.setState({ activeChannel });
	addChannel = name => {
		this.setState({ channels: [...this.state.channels, { id: uuid(), name }] });
		// TBD - Send to server
	};

	render() {
		return (
			<div className="app">
				<div className="nav">
					<ChannelSection
						{...this.state}
						setChannel={this.setChannel}
						addChannel={this.addChannel}
					/>
				</div>
			</div>
		);
	}
}

export default App;
