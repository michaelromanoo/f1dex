import { useState } from 'react';
import { useFetch } from './api/useFetch';
import logo from './assets/logo-new.png';
import './App.scss';

function App() {
	// pass a driver id as a default value, or else data wonr be fetched
	const [driverId, setDriverId] = useState('albon');
	const [filteredArr, setFilteredArr] = useState([]);

	// fetch data list of all drivers in 2022 season
	const { data, loading } = useFetch(
		`http://ergast.com/api/f1/2022/drivers.json`
	);

	// fetch driver info by driver id
	const { data: driverInfo, loading: driverInfoLoading } = useFetch(
		`http://ergast.com/api/f1/drivers/${driverId}.json`
	);

	if (loading || driverInfoLoading) return <div>Loading...</div>;

	// create new array and add new property for full name
	const driversList = data.MRData.DriverTable.Drivers.map((obj) => ({
		...obj,
		fullName: obj.givenName + ' ' + obj.familyName,
	}));

	// get driver info data
	const driverInfoData = driverInfo.MRData.DriverTable.Drivers;

	// filter api results with search term
	const filterApiResults = (val) => {
		console.log('search term', val);
		let filteredArr = driversList.filter((drivers) =>
			drivers.fullName.includes(val)
		);
		console.log('filtered arr', filteredArr);
		setFilteredArr(filteredArr);
	};

	// get driver information from id
	const getDriverInfo = (id) => {
		console.log('driver id', id);
		setDriverId(id);
	};

	return (
		<div className='f1dex'>
			<div className='f1dex__header'>
				<img src={logo} alt='Formula 1 Logo' />
			</div>
			<div className='f1dex__body'>
				<div className='f1dex__body__search'>
					<div className='f1dex__body__search__input'>
						<input
							type='search'
							id='search'
							name='search'
							placeholder='Insert text here...'
							onChange={(e) => {
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
											{driver.givenName} {driver.familyName}
										</li>
								  ))
								: driversList.map((driver) => (
										<li
											key={driver.driverId}
											className='f1dex__drivers__list__item'
											onClick={() => getDriverInfo(driver.driverId)}
										>
											{driver.givenName} {driver.familyName}
										</li>
								  ))}
						</ul>
					</div>
				</div>
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
								<p></p>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default App;
