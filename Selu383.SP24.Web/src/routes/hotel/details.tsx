import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HotelDto } from "../../Components/HotelDto";
import { Outlet } from 'react-router-dom';
import BatonRouge from "../../images/Baton Rouge.jpg";
import FQNOLA from "../../images/FQNOLA.jpg";
import SLCNOLA from "../../images/SLCNOLA.jpg";
import { RoomDto } from "../../Components/RoomDto";

import "./hotelindex.css";
export default function HotelDetails() {
	const { id } = useParams<{ id: string }>(); // Specify that id is a string
	const [hotel, setHotel] = useState<HotelDto>();
	const [rooms, setRooms] = useState<RoomDto[]>([]); // State to hold room information
	const [error, setError] = useState<Error | null>(null);
	const navigate = useNavigate();
	useEffect(() => {
		if (id) { // Check if id is defined
			fetch(`/api/hotels/${id}`, {
				method: "get",
			})
				.then<HotelDto>((r) => {
					if (!r.ok) {
						throw new Error('Network response was not ok');
					}
					return r.json();
				})
				.then((j) => {
					setHotel(j);
				})
				.catch((error: Error) => {
					setError(error);
				});
		}
	}, [id]);

	useEffect(() => {
		if (id) { // Check if id is defined
			fetch(`/api/rooms?hotelId=${id}`, { // Fetch rooms based on hotelId
				method: "get",
			})
				.then<RoomDto[]>((r) => {
					if (!r.ok) {
						throw new Error('Network response was not ok');
					}
					return r.json();
				})
				.then((j) => {
					setRooms(j);
				})
				.catch((error: Error) => {
					setError(error);
				});
		}
	}, [id]);

	if (error) {
		return <div>Error: {error.message}</div>;
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
			{hotel && (
				<div className="container">
					<h2 style={{ color: 'white' }}>{hotel.name}</h2>
					<p style={{ color: 'white' }}>{hotel.address}</p>
					<p style={{ color: 'white' }}>{hotel.city}, {hotel.state}, {hotel.postalCode}</p>
					<div className="row">
						<div className="image-container">
							<img src={cityImageMap[hotel.name]} alt="Big Image" />
						</div>
						<div className="containerindex">
								<div className="rowindex"> 
								{rooms.slice(0, 3).map((room, index) => (
									<div className="card card-customindex">
											<div className="col-3index" key={index}>
												<div className="card-bodyindex">
													<h3 className="card-titleindex">Room {index + 1}</h3>
													<p className="card-text card-text-customindex">Type: {room.type}</p>
													<p className="card-text card-text-customindex">Capacity: {room.capacity}</p>
													<p className="card-text card-text-customindex">Amenities: {room.amenities.join(', ')}</p>
													<p className="card-text card-text-customindex">Price: {room.price}</p>
													<p className="card-text card-text-customindex">Available: {room.available ? 'Yes' : 'No'}</p>
													<button onClick={() => handleButtonClick(hotel.id)} className="btn btn-custom rounded-pill rounded-5index">Book Now</button>
												</div>
											</div>
									</div>
								))}
						</div> 
					</div>
				</div>
					<br />
					<Outlet />
				</div>
			)}
		</>
	);
}