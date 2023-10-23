import { useFetchDriverInfo } from '../api/api';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import '../App.scss';

const Result = ({ id }) => {
	const { isLoading, isError, data, error } = useFetchDriverInfo(id);

	if (isLoading) return <LoadingSpinner />;

	if (isError) return <div>Error {error.message}</div>;

	const driverInfoData = data.MRData.DriverTable.Drivers;

	// TODO: display first driver when the year changes
	return (
		<div className='f1dex__results__list'>
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
