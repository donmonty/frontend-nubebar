import React, { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Screen from "../components/Screen";
import AppText from '../components/Text';
import Button from "../components/Button";
import {
  ListItem,
  ListItemSeparator
} from '../components/lists';

// import useAuth from '../auth/useAuth'
import useApi from '../hooks/useApi';
import storageAreas from '../api/storageAreas';
import routes from "../navigation/routes";
//import cache from '../utility/cache';
// import styles from '../config/styles';

function StorageAreasScreen({ navigation, route }) {
  const location = route.params;
  const storageAreasApi = useApi(storageAreas.getStorageAreas);
  // const getLocationId = async () => {
  //   return await cache.get('locationId')
  // }
  // let locationId;
  // getLocationId()
  //   .then(res => {
  //     locationId = res;
  //   })
  //   .catch(err => console.log('ERROR EN GET CACHE', err))
  //const locationId = getLocationId();
  // console.log('::: CACHE LOCATION ID', locationId);

  useEffect(() => {
    storageAreasApi.request(location.locationId);
  }, [])

  return (
    <Screen style={styles.container}>
      {storageAreasApi.error && (
        <>
          <AppText>No se pudieron cargar los almacenes.</AppText>
          <Button title="Intentar de nuevo" onPress={() => storageAreasApi.request(location.locationId)}/>
        </>
      )}
      <FlatList
        data={storageAreasApi.data}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={(storageArea) => storageArea.id.toString()}
        renderItem={({item}) => (
          <ListItem
            title={item.nombre}
            onPress={() => navigation.navigate(routes.ACTIONS, {
              screen: 'Acciones Inventario',
              params: { storageAreaId: item.id}
            })} 
          />
        )}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default StorageAreasScreen;