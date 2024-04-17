import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const AdminBookingInfo = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://selu383-sp24-p03-g01.azurewebsites.net/api/bookings');
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {bookings.length === 0 ? (
        <Text style={styles.noBookingsText}>No bookings available</Text>
      ) : (
        <FlatList
          data={bookings}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>Booking ID: {item.id}</Text>
              <Text style={styles.itemText}>Hotel ID: {item.hotelId}</Text>
              <Text style={styles.itemText}>Check-In Date: {item.checkInDate}</Text>
              <Text style={styles.itemText}>Check-Out Date: {item.checkOutDate}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()} // Use index as key if item.id is undefined
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#555',
  },
  noBookingsText: {
    fontSize: 18,
    color: '#555',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AdminBookingInfo;
