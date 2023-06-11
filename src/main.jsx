import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './serif-fonts.css';
import './sans-serif-fonts.css';
import './display-fonts.css';
import './handwriting-fonts.css';
import './monospace-fonts.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
