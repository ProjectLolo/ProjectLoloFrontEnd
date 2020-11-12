import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";

export default function TakeProfilePicture({ route, navigation }) {
  const [click, setClick] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const { nav, hide } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // const handleClick = () =>{
  //     route.params.takePhoto(cameraRef);
  //     setClick(true)
  //     navigation.navigate("UploadKidProfile");
  // }

  //Take picture using camera
  const takePhoto = async () => {
    let result = await cameraRef.takePictureAsync();
    if (result) {
      hide();
      console.log("takePhoto result.uri", result);
      navigation.navigate(nav, { result });
    }
  };

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

            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={takePhoto}
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
                    borderColor: click ? "red" : "white",
                    height: 40,
                    width: 40,
                    backgroundColor: click ? "red" : "white",
                  }}
                ></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
              }}
            >
              <AntDesign
                name="back"
                size={40}
                color="white"
                onPress={() => {
                  navigation.navigate(nav);
                  hide();
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}
