import { useState } from 'react';
import { useFetchConstructors } from '../api/api';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import ConstructorsResult from './ConstructorResult';

const ConstructorsList = () => {
	const { isLoading, isError, data, error } = useFetchConstructors();
	const [filteredArr, setFilteredArr] = useState([]);
	const [constructorId, setConstructorId] = useState('alfa');

	if (isLoading) return <LoadingSpinner />;
	if (isError) return <div>Error: {error.message}</div>;

	const constructors = data.MRData.ConstructorTable.Constructors;

	// TODO: convert into a custom hook => return loading & data
	// filter api results with search term
	const filterApiResults = (val) => {
		let filteredArr = constructors.filter((constructor) =>
			constructor.name.includes(val)
		);
		console.log('filtered arr', filteredArr);
		return setFilteredArr(filteredArr);
	};

	const getConstructorInfo = (id) => {
		return setConstructorId(id);
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
						onChange={(e) => filterApiResults(e.target.value)}
					/>
				</div>
				<div className='f1dex__body__search__results'>
					<ul className='f1dex__drivers__list'>
						{filteredArr.length > 0
							? filteredArr.map((constructor) => (
									<li
										key={constructor.constructorId}
										className='f1dex__drivers__list__item'
										onClick={() =>
											getConstructorInfo(constructor.constructorId)
										}
									>
										{constructor.name}
									</li>
							  ))
							: constructors.map((constructor) => (
									<li
										key={constructor.constructorId}
										className='f1dex__drivers__list__item'
										onClick={() =>
											getConstructorInfo(constructor.constructorId)
										}
									>
										<p>{constructor.name}</p>
									</li>
							  ))}
					</ul>
				</div>
			</div>
			<ConstructorsResult id={constructorId} />
		</>
	);
};

export default ConstructorsList;
