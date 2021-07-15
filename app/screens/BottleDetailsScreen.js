import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import Screen from '../components/Screen';
import Button from '../components/Button';
import ListItem from '../components/lists/ListItem';
import ListItemSeparator from '../components/lists/ListItemSeparator'
import BottleItem2 from '../components/BottleItem2';
import BottleProvider from '../components/forms/BottleContext'
import Bottleform from '../components/forms/BottleForm'

import useApi from '../hooks/useApi';
import getProduct from '../api/getProduct';

const BottleDetailsScreen = ({ navigation, route }) => {

  const barcode = route.params.barcode;
  const getProductApi = useApi(getProduct.getProductByBarcode);
  const data = getProductApi.data;

  const [hasBottleId, setHasBottleId] = useState(false);
  const [hasBottleWeight, setHasBottleWeight] = useState(false);

  useEffect(() => {
    getProductApi.request(barcode);
  }, [])

  useEffect(() => {
    const bottleId = cache.get('bottleId') ? true : false;
    setHasBottleId(bottleId);
  }, [])

  useEffect(() => {
    const bottleWeight = cache.get('bottleWeight') ? true : false;
    setHasBottleWeight(bottleWeight);
  }, [])

  console.log('BOTTLE DETAILS', data);

  return (
    <BottleProvider>
    <Screen>
      {getProductApi.loading ? <Text>Loading...</Text> :
        (
          <>
          <FlatList
            data={getProductApi.data}
            ItemSeparatorComponent={ListItemSeparator}
            keyExtractor={(product) => product.id.toString()}
            renderItem={({ item }) => (
              <BottleItem2
                name={item.nombre}
                barcode={item.codigo_barras}
                capacity={item.capacidad}
              />
              // <ListItem
              //   title={item.nombre}
              // />

            )}
          />
          <Button title="Regresar" onPress={() => navigation.navigate('Inventory Actions')} />
          </>
        )
      }
      
    </Screen>
    </BottleProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default BottleDetailsScreen


