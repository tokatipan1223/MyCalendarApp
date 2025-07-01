import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import CalendarScreen from './src/CalendarScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CalendarScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
