import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import Images from "../../assets";
import style from "../../styles";
import { Video } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function ShareSomething({navigation, uri}) {
  const [shouldPlay, setShouldPlay] = useState(true);

  handlePlayAndPause = () => {
    setShouldPlay((prevState) => ({
      shouldPlay: !prevState.shouldPlay,
    }));
  };

  console.log("vid", uri)
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={[style.h2, style.center]}>Your recording is ready!</Text>
        <Text style={style.center}>Replay your recording here</Text>
        <Video
          source={{ uri: uri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: 300, height: 300 }}
        />
      </View>
      {/* Icons for record and upload */}
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => {navigation.navigate("ShareSomething")}}> 
          <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="delete" color="#FF6E5A" size={60}/>
            <Text>Start over</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate("MessageSent")}}>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={Images.paperPlane} />
          <Text>Save and send</Text>
        </View>
        </TouchableOpacity>
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
