import { useState } from 'react';
import logo from './assets/logo-new.png';
import Body from './components/Body';
import ButtonGroup from './components/ButtonGroup';
import './App.scss';

function App() {
	const [type, setType] = useState('drivers');

	const getType = (str) => {
		console.log('type', str);
		setType(str);
	};

	return (
		<div className='f1dex'>
			<div className='f1dex__header'>
				<img src={logo} alt='Formula 1 Logo' />
			</div>
			<ButtonGroup getType={getType} />
			<div className='f1dex__body'>
				<Body listType={type} />
			</div>
		</div>
	);
}

export default App;
