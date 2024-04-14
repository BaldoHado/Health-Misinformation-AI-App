import styles from './SignIn.module.scss';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface signInProps {
	setCreateAccountOpen?: (e: boolean) => void;
}
interface signInData {
	username: string;
	password: string;
}
const SignIn = ({ setCreateAccountOpen }: signInProps) => {
	const [signInData, setSignInData] = useState<signInData>({
		username: '',
		password: '',
	});
	const [signInErr, setSignInErr] = useState<boolean>(false);

	// get redirect url from query params
	const urlParams = new URLSearchParams(window.location.search);
	const redirect = urlParams.get('redirect') || '/';

	const handleUpdate = (e: any) => {
		const { name, value } = e.target;
		setSignInData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const login = async (e: any) => {
		e.preventDefault();
		try {
			const loginResp = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: signInData.username, pass: signInData.password }),
			});
			if (loginResp.status === 200) {
				const { token } = await loginResp.json();
				console.log(token);
				Cookies.set("token", token);
				window.location.href = redirect;
			}
			return false;
		} catch (e) {
			return false;
		}
	};

	return (
		<form onSubmit={login}>
			<div className={styles.body}>
				<div className={styles.username}>
					<p>Username</p>
					<input
						placeholder="Enter email"
						onChange={handleUpdate}
						type="text"
						name="username"
						value={signInData.username}
					/>
				</div>
				<div className={styles.password}>
					<p>Password</p>
					<input
						placeholder="Enter password"
						onChange={handleUpdate}
						type="password"
						name="password"
						value={signInData.password}
					/>
				</div>
				{signInErr && (
					<p className={styles.signInErr}>
						Your email or password is incorrect. Please try again.
					</p>
				)}
				<button className={styles.button} type="submit">
					Sign In
				</button>
				{setCreateAccountOpen && (
					<p>
						Not registered?
						<span
							onClick={() => {
								setCreateAccountOpen(true);
							}}
						>
							{' '}
							<a>Create an account here</a>
						</span>
					</p>
				)}
			</div>
		</form>
	);
};

export default SignIn;
