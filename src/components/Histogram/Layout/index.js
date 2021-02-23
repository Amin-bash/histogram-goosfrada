import React, { useState } from 'react';
import HistogramChart from '..';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import './styles.css';

const Layout = () => {
	const [ data, setData ] = useState([
		{ month: 'Jan', posts: 0 },
		{ month: 'Feb', posts: 0 },
		{ month: 'Mar', posts: 0 },
		{ month: 'Apr', posts: 0 },
		{ month: 'May', posts: 0 },
		{ month: 'June', posts: 0 },
		{ month: 'July', posts: 0 },
		{ month: 'Aug', posts: 0 },
		{ month: 'Sept', posts: 0 },
		{ month: 'Oct', posts: 0 },
		{ month: 'Nov', posts: 0 },
		{ month: 'Dec', posts: 0 }
	]);

	React.useEffect(() => {
		const client = new ApolloClient({
			uri: 'https://fakerql.stephix.uk/graphql',
			cache: new InMemoryCache()
		});

		return client
			.query({
				query: gql`
					query GetRates {
						allPosts(count: 12) {
							createdAt
						}
					}
				`
			})
			.then((result) => {
				for (let i = 0; i <= 11; i++) {
					if (result.data.allPosts[i]) {
						setData((prevState) => [
							...prevState,
							(prevState[i].posts = result.data.allPosts[i].createdAt)
						]);
					}
				}
			});
	}, []);

	return (
		<div>
			<div className="histogram-container">
				<div>
					<h1 className="title">Histogram GoosFarba</h1>
				</div>
				<div className="histogram-section">
					<HistogramChart data={data} />
					<div className="months">{data.map((val) => <span key={val.month}>{val.month}</span>)}</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
