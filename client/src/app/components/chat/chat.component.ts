import { Component, OnInit, OnDestroy } from '@angular/core';
import * as SocketIO from 'socket.io-client';


interface ChatMessage {
	text: string;
}


@Component({
	selector: 'chat-component',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
	/** Text of msg to send */
	msgText: string;
	/** Received messages */
	messages: string[] = [];
	/** Helper getter to bind whether we are connected or not */
	get connected() { return this.socket.connected }

	private socket: SocketIOClient.Socket;

	ngOnInit() {
		this.socket = SocketIO.connect('localhost:8100');
		// Debugging
		this.socket.on('connect', () => console.log('connected'));
		this.socket.on('disconnect', () => console.log('disconnected'));
		this.socket.on('reconnect', () => console.log('reconnect'));
		// Receiving messages
		this.socket.on('message', (msg: ChatMessage) => this.messages.push(msg.text))
	}

	ngOnDestroy() {
		if (this.socket && !this.socket.disconnected) {
			this.socket.disconnect();
			this.socket.removeAllListeners();
		}
	}

	sendMessage() {
		this.socket.emit('message', <ChatMessage>{ text: this.msgText });
		this.msgText = '';
	}

}
