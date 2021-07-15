import AsyncStorage from '@react-native-async-storage/async-storage';

const prefix = 'cache';

async function store(key, value) {
  try {
    const item = {
      value,
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));  
  } catch (error) {
    console.log(error);
  }
}

async function get(key) {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if(!item) return null;
    return item.value;
  } catch (error) {
    console.log(error);
  }
}

export default {
  store,
  get,
}