import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, checkInDate, checkOutDate } from 'react-native';
import { Snackbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

function BookingScreen({ route }) {
    const { hotel } = route.params;
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    const handleBookRoom = () => {
      if (customerName.trim() === '' || customerEmail.trim() === '') {
        setSnackbarMessage('Please fill in all fields');
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
          <TouchableOpacity onPress={() => console.log('Open calendar for check-in date')}>
            <Text style={style.dateLabel}>Check-in Date:</Text>
            <Text style={style.dateText}>{checkInDate ? new Date(checkInDate).toLocaleDateString() : 'Select Date'}</Text>

          <DateTimePicker
            style={{ width: 200 }}
            value={checkInDate ? new Date(checkInDate) : new Date()} // Pass a JavaScript Date object
            mode="date"
            display="spinner" 
            onChange={(event, date) => setCheckInDate(date)} // Use onChange event to update the state
          />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Open calendar for check-out date')}>
            <Text style={style.dateLabel}>Check-out Date:</Text>
            <Text style={style.dateText}>{checkOutDate ? new Date(checkOutDate).toLocaleDateString() : 'Select Date'}</Text>

          </TouchableOpacity>
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
