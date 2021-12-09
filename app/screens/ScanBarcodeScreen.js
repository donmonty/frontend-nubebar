import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux'
import { BarCodeScanner } from 'expo-barcode-scanner';
import Button from '../components/Button'
import Text from '../components/Text'

import { setBarcode } from '../store/actions/bottleActions'

export default function ScanBarcodeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const ean13 = BarCodeScanner.Constants.BarCodeType.ean13

  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (type !== ean13) return setScanned(false)
    dispatch(setBarcode(data))
    setScanned(true);
    navigation.navigate('Bottle Details')
  };

  if (hasPermission === null) {
    return <Text style={{ color: "#FFFFFF", alignSelf: "center", marginTop: 20 }}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={{ color: "#FFFFFF", alignSelf: "center", marginTop: 20 }}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[ean13]}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={{ color: "#FFFFFF", alignSelf: "center", marginTop: 20 }} >Escanea el codigo de barras de la botella</Text>
      <View>
        <Text style={{ color: "#FFFFFF", alignSelf: "center", marginBottom: 10 }}>Tienes problemas para escanear?</Text>
        <Button title="Captura manual" onPress={() => navigation.navigate('Manual Barcode')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between'
  }
})