import { useState } from 'react';
import { useFetch } from './api/useFetch';
import logo from './assets/logo-new.png';
import './App.scss';

function App() {
	// destructure returned state from useFetch which includes data & loading
	const { data, loading } = useFetch(
		`http://ergast.com/api/f1/2022/drivers.json`
	);
	// we use useState as the view needs to re-render everytime the search term changes
	const [filteredArr, setFilteredArr] = useState([]);

	// filter api results with search term
	const filterApiResults = (val) => {
		let filteredArr = data.filter((drivers) => drivers.fullName.includes(val));
		setFilteredArr(filteredArr);
	};

	if (loading === true) return <div>Loading...</div>;
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
								? filteredArr.map((drivers) => (
										<li
											key={drivers.driverId}
											className='f1dex__drivers__list__item'
										>
											{drivers.givenName} {drivers.familyName}
										</li>
								  ))
								: data.map((drivers) => (
										<li
											key={drivers.driverId}
											className='f1dex__drivers__list__item'
										>
											{drivers.givenName} {drivers.familyName}
										</li>
								  ))}
						</ul>
					</div>
				</div>
				{/* <div className='f1dex__body__results'>
					<p>display api results here</p>
				</div> */}
			</div>
		</div>
	);
}

export default App;
