import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { Card, Title, Paragraph } from 'react-native-paper';

const ExplorePage = ({ navigation }) => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('https://selu383-sp24-p03-g01.azurewebsites.net/api/hotels');
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
    <View style={styles.container}>
      <Text style={styles.title}>Explore Enstay Hotels</Text>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.cardContainer}>
            {hotels.map((hotel) => (
              <TouchableOpacity
                key={hotel.id}
                onPress={() => navigation.navigate('Booking', { hotelId: hotel.id })}
              >
                <Card elevation={5} style={styles.card}>
                  <Card.Cover source={{ uri: hotel.image }} />
                  <Card.Content>
                    <Title>Enstay {hotel.name}</Title>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  cardContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
});

export default ExplorePage;
