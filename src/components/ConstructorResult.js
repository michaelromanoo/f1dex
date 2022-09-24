import { useFetch } from '../api/useFetch';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import '../App.scss';

const ConstructorResult = ({ id }) => {
	// fetch constructor info by constructor id
	const { data, loading } = useFetch(
		`http://ergast.com/api/f1/constructors/${id}.json`
	);

	if (loading) return <LoadingSpinner />;

	const constructorInfoData = data.ConstructorTable.Constructors;

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
