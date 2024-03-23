import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { Button, PaperProvider, Avatar, Card} from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomNavigationBar from './CustomNavigationBar'; 
import axios from 'axios';

function Header() {
  return (
    <View style={style.header}>
      <Text style={style.title}>EnStay</Text>
      <Text style={style.subtitle}>Your perfect destination for a memorable stay</Text>
      <Button
        mode="contained"
        onPress={() => {}}
        style={style.button}
      >
        Explore Now
      </Button>
    </View>
  );
}
// const fetchHotels = async () => {
//   try {
//     const response = await axios.get('https://127.0.0.1:7116/api/hotels');
//     console.log('Fetched hotels:', response.data);
//     setHotels(response.data);
//   } catch (error) {
//     console.error('Error fetching hotels:', error);
//   }
// };

function HomeScreen({ navigation }) {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  const fetchHotels = async () => {
    try {
      console.log('Fetching hotels...');
      const response = await axios.get('https://localhost:7116/api/hotels');
      console.log('Fetched hotels:', response.data);
      setHotels(response.data);
      setError(null); // Clear error on successful fetch
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setError('Failed to fetch hotels. Please try again.'); // Set custom error message
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleRetry = () => {
    setError(null); // Clear previous error
    fetchHotels(); // Retry fetching data
  };

  return (
    <View style={style.container}>
      <Header />
      <Text style={style.title}>Quick book</Text>
      {error ? ( // Display error message if there's an error
        <View style={style.errorContainer}>
          <Text style={style.errorText}>{error}</Text>
          <Button onPress={handleRetry}>Retry</Button>
        </View>
      ) : (
      <View style={style.cardContainer}>
        {hotels.map(hotel => (
          <Card key={hotel.id} style={style.card}>
            <Card.Title title={hotel.name} subtitle={hotel.description} />
            <Card.Cover source={{ uri: hotel.image }} />
            <Card.Actions>
              <Button onPress={() => navigation.navigate('Details', { hotel })}>
                View Details
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
      )}
    </View>
  );
}


function DetailsScreen({ route }) {
  const { hotel } = route.params;

  return (
    <View style={style.container}>
      <Text>{hotel.name}</Text>
      <Text>{hotel.description}</Text>
      {/* Render other details of the hotel */}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#22D3EE',
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    width: '33%', // Adjust according to your preference
    marginBottom: 20,
  },
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              header: (props) => <CustomNavigationBar {...props} />,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
    
  );
}
