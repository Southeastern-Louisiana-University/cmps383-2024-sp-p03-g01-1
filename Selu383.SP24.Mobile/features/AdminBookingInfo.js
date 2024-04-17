import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AdminBookingInfo = ({ navigation }) => {


  return (
    <View style={styles.container}>
        <Text style={styles.tileText}>Current Rooms Booked:</Text>
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

  tileText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AdminBookingInfo;