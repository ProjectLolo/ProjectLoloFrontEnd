import React, { useState, useEffect } from "react";
import { Button, View, Platform, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function VideoUploading({navigation}) {
  const [video, setVideo] = useState(null);
  const [shouldPlay, setShouldPlat] = useState(true);

  handlePlayAndPause = () => {
    setShouldPlat((prevState) => ({
      shouldPlay: !prevState.shouldPlay,
    }));
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setVideo(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {video ? <Button title="Send" onPress={() => navigation.navigate("MessageSent")}/>
       :
      <Button title="Pick a video" onPress={pickVideo} />
  }
      {video && (
        <Video
          source={{ uri: video }}
          shouldPlay
          style={{ width: 300, height: 400 }}
        ></Video>
      )}
    {video ?
      <View style={styles.controlBar}>
        <MaterialIcons
          name={shouldPlay ? "pause" : "play-arrow"}
          size={45}
          color="white"
          onPress={() => {
            handlePlayAndPause();
          }}
        />
      </View>
     : null }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  controlBar: {
    position: "absolute",
    bottom: 115,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
