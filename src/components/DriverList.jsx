import { useState } from 'react';
import { useFetchDrivers } from '../api/api';
import { yearList } from '../types/years';
// import { useDebounce } from '../api/useDebounce';
import Result from './Results';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

const DriverList = () => {
	const [year, setYear] = useState(2023);
	// const searchQuery = useDebounce(year, 2000);
	// let searchTerm = searchQuery[0];
	// let debounceLoading = searchQuery[1];
	// const [searchTerm, debounceLoading] = searchQuery;
	const { isLoading, isError, error, data } = useFetchDrivers(year);
	const [searchInput, setSearchInput] = useState('');
	const [filteredArr, setFilteredArr] = useState([]);
	const [driverId, setDriverId] = useState('albon');

	console.log('isError', isError);

	if (isLoading) return <LoadingSpinner />;

	if (isError) return <div>Error: {error.message}</div>;

	// TODO: fix early return issue => will fix if i decide to implement user debounce again

	// create new array from api and add new property for full name
	const drivers = data.MRData.DriverTable.Drivers.map((obj) => ({
		...obj,
		fullName: obj.givenName + ' ' + obj.familyName,
	}));

	// console.log('new driver list', drivers);

	// filter api results with search term
	const handleSearch = (val) => {
		setSearchInput(val);
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
				<input
					className='input'
					type='search'
					id='search'
					name='search'
					placeholder='Insert text here...'
					onInput={(e) => handleSearch(e.target.value)}
				/>
				<select
					name='year'
					id='year-select'
					value={year}
					onChange={(e) => setYear(Number(e.target.value))}
				>
					{yearList.map((year, index) => (
						<option key={index}>{year}</option>
					))}
				</select>
				{/* <input
					className='input'
					type='number'
					id='year'
					name='year'
					value={year}
					max='2023'
					placeholder='Insert year here...'
					onChange={(e) => setYear(e.target.valueAsNumber ?? 2023)}
				/> */}
			</div>
			<div className='f1dex__body__results'>
				<div className='f1dex__body__results__list'>
					<ul className='f1dex__drivers__list'>
						{/* TODO */}
						{/* if the user input search has results, display results from filtered list */}
						{filteredArr.length > 0 &&
							filteredArr.map((driver) => (
								<li
									key={driver.driverId}
									className='f1dex__drivers__list__item'
									onClick={() => getDriverInfo(driver.driverId)}
								>
									{driver.fullName}
								</li>
							))}{' '}
						{/* if user input search has no results, display no results */}
						{filteredArr.length === 0 && searchInput !== '' && (
							<p>No Results</p>
						)}
						{/* else, display drivers array before filtering as default */}
						{filteredArr.length === 0 &&
							searchInput == '' &&
							drivers.map((driver) => (
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
