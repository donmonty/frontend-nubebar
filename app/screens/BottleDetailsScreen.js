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
  addNewBottle,
  addUsedBottle, 
  resetBottleWeight, 
  resetFolio, 
  resetCustomFolio } from '../store/actions/bottleActions'

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

  const customFolioData = useSelector(state => state.bottleCustomFolio)
  const { customFolio } = customFolioData

  const createTypeData = useSelector(state => state.bottleCreateType)
  const { createType } = createTypeData

  
  useEffect(() => {
    if (error) {
      return
    }
    else if (Object.keys(product).length === 0 && !qrCode) {
      dispatch(listProductDetails(barcode))
    } else if (product && qrCode) {
      
      console.log("OK")
    }
  }, [dispatch, product, qrCode])

  const handleAddNewBottle = () => {
    const bottleData = {
      producto: product.id,
      sat_hash: qrCode,
      peso_nueva: weight,
      folio: folio || customFolio,
      captura: folio ? "MANUAL" : null
    }
    dispatch(addNewBottle(bottleData))
    dispatch(resetBottleWeight())
    folio ? dispatch(resetFolio()) : dispatch(resetCustomFolio())
    navigation.navigate('Confirmation', { confirmation: "bottleCreate" })
  }

  const handleAddUsedBottle = () => {
    const bottleData = {
      producto: product.id,
      sat_hash: qrCode,
      peso_nueva: product.peso_nueva,
      peso_inicial: weight,
      folio: folio || customFolio,
      captura: folio ? "MANUAL" : null
    }
    dispatch(addUsedBottle(bottleData))
    dispatch(resetBottleWeight())
    folio ? dispatch(resetFolio()) : dispatch(resetCustomFolio())
    navigation.navigate('Confirmation', { confirmation: "bottleCreate" })
  }

  const handleCancel = () => {
    dispatch(resetBottleWeight())
    folio ? dispatch(resetFolio()) : dispatch(resetCustomFolio())
    navigation.navigate('Inventory Actions')
  }

  //console.log("//// PRODUCT DETAIL: ", product)
  if (createType === 'usada' && !product.peso_nueva) return (
    <Screen style={styles.containerError}>
      <View style={{padding: 40}}>
        <Image style={styles.icon} source={require("../../assets/alert-outline.png")} />
        <Text style={styles.alertText}>Este producto no esta registrado. Por favor contacta a soporte.</Text>
      </View>
      <Button title="Regresar" onPress={() => navigation.navigate('Inventory Actions')}/>
    </Screen>
  )

  if(error) return (
    <Screen style={styles.containerError}>
      <View style={{padding: 40}}>
        <Image style={styles.icon} source={require("../../assets/alert-outline.png")} />
        <Text style={styles.alertText}>Este producto no esta registrado. Por favor contacta a soporte.</Text>
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
            {customFolio ? <ListItem subTitle="Folio Especial" title={customFolio} /> : null}
            {weight ? <ListItem subTitle="Peso" title={weight} /> : null}
            <ListItemSeparator/>
            <Button title="Cancelar" color="red" onPress={handleCancel} />
            {(product && (!qrCode && !folio && !customFolio)) ? <Button title="Escanear codigo qr" onPress={() => navigation.navigate('Scan QR')}/> : null}
            {(product && (qrCode || folio || customFolio) && !weight) ? <Button title="Pesar Botella" onPress={() => navigation.navigate('Weight Bottle')} /> : null}
            {(product && (qrCode || folio || customFolio) && weight) ? <Button title="Guardar Botella" onPress={(createType === 'usada') ? handleAddUsedBottle : handleAddNewBottle} /> : null}
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
  alertText: {
    alignSelf: "center",
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 24
  }
})

export default BottleDetailsScreen


