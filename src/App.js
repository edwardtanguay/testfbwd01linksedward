import React, { useState, useEffect } from 'react'
import './App.scss';
import feeds from './data/feeds.json';

function App() {

	const [links, setLinks] = useState([]);

	useEffect(() => {
		let initialLinks = [];
		feeds.forEach(feed => {
			(async () => {
				const response = await fetch(feed.linksUrl);
				const data = await response.json();
				initialLinks = [...initialLinks, ...data];
			})();
		})
		setLinks(initialLinks);
	}, [])

	return (
		<div className="App">
			<h1>Links</h1>
			<ul>
				{links.map((link, index) => {
					return (
						<li key={index}><a target="_blank" href={link.url} rel="noreferrer">{link.title}</a></li>
					)
				})}
			</ul>
		</div>
	);
}

export default App;