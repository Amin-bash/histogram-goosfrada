import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { request, gql } from 'graphql-request';

const query = gql`
	{
		allPosts(count: 12) {
			id
			title
			body
			published
			createdAt
			author {
				id
				firstName
				lastName
				avatar
			}
		}
	}
`;

request('https://fakerql.stephix.uk/graphql', query).then((data) => data);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
reportWebVitals();
