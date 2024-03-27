import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HotelDto } from "../../Components/HotelDto";
import { Outlet } from 'react-router-dom';

export default function HotelDetails() {
    const { id } = useParams();
    const [hotel, setHotel] = useState<HotelDto>();

    useEffect(() => {
        fetch(`/api/hotels/${id}`, {
            method: "get",
        })
            .then<HotelDto>((r) => r.json())
            .then((j) => {
                setHotel(j);
            });
    }, [id]); // Dependency array with 'id'

    return (
        <>
            {hotel && (

                <div className="container">
                    <h2 style={{ color: 'white' }}>{hotel.name}</h2>
                    <p style={{ color: 'white' }}>{hotel.address}</p>
                    {/* Render other details of the hotel */}
                    <div className="row">
                        <div className="image-container">
                            <img src="big_image.jpg" alt="Big Image" />
                        </div>
                        <div className="cards-container">
                            <div className="card">
                                <h2>Card 1</h2>
                                <textarea placeholder="Enter information for Card 1..." />
                            </div>
                            <div className="card">
                                <h2>Card 2</h2>
                                <textarea placeholder="Enter information for Card 2..." />
                            </div>
                            <div className="card">
                                <h2>Card 3</h2>
                                <textarea placeholder="Enter information for Card 3..." />
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
