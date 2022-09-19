import { useState } from 'react';
import Result from './Results';

const Body = ({ data }) => {
	console.log('data', data);

	const [filteredArr, setFilteredArr] = useState([]);
	const [driverId, setDriverId] = useState('albon');

	const driversList = data;

	// filter api results with search term
	const filterApiResults = (val) => {
		console.log('search term', val);
		let filteredArr = data.filter((drivers) => drivers.fullName.includes(val));
		console.log('filtered arr', filteredArr);
		setFilteredArr(filteredArr);
	};

	// get driver information from id
	const getDriverInfo = (id) => {
		console.log('driver id', id);
		setDriverId(id);
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
						onChange={(e) => {
							console.log('val', e.target.value);
							filterApiResults(e.target.value);
						}}
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
										<p>
											{driver.givenName} {driver.familyName}
										</p>
									</li>
							  ))
							: driversList.map((driver) => (
									<li
										key={driver.driverId}
										className='f1dex__drivers__list__item'
										onClick={() => getDriverInfo(driver.driverId)}
									>
										<p>
											{driver.givenName} {driver.familyName}
										</p>
									</li>
							  ))}
					</ul>
				</div>
			</div>
			{/* pass driver to results pane */}
			<Result id={driverId} />
		</>
	);
};

export default Body;
