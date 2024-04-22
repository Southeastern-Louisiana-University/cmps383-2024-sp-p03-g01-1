import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, Checkbox, DefaultTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const passwordRef = useRef(null);

    const handleSignUp = async () => {
        if (!agreeToTerms) {
            Alert.alert('Error', 'Please agree to the terms of service.');
            return;
        }
        if (password !== confirmPassword) {
            setPasswordsMatch(false);
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        if (!checkPasswordStrength(password)) {
            Alert.alert('Error', 'Password is not strong enough. Please ensure it is at least 8 characters long and contains a special character.');
            return;
        }

        const userData = {
            username: username,
            password: password,
            roles: ["user"]
        };
        console.log(userData);
        try {
            const response = await fetch('https://selu383-sp24-p03-g01.azurewebsites.net/api/createusers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                // username: username,
                // password: password,
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                throw new Error(data.message || 'Failed to sign up');
            }

            Alert.alert('Success', 'Sign-up successful!');
            navigation.goBack();
        } catch (error) {
            console.error('Error:', error.message);
            Alert.alert('Error', error.message || 'Failed to sign up. Please try again later.');
        }
    };
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#808080', // Gray color for underline and label on focus
        },
    };
    const checkPasswordStrength = (password) => {
        if (password.length < 8 || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
            setPasswordStrength('Password must be at least 8 characters long, a number, and contain a special character.');
            return false;
        }
        setPasswordStrength('');
        return true;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up for Enstay</Text>
            <TextInput
                label="Username or Email"
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.input}
                theme={theme}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={text => {
                    setPassword(text);
                    setConfirmPassword('');
                    setPasswordsMatch(text === confirmPassword);
                    checkPasswordStrength(text);
                }}
                secureTextEntry
                style={styles.input}
                theme={theme}
                ref={passwordRef}
            />
            <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={text => {
                    setConfirmPassword(text);
                    setPasswordsMatch(text === password);
                }}
                secureTextEntry
                style={styles.input}
                theme={theme}
            />
            {!passwordsMatch && (
                <Text style={styles.errorText}>Passwords do not match</Text>
            )}
            {passwordStrength !== '' && (
                <Text style={styles.errorText}>{passwordStrength}</Text>
            )}
            <Checkbox.Item
                label="I agree to the Terms of Service"
                status={agreeToTerms ? 'checked' : 'unchecked'}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
                color="#22d3ee"
            />
            <Button
                mode="contained"
                onPress={handleSignUp}
                style={[styles.button, { backgroundColor: '#22D3EE' }]}
                disabled={!passwordsMatch || passwordStrength !== '' || !agreeToTerms}
            >
                Sign Up
            </Button>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.signInLink}>Already have an account? Sign in instead</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: '#a7ccd1',

    },
    button: {
        width: '100%',
        marginTop: 10,
    },
    signInLink: {
        marginTop: 10,
        color: '#000',
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
