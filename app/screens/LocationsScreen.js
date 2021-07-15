import React, { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Screen from "../components/Screen";
import AppText from '../components/Text';
import Button from "../components/Button";
import {
  ListItem,
  ListItemSeparator
} from '../components/lists'


import useAuth from '../auth/useAuth'
import useApi from '../hooks/useApi';
import userLocation from '../api/userLocations';
import routes from "../navigation/routes";

const sucursales = [
  { id: "1", nombre: 'Link Burgers' },
  { id: "2", nombre: 'Zelda Bar' }
]

function LocationsScreen({ navigation }) {
  const getUserLocationsApi = useApi(userLocation.getLocations);
  const { user } = useAuth();
  // console.log('::: USER :::', user);

  useEffect(() => {
    getUserLocationsApi.request(user.id);
    console.log('::: User Location Data :::', getUserLocationsApi.data);
  }, [])


  return(
    <Screen style={styles.container}>
      {getUserLocationsApi.error && (
        <>
          <AppText>No se pudieron cargar las sucursales.</AppText>
          <Button title="Intentar de nuevo" onPress={() => getUserLocationsApi.request(user.id)} />
        </>
      )}
      <FlatList
        data={getUserLocationsApi.data}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={(location) => location.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.nombre}
            onPress={() => {
              navigation.navigate('Almacenes', {
                locationId: item.id 
              });
            }}
          />
        )}
      />
    </Screen>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default LocationsScreen;