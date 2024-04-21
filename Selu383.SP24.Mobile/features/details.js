import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from './AuthContext';
import { Card, Avatar } from 'react-native-paper';
import seededHotels from './seededHotels';
import FQNOLA from '../images/FQNOLA.jpg';
import SLCNOLA from '../images/SLCNOLA.jpg';
import BatonRouge from '../images/Baton Rouge.jpg';
import HistoricalLandmarkIcon from '../images/fqlogo.png';
import CuisineIcon from '../images/food.png';
import NightlifeIcon from '../images/night.png';

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
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Card style={styles.card}>
            <Card.Title
              title={hotel.name}
              left={(props) => <Avatar.Icon {...props} 
              style={styles.avatarStyle}
              icon="office-building-marker-outline" />}
              titleStyle={styles.cardTitle} 
            />
            <Card.Cover source={cityImageMap[hotel.name]} />
          

          <View style={styles.textContainer}>
            {/* <Text style={styles.name}>{hotel.name}</Text> */}
            <Text style={styles.description}>{description}</Text>
          </View>
          </Card>
          <Button title="Book Now" onPress={handleBookNow} style={{ fontSize: 20 }} />
        </View>
      </ImageBackground>

      <View style={styles.activitiesContainer}>
        <Text style={styles.activitiesTitle}>Things to Do in {cityName}</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.activityItem}>
            <Image source={CuisineIcon} style={styles.activityIcon} />
            <Text style={styles.activityCaption}>Explore local cuisine</Text>
          </View>
          <View style={styles.activityItem}>
            <Image source={NightlifeIcon} style={styles.activityIcon} />
            <Text style={styles.activityCaption}>Experience vibrant nightlife</Text>
          </View>
          <View style={styles.activityItem}>
            <Image source={HistoricalLandmarkIcon} style={styles.activityIcon} />
            <Text style={styles.activityCaption}>Visit historical landmarks</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#EAEBED', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    marginBottom: 80,
    borderRadius: 10,
    elevation: 4,
    width: '100%',
    backgroundColor: '#fff', 
  },
  cardTitle: {
    color: '#000', 
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
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
    color: '#000', 
  },
  description: {
    fontSize: 18,
    textAlign: 'left',
    color: '#000', 
    padding: 20,
  },
  activitiesContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20, 
  },
  activitiesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000', 
  },
  activityItem: {
    marginRight: 15, 
    alignItems: 'center',
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    marginBottom: 10, 
    borderRadius: 15, 
    backgroundColor: '#EAEBED', 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityIcon: {
    width: 48, 
    height: 48, 
    marginBottom: 10, 
  },
  activityCaption: {
    fontSize: 16,
    color: '#000', 
    textAlign: 'center',
  },
  avatarStyle: {
    backgroundColor: '#22d3ee', // Change the background color to blue
  },
});

export default DetailsScreen;
