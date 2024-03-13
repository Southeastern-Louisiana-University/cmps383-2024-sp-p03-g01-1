import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomNavigationBar from './CustomNavigationBar'; 
import { PaperProvider } from 'react-native-paper';

function HomeScreen({ navigation }) {
  return (
    <View style={style.container}>
      <Text>Home Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Details')}>
        Go to details
      </Button>
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
