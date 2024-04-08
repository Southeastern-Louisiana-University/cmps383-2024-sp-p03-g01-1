import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HotelDto } from "../../Components/HotelDto";
import "./hotelindex.css";

function Hotels() {
    const [hotels, setHotels] = useState<HotelDto[]>([]);

    useEffect(() => {
        fetch("/api/hotels", {
            method: "get",
        })
            .then<HotelDto[]>((r) => r.json())
            .then((j) => {
                setHotels(j);
            });
    }, []);

    return (
        <div className="containerindex">
            <div className="rowindex">
                {hotels.map((hotel) => (
                    <div key={hotel.id} className="col-3index">
                        <div className="card card-customindex">
                            <img className="card-img-topindex" src={"hotel.image"} alt={hotel.name} />
                            <div className="card-bodyindex">
                                <h4 className="card-titleindex">{hotel.name}</h4>
                                <p className="card-text card-text-customindex">{hotel.address}</p>
                                <p className="card-text card-text-customindex">{hotel.city}</p>
                                <p className="card-text card-text-customindex">{hotel.state}</p>
                                <p className="card-text card-text-customindex">{hotel.postalcode}</p>
                                <Link to={`/hotels/details/${hotel.id}`}>
                                    <button className="btn btn-custom rounded-5index">Availability</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Hotels;
