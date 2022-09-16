const Result = (data) => {
	console.log('original data', data);
	console.log('data', data.data);
	return (
		<div className='f1dex__body__results'>
			{data.data.length > 0 &&
				data.data.map((driver) => (
					<div key={driver.driverId}>
						<h1>
							{driver.givenName} {driver.familyName}
						</h1>
						<p>Code: {driver.code}</p>
						<p>Nationality: {driver.nationality}</p>
						<p>Number: {driver.permanentNumber}</p>
					</div>
				))}
		</div>
	);
};

export default Result;
