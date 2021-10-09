import React, { useState, useEffect } from 'react'
import { View, StyleSheet} from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Screen from '../components/Screen'
import Button from '../components/Button'
import Text from '../components/Text'

export default function ScanQrScreen({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const qr = BarCodeScanner.Constants.BarCodeType.qr
  const countId = route.params.countId

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
    navigation.navigate('Count Bottle Details', { qrCode: bottleHash, countId: countId })
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
      
      <Text style={{ color: "#FFFFFF", alignSelf: "center", marginTop: 20 }} >Escanea el código QR de la botella</Text>
      <View>
        <Text style={{ color: "#FFFFFF", alignSelf: "center", marginBottom: 10 }}>¿Tienes problemas para escanear?</Text>
        <Button title="Captura Manual" onPress={() => navigation.navigate('Manual Folio')} />
      </View>
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