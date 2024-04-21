import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

interface RoomDto {
    id: number;
}

function Booking() {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [roomId, setRoomId] = useState('');
    const [hotelId, setHotelId] = useState('1'); // Default hotelId to 1
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingError, setBookingError] = useState('');
    const [rooms, setRooms] = useState<RoomDto[]>([]); // State to hold room information
    const history = useNavigate();

    useEffect(() => {
        if (hotelId) { // Check if hotelId is defined
            fetch(`/api/rooms?hotelId=${hotelId}`, { // Fetch rooms based on hotelId
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
                    setRooms([]); // Reset rooms if there's an error
                    console.error('Error fetching rooms:', error);
                });
        }
    }, [hotelId]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/hotels/${hotelId}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    checkInDate: checkInDate,
                    checkOutDate: checkOutDate,
                    roomId: parseInt(roomId), // Convert roomId to a number
                }),
            });

            if (response.ok) {
                setBookingSuccess(true);
            } else {
                const errorMessage = await response.text();
                setBookingError(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            setBookingError('Something went wrong with the booking process.');
        }
    };

    useEffect(() => {
        if (bookingSuccess) {
            history('/login');
        }
    }, [history, bookingSuccess]);

    return (
        <div className="booking">
            <table>
                <thead className="bookingTHead">
                    <tr>
                        <th>Book a Room</th>
                    </tr>
                </thead>
                <tbody className="bookingTBody">
                    <tr>
                        <td>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="checkInDate">Check-In Date</label>
                                    <input
                                        type="date"
                                        id="checkInDate"
                                        value={checkInDate}
                                        onChange={(e) => setCheckInDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="checkOutDate">Check-Out Date</label>
                                    <input
                                        type="date"
                                        id="checkOutDate"
                                        value={checkOutDate}
                                        onChange={(e) => setCheckOutDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="roomId">Room ID</label>
                                    <select
                                        id="roomId"
                                        value={roomId}
                                        onChange={(e) => setRoomId(e.target.value)}
                                        required
                                    >
                                        {rooms.map((room) => (
                                            <option key={room.id} value={room.id}>
                                                Room {room.id}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="hotelId">Select Hotel</label>
                                    <select
                                        id="hotelId"
                                        value={hotelId}
                                        onChange={(e) => setHotelId(e.target.value)}
                                        required
                                    >
                                        <option value="9">Hotel 9</option>
                                        <option value="10">Hotel 10</option>
                                        <option value="11">Hotel 11</option>
                                    </select>
                                </div>
                                <div>
                                    <button className="btn rounded-pill bookingButton" type="submit">
                                        Book Now
                                    </button>
                                </div>
                                {bookingError && <p className="text-danger">{bookingError}</p>}
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Booking;
