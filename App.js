import * as React from "react";
import CombineNavigators from "./App/navigation/CombineNavigators";
import { Provider } from "react-redux";
import store from "./App/store";
import { AppRegistry } from "react-native";
import { ApolloProvider } from "@apollo/client";
import client from "@config/config";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { AppLoading } from "expo";
//firebase configuration
import * as firebase from "firebase";
import {
  apiKey,
  authDomain,
  databaseUrl,
  projectId,
  storageBucket,
  messagingSenderId,
} from "@env";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseUrl: databaseUrl,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}



export default function App() {
  let [fontLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
  });

  if (!fontLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <CombineNavigators />
        </Provider>
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent("MyApplication", () => App);
