import React, { useState, useEffect } from 'react';
import { View, StyleSheet} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Screen from '../components/Screen';
import Button from '../components/Button'
import Text from '../components/Text'

export default function ScanQreScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const qr = BarCodeScanner.Constants.BarCodeType.qr

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    const bottleHash = data.split("=")[3]
    if (type !== qr) return setScanned(false)
    setScanned(true);
    navigation.navigate('Bottle Details', { qrCode: bottleHash })
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Screen style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[qr]}
        style={StyleSheet.absoluteFillObject}
      />
      {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
      <Text style={{ color: "#FFFFFF", alignSelf: "center", marginTop: 20 }} >Escanea el codigo QR de la botella</Text>
      <Button title="Captura manual" onPress={() => navigation.navigate('Manual Folio')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between'
  }
})