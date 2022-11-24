import { useState } from 'react';
import { useFetchDrivers } from '../api/api';
import Result from './Results';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

const DriverList = () => {
	const [year, setYear] = useState(2022);
	const { isLoading, isError, error, data } = useFetchDrivers(year);

	const [filteredArr, setFilteredArr] = useState([]);
	const [driverId, setDriverId] = useState('albon');

	if (isLoading) return <LoadingSpinner />;

	if (isError) return <div>Error {error.message}</div>;

	// create new array from api and add new property for full name
	const drivers = data.MRData.DriverTable.Drivers.map((obj) => ({
		...obj,
		fullName: obj.givenName + ' ' + obj.familyName,
	}));

	// filter api results with search term
	const filterApiResults = (val) => {
		let filteredArr = drivers.filter((driver) => driver.fullName.includes(val));
		return setFilteredArr(filteredArr);
	};

	// get driver information from id
	const getDriverInfo = (id) => {
		return setDriverId(id);
	};

	return (
		<>
			<div className='f1dex__body__search'>
				<input
					className='input'
					type='search'
					id='search'
					name='search'
					placeholder='Insert text here...'
					onChange={(e) => filterApiResults(e.target.value)}
				/>
				<select
					name='year'
					id='year-select'
					value={year}
					onChange={(e) => setYear(Number(e.target.value))}
				>
					<option value='2022'>2022</option>
					<option value='2021'>2021</option>
					<option value='2020'>2020</option>
					<option value='2019'>2019</option>
					<option value='2018'>2018</option>
				</select>
			</div>
			<div className='f1dex__body__results'>
				<div className='f1dex__body__results__list'>
					<ul className='f1dex__drivers__list'>
						{filteredArr.length > 0
							? filteredArr.map((driver) => (
									<li
										key={driver.driverId}
										className='f1dex__drivers__list__item'
										onClick={() => getDriverInfo(driver.driverId)}
									>
										{driver.fullName}
									</li>
							  ))
							: drivers.map((driver) => (
									<li
										key={driver.driverId}
										className='f1dex__drivers__list__item'
										onClick={() => getDriverInfo(driver.driverId)}
									>
										<p>{driver.fullName}</p>
									</li>
							  ))}
					</ul>
				</div>
				<Result id={driverId} />
			</div>
		</>
	);
};

export default DriverList;
