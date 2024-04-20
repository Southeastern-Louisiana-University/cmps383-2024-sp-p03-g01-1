import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, checkInDate, checkOutDate } from 'react-native';
import { Snackbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

function BookingScreen({ route }) {
	const { hotel } = route.params;
	const [customerName, setCustomerName] = useState('');
	const [customerEmail, setCustomerEmail] = useState('');
	const [showSnackbar, setShowSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [checkInDate, setCheckInDate] = useState('');
	const [checkOutDate, setCheckOutDate] = useState('');
	const [showCheckInDatePicker, setShowCheckInDatePicker] = useState(false);
	const [showCheckOutDatePicker, setShowCheckOutDatePicker] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState(null); 
	const [availableRooms, setAvailableRooms] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Fetch available rooms for the selected hotel from your backend API
		fetchRooms(hotel.id); // You need to implement this function
	}, [hotel.id]);

	// const fetchAvailableRooms = async (hotelId) => {
	//   try {
	//     // Make an API call to fetch available rooms for the selected hotel
	//     const response = await fetch(`https://selu383-sp24-p03-g01.azurewebsites.net/api/rooms`);
	//     const data = await response.json();
	//     setAvailableRooms(data.rooms); // Assuming data.rooms contains the list of available rooms
	//   } catch (error) {
	//     console.error('Error fetching available rooms:', error);
	//   }
	// };

	// const fetchRooms = async (hotelId) => {
	//   try {
	//     const response = await axios.get(`https://selu383-sp24-p03-g01.azurewebsites.net/api/room`);
	//     console.log('Response data:', response.data); // Log the response data
	//     setAvailableRooms(response.data);
	//     setError(null); // Clear error on successful fetch
	//   } catch (error) {
	//     console.error('Error fetching rooms:', error);
	//     setError('Failed to fetch rooms. Please try again.'); // Set custom error message
	//   }
	// };

	const fetchRooms = async () => {
		try {
			const response = await axios.get('https://selu383-sp24-p03-g01.azurewebsites.net/api/rooms');
			console.log('Response data:', response.data);
			setAvailableRooms(response.data);
			setError(null); // Clear error on successful fetch
		} catch (error) {
			console.error('Error fetching hotels:', error);
			setError('Failed to fetch hotels. Please try again.'); // Set custom error message
		}
	};


	const handleRoomSelection = (room) => {
		// Update the selected room state when a room is selected
		setSelectedRoom(room);
	};

	const handleBookRoom = () => {
		if (!selectedRoom) {
			setSnackbarMessage('Please select a room');
			setShowSnackbar(true);
			return;
		}
		if (customerName.trim() === '' || customerEmail.trim() === '') {
			setSnackbarMessage('Please fill in all fields');
			setShowSnackbar(true);
			return;
		}


		console.log('Booking Details:', {
			hotel: hotel,
			room: selectedRoom,
			//dates: selectedDates,
			//customer: { name: customerName, email: customerEmail }
		});
		// Reset form fields after booking
		setCustomerName('');
		setCustomerEmail('');
		setSnackbarMessage('Room booked successfully');
		setShowSnackbar(true);
		return;
	}

	console.log('Booking Details:', {
		hotel: hotel,
		//dates: selectedDates,
		customer: { name: customerName, email: customerEmail }
	});
		// Reset form fields after booking
		setCustomerName('');
		setCustomerEmail('');
		setSnackbarMessage('Room booked successfully');
		setShowSnackbar(true);
  };

  const handleCheckInDateSelection = () => {
    setShowCheckInDatePicker(true);
  };
  
  const handleCheckOutDateSelection = () => {
    setShowCheckOutDatePicker(true);
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Text style={style.hotelName}>{hotel.name}</Text>
      <Text style={style.description}>{hotel.description}</Text>
      <TextInput
        style={style.input}
        label="Name"
        value={customerName}
        onChangeText={setCustomerName}
        placeholder="Enter your name"
        placeholderTextColor="#888" 
      />
      <TextInput
        style={style.input}
        label="Email"
        value={customerEmail}
        onChangeText={setCustomerEmail}
        keyboardType="email-address"
        placeholder="Enter your email"
        placeholderTextColor="#888"
      />
      <View style={style.dateContainer}>
      <TouchableOpacity onPress={handleCheckInDateSelection}>
          <Text style={style.dateLabel}>Check-in Date:</Text>
          <Text style={style.dateText}>{checkInDate ? new Date(checkInDate).toLocaleDateString() : 'Select Date'}</Text>
      </TouchableOpacity>

        {showCheckInDatePicker && (
          <DateTimePicker
            style={{ width: 200 }}
            value={checkInDate ? new Date(checkInDate) : new Date()} // Pass a JavaScript Date object
            mode="date"
            display="spinner" 
            onChange={(event, date) => {
              if (date) {
                setCheckInDate(date);
                setShowCheckInDatePicker(false);
              }
            }} // Use onChange event to update the state
          />
        )}


        <TouchableOpacity onPress={handleCheckOutDateSelection}>
          <Text style={style.dateLabel}>Check-out Date:</Text>
          <Text style={style.dateText}>{checkOutDate ? new Date(checkOutDate).toLocaleDateString() : 'Select Date'}</Text>
        </TouchableOpacity>

        {showCheckOutDatePicker && (
          <DateTimePicker
            style={{ width: 200 }}
            value={checkOutDate ? new Date(checkOutDate) : new Date()}
            mode="date"
            display="spinner" 
            onChange={(event, date) => {
              if (date) {
                setCheckOutDate(date);
                setShowCheckOutDatePicker(false);
              }
            }}
          />
        )}
      </View>
      <Button title="Book Room" onPress={handleBookRoom} />
      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  hotelName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    paddingHorizontal: 10, 
    backgroundColor: '#fff', 
    borderRadius: 5, 
    borderWidth: 1, 
    borderColor: '#ccc', 
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
  },
});

  export default BookingScreen;
