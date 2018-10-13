import { EventEmitter } from 'events';

class Socket {
	constructor(ws = new WebSocket(), ee = new EventEmitter()) {
		this.ws = ws;
		this.ee = ee;

		this.ws.onmessage = this.onMessage;
		this.ws.onopen = this.onOpen;
		this.ws.onclose = this.onClose;
	}

	on = (name, fn) => this.ee.on(name, fn);

	off = (name, fn) => this.ee.removeListener(name, fn);

	emit = (name, data) => {
		const message = JSON.stringify({ name, data });
		this.ws.send(message);
	};

	onMessage = e => {
		try {
			const message = JSON.parse(e.data);
			this.ee.emit(message.name, message.data);
		} catch (err) {
			this.ee.emit('error', err);
		}
	};

	onOpen = () => this.ee.emit('connect');

	onClose = () => this.ee.emit('disconnect');
}

export default Socket;
