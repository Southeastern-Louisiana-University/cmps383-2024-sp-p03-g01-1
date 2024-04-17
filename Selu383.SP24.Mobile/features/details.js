import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from './AuthContext';
import { Card, Avatar, IconButton } from 'react-native-paper';

function DetailsScreen({ route }) {
  const navigation = useNavigation(); 
  const { hotel } = route.params;

  const { user } = useAuth();


  const handleBookNow = () => {
    navigation.navigate('Booking', { hotel });
  };

  return (
    <View style={style.container}>

      <Card>
      <Card.Title
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
  />
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      </Card>

      <Text>{hotel.name}</Text>
      <Text>{hotel.description}</Text>
      <Button title="Book Now" onPress={handleBookNow} />



    </View>
  );
}

const style = StyleSheet.create({
  container: {
    
  },
});

export default DetailsScreen;



      {/* <Text style={{ fontSize: 24, marginBottom: 10 }}>
        {user ? `Hello, ${user.userName}` : 'Welcome!'}
      </Text> */}