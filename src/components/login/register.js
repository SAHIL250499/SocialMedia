import React from 'react';
import loginImg from './login.svg';

export class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: ''
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({
			username: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.onSubmit(this.state.username);
	}

	render() {
		return (
			<div className="base-container" ref={this.props.containerRef}>
				<div className="header">Register</div>
				<div className="content">
					<div className="image">
						<img src={loginImg} />
					</div>
					<form className="form" onSubmit={this.onSubmit}>
						<div className="form-group">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								name="username"
								placeholder="username"
								onChange={this.onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input type="text" name="email" placeholder="email" />
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input type="text" name="password" placeholder="password" />
						</div>
						<div className="footer">
							<button type="submit" className="btn">
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
