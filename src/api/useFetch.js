import { useEffect, useState } from 'react';

// custom hook to fetch api
// receives url as a parameter & returns data
export const useFetch = (url) => {
	// assign null values for data & null
	const [state, setState] = useState({ data: null, loading: true });
	useEffect(() => {
		// abort controller
		const abort = new AbortController();
		// fetch api from the url passed
		fetch(url, { signal: abort.signal })
			.then((response) => response.json())
			.then((data) => {
				setState({
					data: data,
					loading: false,
				});
			})
			.catch((err) => {
				console.log(err);
			});

		return () => {
			abort.abort();
		};
	}, [url, setState]);

	return state;
};
