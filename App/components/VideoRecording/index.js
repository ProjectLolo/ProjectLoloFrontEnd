import React, { useState, useEffect } from "react";

import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import * as Permissions from "expo-permissions";
import { MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function VideoRecording({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [recording, setRecording] = useState(false);
  const [video, setVideo] = useState(false);

  // asks permission from used to use camera
  useEffect(() => {
    // (async () => {
    //   const { status } = await Camera.requestPermissionsAsync();
    //   setHasPermission(status === "granted");
    // })
    (async () => {
      const { status } = await Permissions.askAsync(
        Permissions.AUDIO_RECORDING
      );
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Ionicons
                name={
                  Platform.OS === "ios"
                    ? "ios-reverse-camera"
                    : "md-reverse-camera"
                }
                size={40}
                color="white"
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={async () => {
                if (cameraRef) {
                  let photo = await cameraRef.takePictureAsync();
                  console.log("photo", photo);
                }
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 25,
                  borderColor: "white",
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 25,
                    borderColor: "white",
                    height: 40,
                    width: 40,
                    backgroundColor: "white",
                  }}
                ></View>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={async () => {
                if (!recording) {
                  setRecording(true);
                  let video = await cameraRef.recordAsync();
                  console.log("video", video);
                  setVideo(video.uri);
                } else {
                  setRecording(false);
                  cameraRef.stopRecording();
                }
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 25,
                  borderColor: "white",
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 25,
                    borderColor: recording ? "red" : "white",
                    height: 40,
                    width: 40,
                    backgroundColor: recording ? "red" : "white",
                  }}
                ></View>
              </View>
            </TouchableOpacity>
            {video ? (
                  <View>
                    <MaterialIcons
                      name="send"
                      size={40}
                      color="white"
                      onPress={() => navigation.navigate("MessageSent")}
                    />
                  </View>
                ) : // <Video
                //   source={{ uri: video }}
                //   shouldPlay
                //   style={{ width: 600, height: 800 }}
                // ></Video>
                null}
          </View>
        </View>
      </Camera>
    </View>
  );
}
