const ButtonGroup = ({ getType }) => {
	return (
		<div>
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
