import { useFetchConstructorsInfo } from '../api/api';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import '../App.scss';

const ConstructorResult = ({ id }) => {
	const { isLoading, isError, data, error } = useFetchConstructorsInfo(id);

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
