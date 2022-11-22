import './ButtonGroup.scss';

const ButtonGroup = ({ getType }) => {
	return (
		<div className='f1dex__buttons'>
			<button
				onClick={() => {
					getType('constructors');
				}}
			>
				View Constructors
			</button>
			<button
				onClick={() => {
					getType('drivers');
				}}
			>
				View Drivers
			</button>
		</div>
	);
};

export default ButtonGroup;
