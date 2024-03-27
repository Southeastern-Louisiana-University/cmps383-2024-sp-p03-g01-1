import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

function DetailsScreen({ route }) {
  const navigation = useNavigation(); // Get navigation object using useNavigation hook
  const { hotel } = route.params;

  const handleBookNow = () => {
    navigation.navigate('Booking', { hotel });
  };

  return (
    <View style={style.container}>
      <Text>{hotel.name}</Text>
      <Text>{hotel.description}</Text>
      <Button mode="contained" onPress={handleBookNow}>Book Now</Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailsScreen;
