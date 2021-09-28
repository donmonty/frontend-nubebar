import React, { useEffect } from 'react'
import { Text, StyleSheet, FlatList } from 'react-native'

import Screen from '../components/Screen';
import Button from '../components/Button';
import ListItemSeparator from '../components/lists/ListItemSeparator'
import BottleItem2 from '../components/BottleItem2';
import ListItem from '../components/lists/ListItem';

import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../store/actions/productActions';
import { listBottleDetails } from '../store/actions/bottleActions'

const BottleDetailsScreen = ({ navigation, route }) => {

  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  let { loading = true, error, product } = productDetails
  const barcode = route.params.barcode;

  const qrCode = route.params.qrCode
  const bottleDetails = useSelector(state => state.bottleDetails)
  const weightData = useSelector(state => state.bottleWeight)
  const { weight } = weightData
  const { loading: loadingId } = bottleDetails

  //const [hasBottleId, setHasBottleId] = useState(false);
  //const [hasBottleWeight, setHasBottleWeight] = useState(false);

  useEffect(() => {
    if (Object.keys(product).length === 0 && !qrCode) {
      dispatch(listProductDetails(barcode))
    } else if (product && qrCode) {
      // dispatch(listBottleDetails(qrCode))
      console.log("OK")
    }
  }, [dispatch, product, qrCode])

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
      {(loading || loadingId) ? <Text>Loading...</Text> :
        (
          <>
            <FlatList
              data={[product]}
              ItemSeparatorComponent={ListItemSeparator}
              keyExtractor={(producto) => producto.id.toString()}
              renderItem={({ item }) => (
                <BottleItem2
                  name={item.nombre_marca}
                  barcode={item.codigo_barras}
                  capacity={item.capacidad}
                />
              )}
            />
            {qrCode ? <ListItem subTitle="Folio" title={qrCode} /> : null}
            {weight ? <ListItem subtitle="Peso" title={weight} /> : null}
            <ListItemSeparator/>
            <Button title="Cancelar" color="red" onPress={() => navigation.navigate('Inventory Actions')} />
            {(product && !qrCode) ? <Button title="Escanear codigo qr" onPress={() => navigation.navigate('Scan QR')}/> : null}
            {(product && qrCode && !weight) ? <Button title="Pesar Botella" onPress={() => navigation.navigate('Weight Bottle')} /> : null}
            {(product && qrCode && weight) ? <Button title="Guardar Botella" onPress={() => navigation.navigate('Inventory Actions')} /> : null}
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


