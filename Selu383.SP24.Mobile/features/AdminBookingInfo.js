import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const AdminBookingInfo = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState('Baton Rouge');

  useEffect(() => {
    fetchBookings(selectedHotel);
  }, [selectedHotel]);

  const fetchBookings = async (hotel) => {
    try {
      let endpoint = '';
      if (hotel === 'Baton Rouge') {
        endpoint = 'https://selu383-sp24-p03-g01.azurewebsites.net/api/hotels/9/bookings';
      } else if (hotel === 'French Quarter') {
        endpoint = 'https://selu383-sp24-p03-g01.azurewebsites.net/api/hotels/10/bookings';
      } else if (hotel === 'Jackson Square') {
        endpoint = 'https://selu383-sp24-p03-g01.azurewebsites.net/api/hotels/11/bookings';
      }

      const response = await axios.get(endpoint);
      setBookings(response.data);
      //console.log(bookings);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const getHotelName = (hotelId) => {
    switch (hotelId) {
      case 9:
        return 'Baton Rouge';
      case 10:
        return 'French Quarter';
      case 11:
        return 'Jackson Square';
      default:
        return '';
    }
  };

  const renderDropdownItem = (item) => (
    <TouchableOpacity
      style={[styles.dropdownItem, { backgroundColor: selectedHotel === item ? '#ccc' : '#fff' }]}
      onPress={() => setSelectedHotel(item)}
    >
      <Text style={styles.dropdownItemText}>{item}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Select Hotel:</Text>
        <View style={styles.dropdown}>
          {renderDropdownItem('Baton Rouge')}
          {renderDropdownItem('French Quarter')}
          {renderDropdownItem('Jackson Square')}
        </View>
      </View>
      {bookings.length === 0 ? (
        <Text style={styles.noBookingsText}>No bookings available</Text>
      ) : (
        <FlatList
          data={bookings}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>Booking ID: {item.id}</Text>
              <Text style={styles.itemText}>User: {item.userId}</Text>

              <Text style={styles.itemText}>Hotel: {getHotelName(item.hotelId)}</Text>
              <Text style={styles.itemText}>Check-In Date: {item.checkInDate}</Text>
              <Text style={styles.itemText}>Check-Out Date: {item.checkOutDate}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
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
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 18,
    marginBottom: 5,
    color: '#555',
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 10,
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: '#fff',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
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
    color: '#333',
  },
});

export default AdminBookingInfo;
