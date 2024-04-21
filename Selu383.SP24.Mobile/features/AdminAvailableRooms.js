import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AdminAvailableRooms = ({ navigation }) => {


  return (
    <View style={styles.container}>
        <Text style={styles.tileText}>These are currently available rooms: </Text>
        <Text>Currently Available Rooms:</Text>
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

export default AdminAvailableRooms;