import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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


  const handleBookNow = () => {
    navigation.navigate('Booking', { hotel });
  };
  // console.log(hotel);
  // console.log(seededHotels);
  // console.log("hotelDetails:", hotelDetails);
  // console.log("description:", description);


  return (
    <View style={style.container}>

      <Card>
      <Card.Title
        title={hotel.name}
        
        //subtitle={description}
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
        right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
      />
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      </Card>

      <Text>{hotel.name}</Text>
      <Text>{description}</Text>
      <Button title="Book Now" onPress={handleBookNow} />



    </View>
  );
}

const style = StyleSheet.create({
  container: {
    
  },
});

export default DetailsScreen;


