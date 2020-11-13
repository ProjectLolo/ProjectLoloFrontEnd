import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import Images from "../../../assets";
import style from "../../../styles";
import * as ImagePicker from "expo-image-picker";
import NavHome from "../../../components/NavHome";

export default function ShareSomething({ navigation }) {
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      navigation.navigate("VideoPreview", {
        uri: result.uri,
      });
    }
  };

  const takeVideo = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      navigation.navigate("VideoPreview", {
        uri: result.uri,
      });
    }
  };

  return (
    <View style={styles.container}>
      <NavHome />
      <View style={styles.mainContainer}>
        <Image style={styles.image} source={Images.videoCameraPurple} />
        <Text style={[style.h2, style.center]}>Share Something</Text>
        <Text style={style.center}>
          Share a video from your media files to upload in the love bank
        </Text>
      </View>
      {/* Icons for record and upload */}
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={takeVideo}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={Images.videoCameraPurple} />
            <Text>Start recording</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickVideo}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={Images.upload} />
            <Text>Upload video</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* navigation */}
      {/* <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Recommended")}
        >
          <Text style={{ textAlign: "center", marginTop: 50 }}>
            Press here to go to Recommended
          </Text>
        </TouchableWithoutFeedback> */}
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
