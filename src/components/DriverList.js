import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Result from './Results';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

const DriverList = () => {
	const [year, setYear] = useState(2022);

	const fetchDrivers = async (year) => {
		const res = await fetch(`http://ergast.com/api/f1/${year}/drivers.json`);
		return res.json();
	};

	const { isLoading, isError, error, data } = useQuery(['drivers', year], () =>
		fetchDrivers(year)
	);

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
				<div className='f1dex__body__search__input'>
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
				<div className='f1dex__body__search__results'>
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
			</div>
			<Result id={driverId} />
		</>
	);
};

export default DriverList;
