import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, checkInDate, checkOutDate } from 'react-native';
import { Snackbar, Avatar, Card, IconButton, Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useAuth } from './AuthContext';

function BookingScreen({ route }) {
    const { hotel } = route.params;
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [showCheckInDatePicker, setShowCheckInDatePicker] = useState(false);
    const [showCheckOutDatePicker, setShowCheckOutDatePicker] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null); 
    const [availableRooms, setAvailableRooms] = useState([]);
    const [error, setError] = useState(null);
    //const [checked, setChecked] = useState(false);
    const { hotelId } = route.params;
    const { user } = useAuth();

    useEffect(() => {
      fetchRooms(hotel.id); 
      //console.log(hotelId)
    }, [hotel.id]);

    const fetchRooms = async (hotelId) => {
      console.log('Fetching rooms for hotelId:', hotelId); 
      try {
        const response = await axios.get(`https://selu383-sp24-p03-g01.azurewebsites.net/api/rooms?hotelId=${hotelId}`);
        console.log('Response data:', response.data);
        const filteredRooms = response.data.filter(room => room.hotelId === hotelId);
        filteredRooms.forEach(room => {
          console.log('Room Id:', room.id);
        });        
        setAvailableRooms(filteredRooms);        
        setError(null); 
        console.log('Available rooms:', availableRooms); 

      } catch (error) {
        console.error('Error fetching hotels:', error);
        setError('Failed to fetch hotels. Please try again.'); 
      }
    };

    

    const handleRoomSelection = (room) => {
      if (selectedRoom && selectedRoom.id === room.id) {
          setSelectedRoom(null);
      } else {
          setSelectedRoom(room);
      }
      console.log('Selected Room:', room); // Log the current room being processed, not the state
    };

    // const handleRoomSelection = (room) => {
    //   room.checked = !room.checked;
    //   if (selectedRoom === room) {
    //     setSelectedRoom(null);
    //     setChecked(false); 
    //   } else {
    //     setSelectedRoom(room); 
    //     setChecked(true); 
    //   }
    //   console.log('Selected Room:', selectedRoom);

    // };

    const handleBookRoom = async () => {
      if (!selectedRoom) {
        setSnackbarMessage('Please select a room');
        setShowSnackbar(true);
        return;
      }
      if (!checkInDate || !checkOutDate) {
        setSnackbarMessage('Please select check-in and check-out dates');
        setShowSnackbar(true);
        return;
      }
      try {
        if (!user) {
          throw new Error('User is not logged in');
        }
        const selectedRoomId = selectedRoom.id;
        if (!selectedRoom.id) {
          console.error('Selected room has no ID:', selectedRoom);
          return;
        }
        console.log('Selected Room ID:', selectedRoomId);
        //console.log('Hotel ID:', hotel.id);
        const bookingData = {
          hotelId: hotel.id,
          roomId: selectedRoom.id,
          userId: user.id,
          checkInDate: checkInDate.toISOString(), 
          checkOutDate: checkOutDate.toISOString(),
        };
      
      console.log(bookingData)

      const response = await axios.post(`https://selu383-sp24-p03-g01.azurewebsites.net/api/hotels/${hotel.id}/bookings`, bookingData);

      console.log('Booking successful:', response.data);
      //console.log('Booking Room:', selectedRoom.id);
      //console.log('Booking info:', response.data);

      setSnackbarMessage('Room booked successfully');
      setShowSnackbar(true);

 
      setCheckInDate('');
      setCheckOutDate('');
      setSelectedRoom(null);
  
    } catch (error) {
      console.error('Error booking room:', error);
      setSnackbarMessage('Failed to book room. Please try again.');
      setShowSnackbar(true);
    }
    };
  
    const handleCheckInDateSelection = () => {
      setShowCheckInDatePicker(true);
    };
    
    const handleCheckOutDateSelection = () => {
      setShowCheckOutDatePicker(true);
    };


    return (
      <ScrollView contentContainerStyle={style.container}>
        
        {availableRooms.map(room => (
          <TouchableOpacity key={room.id} onPress={() => handleRoomSelection(room)}>

            <Card>
            <Card.Title
              title={room.type}
              left={(props) =>     
                <Avatar.Icon
                  {...props}
                  icon={
                  selectedRoom === room
                    ? `bed-${room.type.toLowerCase()}`
                    : `bed-${room.type.toLowerCase()}-outline`
                }
              />}
              right={(props) =>     
              <Checkbox
                //status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  handleRoomSelection(room);
                }}
              />}
            /> 
              <Card.Title
                title={room.type}
                subtitle={`Price: $${room.price}`}
              />
              <Card.Content>
                <Text>Description: {room.description}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}


        <Text style={style.hotelName}>{hotel.name}</Text>
        <Text style={style.description}>{hotel.description}</Text>

        <View style={style.dateContainer}>
        <TouchableOpacity onPress={handleCheckInDateSelection}>
            <Text style={style.dateLabel}>Check-in Date:</Text>
            <Text style={style.dateText}>{checkInDate ? new Date(checkInDate).toLocaleDateString() : 'Select Date'}</Text>
        </TouchableOpacity>

          {showCheckInDatePicker && (


          <DateTimePicker
            style={{ width: 200 }}
            value={checkInDate ? new Date(checkInDate) : new Date()} 
            mode="date"
            display="spinner" 
            onChange={(event, date) => {
              if (date) {
                setCheckInDate(date);
                setShowCheckInDatePicker(false);
              }
            }} 
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
        marginTop: 20,
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


