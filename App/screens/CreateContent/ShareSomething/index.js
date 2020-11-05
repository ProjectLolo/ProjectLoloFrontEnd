import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import Images from "../../../assets";
import styles from "../../../styles";

export default function ShareSomething({ navigation }) {
  return (
    <View style={styling.container}>
      <Image style={styling.image} source={Images.videoCameraPurple} />
      <Text style={[styles.h2, styles.center]}>Share Something</Text>
      <Text style={styles.center}>
        Share a video from your media files to upload in the love bank
      </Text>
      <Text style={{ textAlign: "center" }}>Share Something</Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Recommended")}
      >
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to Recommended
        </Text>
      </TouchableWithoutFeedback>
      {/* Icons for record and upload */}
      <TouchableOpacity
        onPress={() => navigation.navigate("VideoRecording")}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image style={styling.icon} source={Images.videoCameraPurple} />
          <Text>Start recording</Text>
        </View>
      </TouchableOpacity>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image style={styling.icon} source={Images.upload} />
        <Text>Upload video</Text>
      </View>
    </View>
  );
}
const styling = StyleSheet.create({
  icon: {
    width: 60,
    height: 60,
  },
  image: {
    width: 240,
    height: 240,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
