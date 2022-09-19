import { useFetch } from '../api/useFetch';
import '../App.scss';

const Result = ({ id }) => {
	console.log('driver ID', id);

	// fetch driver info by driver id
	const { data: driverInfo, loading: driverInfoLoading } = useFetch(
		`http://ergast.com/api/f1/drivers/${id}.json`
	);

	if (driverInfoLoading) return <div>Loading...</div>;

	const driverInfoData = driverInfo.MRData.DriverTable.Drivers;

	console.log('driver info', driverInfoData);
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
						<p>Number: {driver.permanentNumber}</p>
					</div>
				))}
		</div>
	);
};

export default Result;
