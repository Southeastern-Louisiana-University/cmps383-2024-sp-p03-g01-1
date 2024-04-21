import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from './AuthContext';
import { Card, Avatar } from 'react-native-paper';
import seededHotels from './seededHotels';
import FQNOLA from '../images/FQNOLA.jpg';
import SLCNOLA from '../images/SLCNOLA.jpg';
import BatonRouge from '../images/Baton Rouge.jpg';

function DetailsScreen({ route }) {
  const navigation = useNavigation(); 
  const { hotel } = route.params;

  const { user } = useAuth();

  const cityImageMap = {
    "Baton Rouge": BatonRouge,
    "French Quarter": FQNOLA,
    "Jackson Square": SLCNOLA
  };
  
  const hotelDetails = seededHotels.find(item => item.id === hotel.id);  

  let cityName = "";
  if (hotel.name === "Jackson Square" || hotel.name === "French Quarter") {
    cityName = "New Orleans";
  } else if (hotel.name === "Baton Rouge") {
    cityName = "Baton Rouge";
  }

  const description = hotelDetails ? `Welcome to Enstay, where the vibrant spirit of ${cityName} meets luxurious comfort. Nestled in the heart of the historic ${hotel.name}, Enstay embodies the essence of Southern hospitality with a modern twist.` : '';
  const image = hotelDetails ? { uri: hotelDetails.image } : null;

  const handleBookNow = () => {
    navigation.navigate('Booking', { hotelId: hotel.id, hotel });
  };

  return (
    <View style={style.container}>
      <Card style={style.card}>
        <Card.Title
          title={hotel.name}
          left={(props) => <Avatar.Icon {...props} icon="office-building-marker-outline" />}
        />
        <Card.Cover source={cityImageMap[hotel.name]} />
      </Card>

      <View style={style.textContainer}>
        <Text style={style.name}>{hotel.name}</Text>
        <Text style={style.description}>{description}</Text>
      </View>
      <Button title="Book Now" onPress={handleBookNow} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    margin: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 4,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});

export default DetailsScreen;
