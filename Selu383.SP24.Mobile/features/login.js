import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
    
    const { login } = useAuth();
    const navigation = useNavigation();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {
        try {
          const response = await fetch('https://selu383-sp24-p03-g01.azurewebsites.net/api/authentication/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
          const data = await response.json();
    
          console.log('Login response:', data);

          if (response.ok) {
            login(data); 
            console.log(username)
            navigation.navigate('Home'); 

            //Alert.alert('Login Successful', data.message);
          } else {
            // Login failed, display error message
            Alert.alert('Login Failed', data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return (
        <View style={style.container}>
          <Text style={style.title}>Login</Text>
          <TextInput
            label="Username or Email"
            value={username}
            onChangeText={text => setUsername(text)}
            style={style.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry // Hide the entered text
            style={style.input}
          />
          <Button mode="contained" onPress={handleLogin} style={style.button}>
            Login
          </Button>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      marginBottom: 10,
    },
    button: {
      width: '100%',
      marginTop: 10,
    },
  });