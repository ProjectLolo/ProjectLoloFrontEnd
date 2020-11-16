import React from "react";
import { View, Text, TouchableWithoutFeedback, Dimensions } from "react-native";
import { Video } from "expo-av";

export default function EnlargeVideo({ video, hide }) {
  return (
    <View
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: "rgba(52, 52, 52, 0.4)",
        position: "absolute",
        top: 0,
        justifyContent: "center",
      }}
    >
      <TouchableWithoutFeedback onPress={hide}>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(52, 52, 52, 0.4)",
            position: "absolute",
            top: 0,
            justifyContent: "center",
          }}
        ></View>
      </TouchableWithoutFeedback>

      <Video
        source={{ uri: video }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        shouldPlay={true}
        resizeMode="contain"
        useNativeControls
        style={{ alignSelf: "center", width: "50%", height: "50%" }}
      />
    </View>
  );
}
