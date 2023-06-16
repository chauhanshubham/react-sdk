import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../src';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
	<BrowserRouter>
		<AuthProvider projectId="P2R3LuJ02Ocz5qtyc8C9qZHt3vb9" baseUrl="">
			<App />
		</AuthProvider>
	</BrowserRouter>
);
