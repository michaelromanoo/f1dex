import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import '../App.scss';

const ConstructorResult = ({ id }) => {
	// fetch constructor info by constructor id
	// const { data, loading } = useFetch(
	// 	`http://ergast.com/api/f1/constructors/${id}.json`
	// );

	const fetchConstructors = async () => {
		const res = await fetch(`http://ergast.com/api/f1/constructors/${id}.json`);
		return res.json();
	};

	const { isLoading, isError, data, error } = useQuery(
		['constructorsInfo'],
		fetchConstructors
	);

	if (isLoading) return <LoadingSpinner />;

	if (isError) return <div>Error {error.message}</div>;

	const constructorInfoData = data.MRData.ConstructorTable.Constructors;

	return (
		<div className='f1dex__body__results'>
			{constructorInfoData.length > 0 &&
				constructorInfoData.map((constructor) => (
					<div key={constructor.constructorId}>
						<h1>{constructor.name}</h1>
						<p>Nationality: {constructor.nationality}</p>
					</div>
				))}
		</div>
	);
};

export default ConstructorResult;
