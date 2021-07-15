import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList } from 'react-native';

import Screen from "../components/Screen";
import AppText from '../components/Text';
import Button from "../components/Button";
import {
  ListItem,
  ListItemSeparator
} from '../components/lists'
import Icon from '../components/Icon';
import colors from '../config/colors';

import cache from '../utility/cache';
import useApi from '../hooks/useApi';
import storageAreas from '../api/storageAreas';


export default function StorageAreas({ navigation, route }) {
  
  const location = route.params.locationId;
  const storageAreasApi = useApi(storageAreas.getStorageAreas);
  
  useEffect(() => {
    storageAreasApi.request(location);
  }, [])

  function setStorageArea(areaId) {
    cache.store(areaId);
  }
  
  return(
    <Screen style={styles.container}>
      {storageAreasApi.error && (
        <>
          <AppText>Error al cargar los almacenes.</AppText>
          <Button title="Intentar de nuevo" onPress={() => storageAreasApi.request(location)}/>
        </>
      )}
      <FlatList
        data={storageAreasApi.data}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={(storageArea) => storageArea.id.toString()}
        renderItem={({item}) => (
          <ListItem
            title={item.nombre}
            onPress={() => {
              navigation.navigate('Inventory Actions', {
                screen: 'Acciones',
                storageAreaId: item.id
              })
              setStorageArea(item.id);
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
