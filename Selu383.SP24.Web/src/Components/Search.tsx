// Search.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import SearchDates from './SearchDates';
import Location from './Location';

function SearchBar() {
	const navigate = useNavigate();
	const [selectedLocation, setSelectedLocation] = useState<string>('');
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const handleSearch = () => {
		if (!selectedLocation || !startDate || !endDate) {
			console.log("Please select location and dates.");
			return;
		}
		// Perform the desired action here, e.g., navigate to a search results page with query parameters
		navigate(`/hotels/index`);
	};

	const handleLocationChange = (location: string) => {
		setSelectedLocation(location);
		console.log('Selected location:', location);
	};

	const handleStartDateChange = (date: Date | null) => {
		setStartDate(date);
	};

	const handleEndDateChange = (date: Date | null) => {
		setEndDate(date);
	};

	return (
		<div className="search-bar-container">
			<nav className="navbar rounded-pill searchbar-custom">
				<div className="row row-custom">
					<div className="col col-custom" style={{ paddingLeft: "12px" }}>
						<Location onLocationChange={handleLocationChange} />
					</div>
					<div className="col col-custom" style={{ paddingLeft: "12px" }}>
						<SearchDates
							onStartDateChange={handleStartDateChange}
							onEndDateChange={handleEndDateChange}
						/>
					</div>
					<div className="col col-custom">
						<button onClick={handleSearch} className="btn rounded-pill search-btn-custom">Search</button>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default SearchBar;