import React from 'react'
import { Text, StyleSheet } from 'react-native';
import Screen from "../components/Screen";


function ActionsScreen(props) {

  return(
    <Screen style={styles.container}>
      <Text>Actions Screen</Text>
    </Screen>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ActionsScreen;