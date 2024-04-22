import { useState, FormEvent, useEffect } from 'react';
import './login.css'; // Assuming booking.css is the name of your CSS file

interface RoomDto {
    id: number;
    hotelId: number; // Add hotelId to RoomDto
    type: string; // Add roomType to RoomDto
}

function Booking() {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [roomId, setRoomId] = useState('');
    const [hotelId] = useState('11'); // Default hotelId to 11 for hotel 11
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingError, setBookingError] = useState('');
    const [rooms, setRooms] = useState<RoomDto[]>([]); // State to hold room information

    useEffect(() => {
        if (hotelId === '11') { // Fetch rooms only if hotelId is 11
            fetch(`/api/rooms?hotelId=${hotelId}`, {
                method: "get",
            })
                .then<RoomDto[]>((r) => {
                    if (!r.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return r.json();
                })
                .then((j) => {
                    // Filter rooms based on hotelId
                    const filteredRooms = j.filter(room => room.hotelId === 11);
                    setRooms(filteredRooms);
                })
                .catch((error: Error) => {
                    setRooms([]); // Reset rooms if there's an error
                    console.error('Error fetching rooms:', error);
                });
        } else {
            // Reset rooms if hotelId is not 11
            setRooms([]);
        }
    }, [hotelId]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/hotels/${hotelId}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dto: {}, // Include dto field as required by the server
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
            // No need to navigate, just set bookingSuccess to true
            // history('/login');
        }
    }, [bookingSuccess]);

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
                            {!bookingSuccess ? ( // Display the form if booking is not successful
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
                                                    Room {room.id} - {room.type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <button className="btn rounded-pill bookingButton" type="submit">
                                            Book Now
                                        </button>
                                    </div>
                                    {bookingError && <p className="text-danger">{bookingError}</p>}
                                </form>
                            ) : ( // Display thank you message if booking is successful
                                <div className="thank-you-message">
                                    <p>Thanks for choosing EnStay, we hope you enjoy your stay!</p>
                                </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Booking;
