export interface BookingDto {
    id: number;
    hotelId: number;
    userId: number;
    roomId: number;
    checkInDate: Date;
    checkOutDate: Date;
}
