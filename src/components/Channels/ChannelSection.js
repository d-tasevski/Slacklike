import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChannelList from './ChannelList';
import ChannelForm from './ChannelForm';

export class ChannelSection extends Component {
	static propTypes = {
		channels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
		setChannel: PropTypes.func.isRequired,
		addChannel: PropTypes.func.isRequired,
		activeChannel: PropTypes.shape({}).isRequired,
	};

	render() {
		const { setChannel, channels, addChannel, activeChannel } = this.props;

		return (
			<div className="support panel panel-primary">
				<div className="panel-heading">
					<strong>Channels</strong>
				</div>
				<div className="panel body channels">
					<ChannelList
						activeChannel={activeChannel}
						channels={channels}
						setChannel={setChannel}
					/>
					<ChannelForm addChannel={addChannel} />
				</div>
			</div>
		);
	}
}

export default ChannelSection;
