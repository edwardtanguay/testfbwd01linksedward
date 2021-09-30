import React, { useState, useEffect } from 'react'
import './App.scss';
import feeds from './data/feeds.json';

function App() {

	const [links, setLinks] = useState([]);

	useEffect(() => {
		feeds.forEach(feed => {
			(async () => {
				const response = await fetch(feed.linksUrl);
				const links = await response.json();
				links.forEach(link => link.origin = feed.name);
				setLinks(n => [...n, ...links]);
			})();
		});
	}, [])

	return (
		<div className="App">
			<h1>Links</h1>
			<ul>
				{links.map((link, index) => {
					return (
						<li key={index}><a target="_blank" href={link.url} rel="noreferrer">{link.title}</a> (from {link.origin})</li>
					)
				})}
			</ul>
		</div>
	);
}

export default App;