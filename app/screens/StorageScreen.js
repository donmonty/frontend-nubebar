import React from 'react'
import { StyleSheet, Text } from 'react-native';
import Screen from "../components/Screen";


function StorageScreen(props) {

  return(
    <Screen style={styles.container}>
      <Text>Storage Screen</Text>
    </Screen>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default StorageScreen;