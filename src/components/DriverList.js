import { useState } from 'react';
import { useFetch } from '../api/useFetch';
import Result from './Results';

const DriverList = () => {
	const { data, loading } = useFetch(
		`http://ergast.com/api/f1/2022/drivers.json`
	);
	const [filteredArr, setFilteredArr] = useState([]);
	const [driverId, setDriverId] = useState('albon');

	if (loading) return <div>Loading...</div>;

	// create new array from api and add new property for full name
	const drivers = data.DriverTable.Drivers.map((obj) => ({
		...obj,
		fullName: obj.givenName + ' ' + obj.familyName,
	}));

	console.log('drivers', drivers);

	// filter api results with search term
	const filterApiResults = (val) => {
		let filteredArr = drivers.filter((driver) => driver.fullName.includes(val));
		console.log('filtered arr', filteredArr);
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
