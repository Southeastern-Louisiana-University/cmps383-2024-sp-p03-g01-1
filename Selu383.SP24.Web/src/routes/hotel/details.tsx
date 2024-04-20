import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HotelDto } from "../../Components/HotelDto";
import { Outlet } from 'react-router-dom';
import BatonRouge from "../../images/Baton Rouge.jpg";
import FQNOLA from "../../images/FQNOLA.jpg";
import SLCNOLA from "../../images/SLCNOLA.jpg";
import { RoomDto } from "../../Components/RoomDto";

export default function HotelDetails() {
    const { id } = useParams<{ id: string }>(); // Specify that id is a string
    const [hotel, setHotel] = useState<HotelDto>();
    const [rooms, setRooms] = useState<RoomDto[]>([]); // State to hold room information
    const [error, setError] = useState<Error | null>(null);

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

    return (
        <>
            {hotel && (
                <div className="container">
                    <h2 style={{ color: 'white' }}>{hotel.name}</h2>
                    <p style={{ color: 'white' }}>{hotel.address}</p>
                    <p style={{ color: 'white' }}>{hotel.city}, {hotel.state}, {hotel.postalCode}</p>
                    <div className="row">
                        <div className="image-container">
                            <img src={cityImageMap[hotel.city]} alt="Big Image" />
                        </div>
                        <div className="cards-container">
                            {rooms.map((room, index) => ( // Map through filtered rooms and display card for each room
                                <div className="card" key={index}>
                                    <h2>Room {index + 1}</h2>
                                    <h3>Type: {room.type}</h3>
                                    <h3>Capacity: {room.capacity}</h3>
                                    <h3>Amenities: {room.amenities.join(', ')}</h3>
                                    <h3>Price: {room.price}</h3>
                                    <h3>Available: {room.available ? 'Yes' : 'No'}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    <br />
                    <Outlet />
                </div>
            )}
        </>
    );
}
