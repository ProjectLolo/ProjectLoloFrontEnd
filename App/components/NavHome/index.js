import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Image,
  TouchableHighlight,
} from "react-native";
import styles from "@styles/styles";
import images from "@assets/images";
import { useNavigation } from "@react-navigation/native";
import colors from "@assets/colors";

export default function NavHome(props) {
  const navigation = useNavigation();
  const { nav } = props;

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <TouchableHighlight
        style={{ alignSelf: "center" }}
        onPress={() => navigation.navigate(nav)}
      >
        <View
          style={{
            borderLeftWidth: 6,
            borderBottomWidth: 6,
            transform: [{ rotate: "45deg" }],
            borderColor: colors.purple,
            width: 20,
            height: 20,
            marginTop: 30,
            marginRight: 60,
          }}
        ></View>
      </TouchableHighlight>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Recommended")}
      >
        <Image
          style={[styles.peekabondLogo, { marginRight: 60 }]}
          source={images.peekabondLogo}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}
