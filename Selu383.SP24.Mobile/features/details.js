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

  const description = hotelDetails ? `Welcome to Enstay, where the vibrant spirit of ${cityName} meets luxurious comfort. 
    Nestled in the heart of the historic ${hotel.name}, Enstay embodies the essence of Southern hospitality with a modern twist.` : '';
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
              left={(props) => <Avatar.Icon {...props} icon="office-building-marker-outline" />}
              titleStyle={styles.cardTitle} // Added titleStyle to customize title text color
            />
            <Card.Cover source={cityImageMap[hotel.name]} />
          </Card>

          <View style={styles.textContainer}>
            <Text style={styles.name}>{hotel.name}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
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
          {/* Add more activities as needed */}
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
    backgroundColor: '#EAEBED', // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 4,
    width: '100%',
    backgroundColor: '#fff', // White card background color
  },
  cardTitle: {
    color: '#000', // Black title text color
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
    color: '#000', // White text color
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000', // White text color
    paddingHorizontal: 20,
  },
  activitiesContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20, // Add margin bottom for separation
  },
  activitiesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000', // White text color
  },
  activityItem: {
    marginRight: 15, // Adjust spacing between items
    alignItems: 'center',
    paddingVertical: 10, // Increase padding for better visibility
    paddingHorizontal: 20, // Increase padding for better visibility
    borderRadius: 15, // Add border radius for better appearance
    backgroundColor: '#EAEBED', // Light blue background color
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityIcon: {
    width: 48, // Increase width
    height: 48, // Increase height
    marginBottom: 10, // Add margin bottom for spacing
  },
  activityCaption: {
    fontSize: 16,
    color: '#000', // Black text color
    textAlign: 'center',
  },
});

export default DetailsScreen;
