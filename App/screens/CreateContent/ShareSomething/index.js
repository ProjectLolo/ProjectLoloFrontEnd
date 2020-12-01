import React, { useState, useEffect } from "react";
import * as FileSystem from 'expo-file-system';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import Images from "../../../assets";
import styles from "../../../styles";
import * as ImagePicker from "expo-image-picker";
import NavHome from "../../../components/NavHome";

export default function ShareSomething({ route, navigation }) {
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      const {
        status: cameraStatus,
      } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else if (cameraStatus !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    })();
  }, []);

  const pickVideo = async () => {
    console.log("picker")
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.5,
    });

    
    if (!result.cancelled) {
      console.log("result0", result);
      navigation.navigate("VideoPreview", {
        uri: result.uri,
        type: result.type === "image" ? "picture" : "video"
      });
    }
  };

  const takeVideo = async () => {
    let result = []
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.5,
        videoMaxDuration: 120,
      });

    
      await FileSystem.copyAsync({from: result.uri, to: `${result.uri}.mp4`});
    if (!result.cancelled) {
      navigation.navigate("VideoPreview", {
        uri: `${result.uri}.mp4`,
        type: "video"
      });
    }
  };

  const takeImage = async () => {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.2,
      });
      if (!result.cancelled) {
        navigation.navigate("VideoPreview", {
          uri: result.uri,
          type: "picture"
        });
      }
    }
  

  return (
    <View style={style.container}>
      <NavHome />
      <View style={style.mainContainer}>
        <Image style={style.image} source={Images.videoCameraPurple} />
        <Text style={[styles.h2, style.center]}>Share Something</Text>
        <Text style={styles.center}>
          Share a picture or a video (max 2 min) from your media files to upload in the love bank
        </Text>
      </View>
      <TouchableOpacity
          onPress={() => navigation.navigate("Share", {stories: route.params.stories})}
        >
          <View style={[styles.loginButton, { marginBottom: "5%" }]}>
            <Text style={styles.loginButtonText}>Get content suggestions</Text>
          </View>
        </TouchableOpacity>
      {/* Icons for record and upload */}
      <View style={style.rowContainer}>
        <TouchableOpacity onPress={takeVideo}>
          <View style={style.iconContainer}>
            <Image style={style.icon} source={Images.videoCameraPurple} />
            <Text>Start recording</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={takeImage}>
          <View style={style.iconContainer}>
            <Image style={style.icon} source={Images.camera} />
            <Text>Take picture</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickVideo}>
          <View style={style.iconContainer}>
            <Image style={style.icon} source={Images.upload} />
            <Text>Upload</Text>
          </View>
        </TouchableOpacity>

      </View>
      
    </View>
  );
}
const style = StyleSheet.create({
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
