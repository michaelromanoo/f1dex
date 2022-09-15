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
				console.log('data', data);
				// create new array and add new property for full name
				// get drivers table
				let newArr = data.MRData.DriverTable.Drivers.map((obj) => ({
					...obj,
					fullName: obj.givenName + ' ' + obj.familyName,
				}));
				console.log('new data', newArr);
				setState({
					data: newArr,
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
