import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import { tokenUrl, instanceLocator } from './config';
import TypingIndicator from './components/TypingIndicator';

class ChatScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			roomId: null,
			messages: [],
			joinableRooms: [],
			joinedRooms: [],
			usersWhoAreTyping: []
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.subscribeToRoom = this.subscribeToRoom.bind(this);
		this.getRooms = this.getRooms.bind(this);
		this.createRoom = this.createRoom.bind(this);
		this.sendTypingEvent = this.sendTypingEvent.bind(this);
	}

	componentDidMount() {
		const chatManager = new Chatkit.ChatManager({
			instanceLocator,
			userId: this.props.currentUsername,
			tokenProvider: new Chatkit.TokenProvider({
				url: tokenUrl
			})
		});

		chatManager
			.connect()
			.then(currentUser => {
				this.currentUser = currentUser;
				this.getRooms();
			})
			.catch(err => console.log('error connecting: ', err));
	}

	subscribeToRoom(roomId) {
		this.setState({ messages: [] });
		this.currentUser
			.subscribeToRoom({
				roomId: roomId,
				hooks: {
					onMessage: message => {
						this.setState({
							messages: [...this.state.messages, message]
						});
					},
					onUserStartedTyping: user => {
						this.setState({
							usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
						});
					},
					onUserStoppedTyping: user => {
						this.setState({
							usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
								username => username !== user.name
							)
						});
					}
				}
			})
			.then(room => {
				this.setState({
					roomId: room.id
				});
				this.getRooms();
			})
			.catch(err => console.log('error on subscribing to room: ', err));
	}

	getRooms() {
		this.currentUser
			.getJoinableRooms()
			.then(joinableRooms => {
				this.setState({
					joinableRooms,
					joinedRooms: this.currentUser.rooms
				});
			})
			.catch(err => console.log('error on joinableRooms', err));
	}

	sendMessage(text) {
		this.currentUser.sendMessage({
			text,
			roomId: this.state.roomId
		});
	}

	createRoom(name) {
		this.currentUser
			.createRoom({
				name
			})
			.then(room => this.subscribeToRoom(room.id))
			.catch(err => console.log('error creating room', err));
	}

	sendTypingEvent() {
		this.currentUser
			.isTypingIn({ roomId: this.state.roomId })
			.catch(error => console.error('error', error));
	}

	render() {
		return (
			<div className="app">
				<RoomList
					roomId={this.state.roomId}
					subscribeToRoom={this.subscribeToRoom}
					rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
				/>
				<MessageList
					roomId={this.state.roomId}
					messages={this.state.messages}
				/>
				<div classname="typing_indicator">
					<h3>Friend's Online</h3>
					<TypingIndicator
						usersWhoAreTyping={this.state.usersWhoAreTyping}></TypingIndicator>
				</div>
				<SendMessageForm
					disabled={!this.state.roomId}
					sendMessage={this.sendMessage}
					onChange={this.sendTypingEvent}
				/>
				<NewRoomForm createRoom={this.createRoom} />
			</div>
		);
	}
}

export default ChatScreen;
