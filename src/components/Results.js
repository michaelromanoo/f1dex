import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import '../App.scss';
import { useQuery } from '@tanstack/react-query';

const Result = ({ id }) => {
	// fetch driver info by driver id
	// const { data: driverInfo, loading: driverInfoLoading } = useFetch(
	// 	`http://ergast.com/api/f1/drivers/${id}.json`
	// );

	const fetchDriverInfo = async (id) => {
		const res = await fetch(`http://ergast.com/api/f1/drivers/${id}.json`);
		return res.json();
	};

	const { isLoading, isError, data, error } = useQuery(['driverInfo', id], () =>
		fetchDriverInfo(id)
	);

	// TODO: make spinner
	if (isLoading) return <LoadingSpinner />;

	if (isError) return <div>Error {error.message}</div>;

	const driverInfoData = data.MRData.DriverTable.Drivers;

	return (
		<div className='f1dex__body__results'>
			{driverInfoData.length > 0 &&
				driverInfoData.map((driver) => (
					<div key={driver.driverId}>
						<h1>
							{driver.givenName} {driver.familyName}
						</h1>
						<p>Code: {driver.code}</p>
						<p>Nationality: {driver.nationality}</p>
						<p>Date of Birth: {driver.dateOfBirth}</p>
						<p>Number: {driver.permanentNumber}</p>
					</div>
				))}
		</div>
	);
};

export default Result;
