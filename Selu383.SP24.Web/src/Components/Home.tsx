import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HotelDto } from '../Components/HotelDto';
import "../App.css"
import BatonRouge from '../images/Baton Rouge.jpg';
import FQNOLA from '../images/FQNOLA.jpg';
import SLCNOLA from '../images/SLCNOLA.jpg';

function Home() {
  const [hotels, setHotels] = useState<HotelDto[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/hotels", {
      method: "get",
    })
      .then<HotelDto[]>((r) =>{
        if (!r.ok){
          throw new Error('Network response was not ok');
        }
        return r.json();
        })
        .then((j) => {
          setHotels(j);
        })
        .catch((error: Error) => {
          setError(error);
        });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const cityImageMap: Record<string, string> = {
    "Baton Rouge": BatonRouge,
    "French Quarter": FQNOLA,
    "Jackson Square": SLCNOLA
  };

  const handleButtonClick = (hotelId: number) => {
        navigate(`/hotels/details/${hotelId}`);
  };
    
  return (
		<>
			<div className="containerindex">
				<div className="rowindex">
					{hotels.map((hotel) => (
						<div key={hotel.id} className="col-3index">
							<div className="card card-customindex">
								<img className="card-img-topindex" src={cityImageMap[hotel.name]} alt={hotel.name} />
								<div className="card-bodyindex">
									<h4 className="card-titleindex">{hotel.name}</h4>
									<p className="card-text card-text-customindex">{hotel.address}</p>
									<p className="card-text card-text-customindex">{hotel.city}, {hotel.state}, {hotel.postalCode}</p>
									<button onClick={() => handleButtonClick(hotel.id)} className="btn btn-custom rounded-pill rounded-5index">Availability</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<Outlet />
		</>
	);
}

export default Home;
