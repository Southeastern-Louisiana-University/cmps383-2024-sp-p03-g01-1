import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, navigation } from 'react-native';
import { Button, PaperProvider, Avatar, Card, Title, Paragraph} from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomNavigationBar from './features/CustomNavigationBar'; 
import axios from 'axios';
import seededHotels from './features/seededHotels';
import DetailsScreen from './features/details';
import BookingScreen from './features/booking';


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



function HomeScreen({ navigation }) {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  const fetchHotels = async () => {
    try {
      console.log('Fetching hotels...');
      const response = await axios.get('https://selu383-sp24-p03-g01.azurewebsites.net/api/hotels');
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
      {error ? (
        <View style={style.errorContainer}>
          <Text style={style.errorText}>{error}</Text>
          <Button onPress={handleRetry}>Retry</Button>
        </View>
      ) : (
        <ScrollView contentContainerStyle={style.scrollContainer}>
          <View style={style.cardContainer}>
            {hotels.map((hotel) => (
              <TouchableOpacity
                key={hotel.id}
                onPress={() => navigation.navigate('Details', { hotel })}
              >
                <Card elevation={5} style={style.card}>
                  <Card.Cover source={{ uri: hotel.image }} />
                  <Card.Content>
                    <Title>{hotel.name}</Title>
                    <Paragraph>{hotel.description}</Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

      )}
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
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
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
            <Stack.Screen name="Booking" component={BookingScreen} /> 

          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
    
  );
}






// function HomeScreen({ navigation }) {
//   const [error, setError] = useState(null);

//   return (
//     <View style={style.container}>
//       <Header />
//       <Text style={style.title}>Quick book</Text>
//       {error ? (
//         <View style={style.errorContainer}>
//           <Text style={style.errorText}>{error}</Text>
//           <Button onPress={handleRetry}>Retry</Button>
//         </View>
//       ) : (
//         <ScrollView contentContainerStyle={style.scrollContainer}>
//           <View style={style.cardContainer}>
//             {seededHotels.map((hotel) => (
//               <TouchableOpacity
//                 key={hotel.id}
//                 onPress={() => navigation.navigate('Details', { hotel })}
//               >
//                 <Card elevation={5} style={style.card}>
//                   <Card.Cover source={{ uri: hotel.image }} />
//                   <Card.Content>
//                     <Title>{hotel.name}</Title>
//                     <Paragraph>{hotel.description}</Paragraph>
//                   </Card.Content>
//                 </Card>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </ScrollView>

//       )}
//     </View>
//   );
// }

