import React from 'react';

class TypingIndicator extends React.Component {
	render() {
		if (this.props.usersWhoAreTyping.length === 0) {
			return <div></div>;
		} else if (this.props.usersWhoAreTyping.length === 1) {
			return <p>{this.props.usersWhoAreTyping[0]} is typing ...</p>;
		} else if (this.props.usersWhoAreTyping.length > 1) {
			return <p>{this.props.usersWhoAreTyping.join(',')} are typing....</p>;
		}
	}
}

export default TypingIndicator;
