import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ChannelList from './ChannelList';
import ChannelForm from './ChannelForm';

export class ChannelSection extends Component {
	static propTypes = {
		channels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
		setChannel: PropTypes.func.isRequired,
		addChannel: PropTypes.func.isRequired,
	};

	render() {
		const { setChannel, channels, addChannel } = this.props;

		return (
			<Fragment>
				<ChannelList channels={channels} setChannel={setChannel} />
				<ChannelForm addChannel={addChannel} />
			</Fragment>
		);
	}
}

export default ChannelSection;
