import React, { useEffect } from 'react'
import { Text, StyleSheet, FlatList } from 'react-native'

import Screen from '../components/Screen';
import Button from '../components/Button';
import ListItemSeparator from '../components/lists/ListItemSeparator'
import BottleItem2 from '../components/BottleItem2';

import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../store/actions/productActions';

const BottleDetailsScreen = ({ navigation, route }) => {

  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading = true, error, product } = productDetails
  const barcode = route.params.barcode;

  //const [hasBottleId, setHasBottleId] = useState(false);
  //const [hasBottleWeight, setHasBottleWeight] = useState(false);

  useEffect(() => {
    dispatch(listProductDetails(barcode))
  }, [dispatch])

  // useEffect(() => {
  //   const bottleId = cache.get('bottleId') ? true : false;
  //   setHasBottleId(bottleId);
  // }, [])

  // useEffect(() => {
  //   const bottleWeight = cache.get('bottleWeight') ? true : false;
  //   setHasBottleWeight(bottleWeight);
  // }, [])

  return (
    <Screen style={styles.container} >
      {loading ? <Text>Loading...</Text> :
        (
          <>
          <FlatList
            data={[product]}
            ItemSeparatorComponent={ListItemSeparator}
            keyExtractor={(producto) => producto.id.toString()}
            renderItem={({ item }) => (
              <BottleItem2
                name={item.nombre}
                barcode={item.codigo_barras}
                capacity={item.capacidad}
              />
            )}
          />
          <Button title="Regresar" onPress={() => navigation.navigate('Inventory Actions')} />
          </>
        )
      }
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }
})

export default BottleDetailsScreen


