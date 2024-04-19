export interface RoomDto {
    id: number;
    type: string;
    capacity: number;
    amenities: string[];
    price: number;
    available: boolean;
    hotelId: number;
}