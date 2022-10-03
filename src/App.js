import { useState } from 'react';
import logo from './assets/logo-new.png';
import Body from './components/Body';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';
import wheel from './assets/new_wheel_final.png';
import './App.scss';

function App() {
	const [type, setType] = useState('drivers');

	// get type from button child
	const getType = (str) => {
		setType(str);
	};

	return (
		<div className='f1dex'>
			<div className='f1dex__header'>
				<img src={logo} alt='Formula 1 Logo' />
			</div>
			<div>
				<ButtonGroup getType={getType} />
			</div>
			<div className='f1dex__wheel'>
				<img src={wheel} alt='wheel' />
			</div>
			<div className='f1dex__body'>
				<Body listType={type} />
			</div>
		</div>
	);
}

export default App;
