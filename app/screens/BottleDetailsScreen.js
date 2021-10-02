import React, { useEffect } from 'react'
import { Text, StyleSheet, FlatList, Image, View } from 'react-native'

import Screen from '../components/Screen';
import Button from '../components/Button';
import ListItemSeparator from '../components/lists/ListItemSeparator'
import BottleItem2 from '../components/BottleItem2';
import ListItem from '../components/lists/ListItem';

import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../store/actions/productActions';
import { 
  listBottleDetails, 
  addNewBottle, 
  resetBottleWeight, 
  resetFolio } from '../store/actions/bottleActions'

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

  const folioData = useSelector(state => state.bottleFolio)
  const { folio } = folioData

  //const [hasBottleId, setHasBottleId] = useState(false);
  //const [hasBottleWeight, setHasBottleWeight] = useState(false);
  console.log("//// ERROR BARCODE UNKNOWN: ", error)
  useEffect(() => {
    if (error) {
      return
    }
    else if (Object.keys(product).length === 0 && !qrCode) {
      dispatch(listProductDetails(barcode))
    } else if (product && qrCode) {
      // dispatch(listBottleDetails(qrCode))
      console.log("OK")
    }
  }, [dispatch, product, qrCode])

  const handleAddNewBottle = () => {
    const bottleData = {
      producto: product.id,
      sat_hash: qrCode,
      peso_nueva: weight,
      folio: folio,
      captura: folio ? "MANUAL" : null
    }
    dispatch(addNewBottle(bottleData))
    dispatch(resetBottleWeight())
    dispatch(resetFolio())
    navigation.navigate('Confirmation', { confirmation: "bottleCreate" })
  }

  const handleCancel = () => {
    dispatch(resetBottleWeight())
    dispatch(resetFolio())
    navigation.navigate('Inventory Actions')
  }

  // useEffect(() => {
  //   const bottleId = cache.get('bottleId') ? true : false;
  //   setHasBottleId(bottleId);
  // }, [])

  // useEffect(() => {
  //   const bottleWeight = cache.get('bottleWeight') ? true : false;
  //   setHasBottleWeight(bottleWeight);
  // }, [])

  if(error) return (
    <Screen style={styles.containerError}>
      <View>
        <Image style={styles.icon} source={require("../../assets/alert-outline.png")} />
        <Text style={{ alignSelf: "center", marginTop: 20, textAlign: 'center' }}>Este codigo de barras no esta registrado</Text>
      </View>
      <Button title="Regresar" onPress={() => navigation.navigate('Inventory Actions')}/>
    </Screen>
  )

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
            {folio ? <ListItem subTitle="Folio" title={folio} /> : null}
            {weight ? <ListItem subtitle="Peso" title={weight} /> : null}
            <ListItemSeparator/>
            <Button title="Cancelar" color="red" onPress={handleCancel} />
            {(product && (!qrCode && !folio)) ? <Button title="Escanear codigo qr" onPress={() => navigation.navigate('Scan QR')}/> : null}
            {(product && (qrCode || folio) && !weight) ? <Button title="Pesar Botella" onPress={() => navigation.navigate('Weight Bottle')} /> : null}
            {(product && qrCode && weight) ? <Button title="Guardar Botella" onPress={handleAddNewBottle} /> : null}
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
  },
  containerError: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between'
  },
  icon: {
    width: '100%',
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    resizeMode: 'contain',
  },
})

export default BottleDetailsScreen


