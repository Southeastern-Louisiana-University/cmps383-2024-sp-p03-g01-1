import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from './AuthContext';
import { Card, Avatar, IconButton } from 'react-native-paper';
import seededHotels from './seededHotels';

function DetailsScreen({ route }) {
  const navigation = useNavigation(); 
  const { hotel } = route.params;

  const { user } = useAuth();
  
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
        titleStyle={style.name}
        title={hotel.name}
        left={(props) => <Avatar.Icon {...props} icon="office-building-marker-outline" />}
      />
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />


      <View style={style.textContainer}>

      {/* <Text style={style.name}>{hotel.name}</Text> */}
      <Text style={style.description}>{description}</Text>
      </View>
      </Card>

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
    margin: 10,
    textAlign: 'left',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },

});

export default DetailsScreen;


