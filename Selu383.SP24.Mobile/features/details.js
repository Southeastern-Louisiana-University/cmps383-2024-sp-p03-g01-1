import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from './AuthContext';
import { Card, Avatar, IconButton } from 'react-native-paper';
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
  
  const hotelDetails = seededHotels.find(item => {
    //console.log("hotel.id:", hotel.id);
    //console.log("item.id:", item.id);
    return item.id === hotel.id;
  });  
  const description = hotelDetails ? hotelDetails.description : '';
  const image = hotelDetails ? { uri: hotelDetails.image } : null;


  const handleBookNow = () => {
    navigation.navigate('Booking', { hotelId: hotel.id, hotel });
  };
  console.log(hotel);
  // console.log(seededHotels);
  //console.log("hotelDetails:", hotelDetails);
  // console.log("description:", description);
  console.log("Image URI:", image);


  return (
    <View style={style.container}>

      <Card style={style.card}>
      <Card.Title
        title={hotel.name}
        left={(props) => <Avatar.Icon {...props} icon="office-building-marker-outline" />}
        //right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
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
    // flex: 1,
    // padding: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
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
  // cover: {
  //   height: 200, // Adjust the height as needed
  //   resizeMode: 'cover', // Ensure the image covers the entire area
  // },
  // image: {
  //   width: 200, // Adjust as needed
  //   height: 200, // Adjust as needed
  //   resizeMode: 'cover',
  // },
});

export default DetailsScreen;


