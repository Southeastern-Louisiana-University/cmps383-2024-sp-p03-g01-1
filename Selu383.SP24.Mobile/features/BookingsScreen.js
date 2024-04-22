import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 


const BookingsScreen = ({route}) => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { hotel } = route.params;

    useEffect(() => {
        if (!hotel) {
          console.error("Hotel data is not available.");
          // Handle the error scenario, maybe navigate back or show an error message
        } else {
          // Proceed with fetching bookings or other operations with the hotel data
          fetchBookings(hotel.id);
        }
      }, [hotel]);

    const fetchBookings = async (hotelId) => {
        console.log('Fetching bookings for hotelId:', hotelId);
        try {
            const response = await axios.get(`https://selu383-sp24-p03-g01.azurewebsites.net/api/hotel/${hotelId}/bookings`);
            console.log('Response data:', response.data);
            const userBookings = response.data.filter(booking => booking.userId === user.userId);
            setBookings(userBookings);
            setError(null);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setError('Failed to fetch bookings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <Title>
                Welcome, {user.userName}!
            </Title>
        <Text>Your Bookings:</Text>
        {/* Display bookings here */}
        </View>
    );
}

export default BookingsScreen;