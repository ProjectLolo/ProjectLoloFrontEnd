import React from "react";
import { View, TouchableWithoutFeedback, Image } from "react-native";
import styles from "@styles/styles";
import images from "@assets/images";
import { useNavigation } from "@react-navigation/native";

export default function NavHome() {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Recommended")}
      >
        <Image style={styles.peekabondLogo} source={images.peekabondLogo} />
      </TouchableWithoutFeedback>
    </View>
  );
}
