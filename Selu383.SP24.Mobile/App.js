import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { Button, Card, Title, Avatar, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomNavigationBar from './features/CustomNavigationBar';
import axios from 'axios';
import DetailsScreen from './features/details';
import BookingScreen from './features/booking';
import LoginScreen from './features/login';
import FQNOLA from './images/FQNOLA.jpg';
import SLCNOLA from './images/SLCNOLA.jpg';
import BatonRouge from './images/Baton Rouge.jpg';
import { AuthProvider, useAuth } from './features/AuthContext';
import AdminPortalPage from './features/AdminPortal';
import AdminBookingInfo from './features/AdminBookingInfo';
import AdminAvailableRooms from './features/AdminAvailableRooms';
import SignUp from './features/SignUp';

const windowHeight = Dimensions.get('window').height;

const cityImageMap = {
  "Baton Rouge": BatonRouge,
  "French Quarter": FQNOLA,
  "Jackson Square": SLCNOLA
};

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>EnStay</Text>
      <Text style={styles.subtitle}>Where Convenience Checks In!</Text>
      <Button
        mode="contained"
        onPress={() => {}}
        style={styles.button}
        color="#22D3EE"
      >
        Explore Now
      </Button>
    </View>
  );
}

function HomeScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('https://selu383-sp24-p03-g01.azurewebsites.net/api/hotels');
      setHotels(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setError('Failed to fetch hotels. Please try again.');
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchHotels();
  };

  const handleHotelPress = (hotel) => {
    if (user) {
      navigation.navigate('Details', { hotel });
    } else {
      Alert.alert(
        'Sign In Required',
        'You need to sign in to view hotel details. Do you want to sign in now?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Sign In',
            onPress: () => navigation.navigate('Login'),
          },
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.welcomeContainer}>
      {user ? (
        <View style={styles.userGreeting}>
          <Avatar.Icon size={48} icon="account-circle" style={styles.avatar} />
          <Title style={styles.welcomeText}>
            Welcome, {user.userName}!
          </Title>
        </View>
      ) : (
        <Title>
          Welcome, please sign in!
        </Title>
      )}
    </View>

      <View style={styles.quickBookContainer}>
        <Text style={styles.title}>Where can we take you?</Text>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button onPress={handleRetry} color="#22d3ee">Retry</Button>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {hotels.map((hotel) => (
              <TouchableOpacity
                key={hotel.id}
                onPress={() => handleHotelPress(hotel)}
              >
                <Card elevation={5} style={[styles.card, { width: Dimensions.get('window').width - 20 }]}>
                  <Card.Cover source={cityImageMap[hotel.city]} />
                  <Card.Content>
                  <Title style={styles.cardTitle}>{hotel.name}</Title>
                    <Paragraph>{hotel.description}</Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#22D3EE',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    
  },
  button: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
  },
    quickBookContainer: {
      flex: 1,
      paddingHorizontal: 10,
    },
    scrollContent: {
      flexGrow: 1,
      alignItems: 'center',
    },
    card: {
      marginBottom: 10,
      width: '90%',
      maxWidth: 400,
      backgroundColor: '#a7ccd1'
    },
    errorContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    errorText: {
      marginBottom: 10,
      color: 'red',
    },
    cardTitle: {
      fontSize: 24,  
      textAlign: 'center', 
    },
    welcomeContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
      flexDirection: 'row',
    },
    avatar: {
      backgroundColor: '#22d3ee',
    },
    userGreeting: {
      flexDirection: 'row',
      alignItems: 'center',  // This ensures vertical alignment of the items in the row.
    },
    welcomeText: {
      marginLeft: 10,
    },
  });
  
  const Stack = createStackNavigator();
  
  export default function App() {
    return (
      <AuthProvider>
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
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="AdminPortal" component={AdminPortalPage} />
                <Stack.Screen name="BookingInformation" component={AdminBookingInfo} />
                <Stack.Screen name="AvailableRooms" component={AdminAvailableRooms} />
                <Stack.Screen name="SignUp" component={SignUp} />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    );
  }
