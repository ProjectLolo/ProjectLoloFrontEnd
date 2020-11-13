import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import images from "@assets/images";
import style from "@styles/styles";
import ExplanationCarousel from "../../components/ExplanationCarousel";

const screenWidth = Dimensions.get("window").width;
export default function Welcome({ navigation }) {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <Image style={style.peekabondLogo} source={images.peekabondLogo} />
      <ExplanationCarousel />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View style={[style.loginButton, { marginVertical: "15%" }]}>
          <Text style={style.loginButtonText}>Continue</Text>
        </View>
      </TouchableOpacity>

      {animation ? (
        <View style={styles.swipeContainer}>
          <Image style={styles.swipe} source={images.swipe} />
          <Text
            style={[styles.swipe, style.purpleText, styles.swipeText]}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          >
            SWIPE
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonTextContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    width: screenWidth * 0.3,
  },
  buttonText: { alignSelf: "center", color: "white" },
  swipeContainer: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: "100%",
    height: "100%",
  },
  swipe: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    top: screenWidth,
    left: screenWidth * 0.35,
  },
  swipeText: {
    fontSize: 40,
  },
});
