import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminPortalPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Admin Page!</Text>
      <Text style={styles.description}>
        This will be the future home of all the good stuff! ;)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AdminPortalPage;