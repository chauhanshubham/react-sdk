import type { UserResponse } from '@descope/web-js-sdk';
import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getJwtRoles, useDescope, useSession, useUser } from '../../src';
import { fetchData } from './api';

const getUserDisplayName = (user?: UserResponse) =>
	user?.name || user?.loginIds?.[0] || '';

const Home = () => {
	const { logout } = useDescope();
	const { isAuthenticated, isSessionLoading, sessionToken } = useSession();
	const { user } = useUser();

	const onLogout = useCallback(() => {
		logout();
	}, [logout]);

	const onFetch = useCallback(async () => {
		const data = await fetchData();
		alert(data); // eslint-disable-line no-alert
	}, []);
	const roles = useMemo(
		() => sessionToken && JSON.stringify(getJwtRoles(sessionToken) || []),
		[sessionToken]
	);

	if (isSessionLoading) return <div>Loading...</div>;
	return (
		<>
			<h2>Home</h2>
			{!isAuthenticated && (
				<Link id="login-button" to="/login">
					Login
				</Link>
			)}
			{isAuthenticated && (
				<>
					<div className="username"> Hello {getUserDisplayName(user)}!</div>
					<div className="username"> Roles: {roles}</div>
					<button
						type="button"
						id="logout-button"
						onClick={onLogout}
						style={{
							display: 'block',
							margin: 'auto',
							background: 'none',
							border: 'none',
							color: 'blue',
							padding: 5
						}}
					>
						Logout
					</button>
					<button
						type="button"
						id="fetch-button"
						onClick={onFetch}
						style={{
							display: 'block',
							margin: 'auto',
							background: 'none',
							border: 'none',
							color: 'blue',
							padding: 5
						}}
					>
						Fetch Fact
					</button>
					{process.env.DESCOPE_STEP_UP_FLOW_ID && (
						<Link id="step-up-button" to="/step-up">
							Step Up
						</Link>
					)}
				</>
			)}
		</>
	);
};

export default Home;
