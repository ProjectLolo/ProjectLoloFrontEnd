import React from "react";
import { View, TouchableWithoutFeedback, Text, Image } from "react-native";
import images from "@assets/images";
import styles from "@styles/styles";

export default function NavButton() {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Library")}>
        <View>
          <Image
            style={{ width: 50, height: 50, alignSelf: "center" }}
            source={images.videoCameraYellow}
          />
          <Text style={styles.bottomText}>TODAY</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Library")}>
        <View>
          <Image
            style={{ width: 50, height: 50, alignSelf: "center" }}
            source={images.videoCameraYellow}
          />
          <Text style={styles.bottomText}>Love Bank</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Library")}>
        <View>
          <Image
            style={{ width: 50, height: 50, alignSelf: "center" }}
            source={images.videoCameraYellow}
          />
          <Text style={styles.bottomText}>Create</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
