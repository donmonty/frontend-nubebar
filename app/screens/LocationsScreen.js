import React, { useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native';

import Screen from "../components/Screen";
import AppText from '../components/Text';
import Button from "../components/Button";
import {
  ListItem,
  ListItemSeparator
} from '../components/lists'
import cache from '../utility/cache';

import { useDispatch, useSelector } from 'react-redux'
import { listLocations } from "../store/actions/locationActions"


function LocationsScreen({ navigation }) {
  const dispatch = useDispatch()
  const locationData = useSelector((state) => state.locations)
  let { loading = true, error, locations } = locationData

  useEffect(() => {
    dispatch(listLocations())
  }, [dispatch])

  return(
    <Screen style={styles.container}>
      {error && (
        <>
          <AppText>No se pudieron cargar las sucursales.</AppText>
          <Button title="Intentar de nuevo" onPress={() => dispatch(listLocations())} />
        </>
      )}
      <FlatList
        data={locations}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={(location) => location.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.nombre}
            onPress={() => {
              navigation.navigate('Almacenes', {
                locationId: item.id 
              });
              cache.store('Sucursal', item.id)
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