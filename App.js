import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigation from './AppNavigator/AppNavigation';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigation />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'skyblue',
  },
});
