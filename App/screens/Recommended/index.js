import React from "react";
import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import styles from "@styles/styles";
import images from "@assets/images";

export default function Recommended({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.peekabondLogo} source={images.peekabondLogo} />
      <Text style={{ textAlign: "center" }}>Recommended</Text>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("LoveBank")}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to LoveBank
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Library")}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to Library
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Settings")}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to Settings
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("ShareSomething")}
      >
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to ShareSomething
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
