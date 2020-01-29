import React from 'react';
import { Login, Register } from './components/login/index';
import './LoginApp.scss';
import ChatScreen from './ChatScreen';

class LoginApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentScreen: 'LoginAppScreen',
			currentUsername: '',
			isLogginActive: true
		};
		this.onRegistered = this.onRegistered.bind(this);
	}

	componentDidMount() {
		//Add .right by default
		this.rightSide.classList.add('right');
	}

	onRegistered(username) {
		fetch('http://localhost:3001/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username })
		})
			.then(response => {
				this.setState({
					currentUsername: username,
					currentScreen: 'ChatScreen'
				});
			})
			.catch(error => {
				console.error(error);
			});
	}

	changeState() {
		const { isLogginActive } = this.state;

		if (isLogginActive) {
			this.rightSide.classList.remove('right');
			this.rightSide.classList.add('left');
		} else {
			this.rightSide.classList.remove('left');
			this.rightSide.classList.add('right');
		}
		this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
	}

	render() {
		const { isLogginActive } = this.state;
		const current = isLogginActive ? 'Register' : 'Login';
		const currentActive = isLogginActive ? 'login' : 'register';
		if (this.state.currentScreen === 'LoginAppScreen') {
			return (
				<div className="App">
					<div className="login">
						<div className="container" ref={ref => (this.container = ref)}>
							{isLogginActive && (
								<Login containerRef={ref => (this.current = ref)} />
							)}
							{!isLogginActive && (
								<Register
									onSubmit={this.onRegistered}
									containerRef={ref => (this.current = ref)}
								/>
							)}
						</div>
						<RightSide
							current={current}
							currentActive={currentActive}
							containerRef={ref => (this.rightSide = ref)}
							onClick={this.changeState.bind(this)}
						/>
					</div>
				</div>
			);
		} else if (this.state.currentScreen === 'ChatScreen') {
			return <ChatScreen currentUsername={this.state.currentUsername} />;
		}
	}
}

const RightSide = props => {
	return (
		<div
			className="right-side"
			ref={props.containerRef}
			onClick={props.onClick}>
			<div className="inner-container">
				<div className="text">{props.current}</div>
			</div>
		</div>
	);
};

export default LoginApp;
