import React from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import style from "../../../styles";

export default function ShareSomething({ navigation, route }) {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("ShareSomething")}>
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Image source={{uri: route.params.uri}} style={{ width: 300, height: 300 }}/>
        {/* Maybe add a picture of the kid */}
        <Text style={[style.h2, style.center]}>[Kid] loves to just hear your voice and see your face!</Text>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mainContainer: {
    width: 300,
    flexDirection: "column",
    alignItems: "center",
  },
});
