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
import style from "../../../styles";

export default function ShareSomething({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
      <Image style={styles.image} source={Images.videoCameraPurple} />
      <Text style={[style.h2, style.center]}>Share Something</Text>
      <Text style={style.center}>
        Share a video from your media files to upload in the love bank
      </Text>
      </View>
      {/* Icons for record and upload */}
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("VideoRecording")}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={Images.videoCameraPurple} />
            <Text>Start recording</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={Images.upload} />
          <Text>Upload video</Text>
        </View>
      </View>
      {/* navigation */}
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Recommended")}
      >
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to Recommended
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },
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
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mainContainer: {
    width: 300,
    flexDirection: "column",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
