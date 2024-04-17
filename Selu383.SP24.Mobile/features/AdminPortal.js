import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AdminPortalPage = ({ navigation }) => {
  const handleBookingInformationPress = () => {
    navigation.navigate('BookingInformation');
  };

  const handleAvailableRoomsPress = () => {
    navigation.navigate('AvailableRooms');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tile}
        onPress={handleBookingInformationPress}
      >
        <Text style={styles.tileText}>Booking Information</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tile}
        onPress={handleAvailableRoomsPress}
      >
        <Text style={styles.tileText}>Currently Available Rooms</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tile: {
    width: '80%',
    height: 100,
    backgroundColor: '#22D3EE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 5,
  },
  tileText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AdminPortalPage;
