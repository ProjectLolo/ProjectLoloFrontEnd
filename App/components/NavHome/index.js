import React from "react";
import { View, TouchableWithoutFeedback, Image } from "react-native";
import styles from "@styles/styles";
import images from "@assets/images";
import { useNavigation } from "@react-navigation/native";
import colors from "@assets/colors";

export default function NavHome(props) {
  const { onlyBack } = props;
  const navigation = useNavigation();
  const { goBack } = navigation;

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <TouchableWithoutFeedback
        style={{ alignSelf: "center" }}
        onPress={() => goBack()}
      >
        <View
          style={{
            borderLeftWidth: 6,
            borderBottomWidth: 6,
            transform: [{ rotate: "45deg" }],
            borderColor: colors.purple,
            width: 20,
            height: 20,
            marginTop: 57,
            marginRight: 80,
          }}
        ></View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={onlyBack ? null : () => navigation.navigate("Recommended")}
      >
        <Image
          style={[styles.peekabondLogo, { marginRight: 100 }]}
          source={images.peekabondLogo}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}
