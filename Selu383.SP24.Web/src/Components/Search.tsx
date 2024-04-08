import '../App.css'
import SearchDates from './SearchDates';
import Location from './Location';


function SearchBar() {
    const handleLocationChange = (location: string) => {
			console.log('Selected location:', location);
    }; 

    return(
			<div className="search-bar-container">
				<nav className="navbar rounded-pill searchbar-custom">
					<div className="row row-custom">
						<div className="col col-custom" style={{paddingLeft: "12px"}}>
							<Location onLocationChange={handleLocationChange} />
						</div>
						<div className="col col-custom" style={{paddingLeft: "12px"}}>
							<SearchDates />
						</div>
						<div className="col col-custom">
							<button className="btn rounded-pill search-btn-custom">Search</button>
						</div>
					</div>
				</nav>
			</div>
			
		);
}
export default SearchBar;

