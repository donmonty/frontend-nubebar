import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://192.168.1.37:8000",
    // apiUrl: "https://945e11bf-c5e6-492a-a37f-5c77ad915de1.mock.pstmn.io",
    tokenType: 'Token'
  },
  staging: {
    apiUrl: "http://192.168.1.69:8080/api",
  },
  prod: {
    apiUrl: "https://api-nubebar-django-rmwos.ondigitalocean.app",
    tokenType: 'Token'
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();