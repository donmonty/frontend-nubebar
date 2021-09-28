import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log(`Can't store ${key} in Storage`, e)
  }
}

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(`Can't get ${key} from Storage`, e)
  }
}

export default {
  storeData,
  getData
}
