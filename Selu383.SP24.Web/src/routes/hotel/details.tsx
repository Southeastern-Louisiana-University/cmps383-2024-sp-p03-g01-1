import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HotelDto } from "../../Components/HotelDto";
import { Outlet } from 'react-router-dom';
import BatonRouge from "../../images/Baton Rouge.jpg";
import FQNOLA from "../../images/FQNOLA.jpg";
import SLCNOLA from "../../images/SLCNOLA.jpg";

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState<HotelDto>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`/api/hotels/${id}`, {
      method: "get",
    })
      .then<HotelDto>((r) => {
        if (!r.ok){
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
  }, [id]); // Dependency array with 'id'

  if (error) {
    return <div>Error: {error.message}</div>
  }

  //Map city names to image paths
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
          {/* Render other details of the hotel */}
          <div className="row">
            <div className="image-container">
              <img src={cityImageMap[hotel.name]} alt="Big Image" />
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
