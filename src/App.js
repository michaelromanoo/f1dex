import { useFetch } from './api/useFetch';
import logo from './assets/logo-new.png';
import Body from './components/Body';

import './App.scss';

function App() {
	// fetch data list of all drivers in 2022 season
	const { data, loading } = useFetch(
		`http://ergast.com/api/f1/2022/drivers.json`
	);

	if (loading) return <div>Loading...</div>;

	// create new array and add new property for full name
	const driversList = data.MRData.DriverTable.Drivers.map((obj) => ({
		...obj,
		fullName: obj.givenName + ' ' + obj.familyName,
	}));

	return (
		<div className='f1dex'>
			<div className='f1dex__header'>
				<img src={logo} alt='Formula 1 Logo' />
			</div>
			<div className='f1dex__body'>
				<Body data={driversList} />
			</div>
		</div>
	);
}

export default App;
