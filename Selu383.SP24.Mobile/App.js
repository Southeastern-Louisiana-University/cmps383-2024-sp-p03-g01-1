// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
// import React, { useState } from 'react';

// export default function App() {
//   const [rooms, setRooms] = useState([
//     { id: '1', roomNumber: '101', type: 'Standard', price: 100 },
//     { id: '2', roomNumber: '202', type: 'Deluxe', price: 150 },
//     { id: '3', roomNumber: '303', type: 'Suite', price: 200 },
//   ]);

//   const renderRoomItem = ({ item }) => {
//     return (
//       <TouchableOpacity style={styles.roomItem}>
//         <Text style={styles.roomNumber}>Room {item.roomNumber}</Text>
//         <Text>Type: {item.type}</Text>
//         <Text>Price: ${item.price}</Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.subtitle}>Welcome to your home away fom home!</Text>

//       <FlatList
//         data={rooms}
//         keyExtractor={(item) => item.id}
//         renderItem={renderRoomItem}
//         style={styles.roomList}
//       />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#555',
//     marginBottom: 20,
//     marginTop: 40,
//   },
//   roomList: {
//     width: '100%',
//   },
//   roomItem: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   roomNumber: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });
// import React from 'react';
// import { View, Text } from 'react-native';
// import { Button, Card, Title, Paragraph } from 'react-native-paper';
// const LandingPage = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
//       <Card>
//         <Card.Content>
//           <Title>Welcome to Enstay Hotel</Title>
//           <Paragraph>Your perfect getaway destination</Paragraph>
//         </Card.Content>
//         <Card.Actions>
//           <Button>Book Now</Button>
//         </Card.Actions>
//       </Card>
//     </View>
//   );
// };

// export default LandingPage;
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View, Text, Button, StyleSheet} from 'react-native';
import { GestureHandlerRootView} from 'react-native-gesture-handler'



function HomeScreen() {
  return (
    <View style={style.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={style.container}>
      <Text>Details Screen</Text>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}