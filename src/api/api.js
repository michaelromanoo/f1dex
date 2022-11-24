import { useQuery } from '@tanstack/react-query';

// fetch drivers list by year
export const useFetchDrivers = (year) => {
	return useQuery(['drivers', year], async () =>
		(await fetch(`https://ergast.com/api/f1/${year}/drivers.json`)).json()
	);
};

// fetch driver info by driver id
export const useFetchDriverInfo = (id) => {
	return useQuery(['driverInfo', id], async () =>
		(await fetch(`https://ergast.com/api/f1/drivers/${id}.json`)).json()
	);
};

// fetch all constructors in 2022
export const useFetchConstructors = () => {
	return useQuery(['constructors'], async () =>
		(await fetch(`https://ergast.com/api/f1/2022/constructors.json`)).json()
	);
};

// // fetch constructor info by id
export const useFetchConstructorsInfo = (id) => {
	return useQuery(['constructorsInfo', id], async () =>
		(await fetch(`https://ergast.com/api/f1/constructors/${id}.json`)).json()
	);
};
