import React from 'react'
import { Text, StyleSheet } from 'react-native';
import Screen from "../components/Screen";


function CountsScreen(props) {

  return(
    <Screen style={styles.container}>
      <Text>Counts Screen</Text>
    </Screen>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default CountsScreen;