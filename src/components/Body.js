import DriverList from './DriverList';
import ConstructorsList from './ConstructorsList';

const Body = ({ listType }) => {
	switch (listType) {
		case 'drivers':
			return <DriverList />;
		case 'constructors':
			return <ConstructorsList />;
		default:
			return <DriverList />;
	}
};

export default Body;
