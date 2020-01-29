import React from 'react';
import loginImg from './login.svg';

export class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="base-container" ref={this.containerRef}>
				<div className="header">Login</div>
				<div className="content">
					<div className="image">
						<img src={loginImg}></img>
						<form className="form">
							<div className="form-group">
								<label htmlform="username">Username</label>
								<input
									type="text"
									name="username"
									placeholder="username"></input>
							</div>

							<div className="form-group">
								<label htmlform="password">Password</label>
								<input
									type="password"
									name="password"
									placeholder="password"></input>
							</div>
							<div className="footer">
								<button type="submit" className="btn">
									Login
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
