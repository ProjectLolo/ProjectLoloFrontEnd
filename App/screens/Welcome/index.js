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
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image style={style.peekabooLogo} source={images.peekabooLogo} />
      <ExplanationCarousel />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <View style={[styles.buttonTextContainer, style.purple]}>
            <Text style={styles.buttonText}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
      {animation ? (
        <View style={styles.swipeContainer}>
          <Image style={styles.swipe} source={images.swipe} />
          <Text style={[styles.swipe, style.purpleText, styles.swipeText]}>
            SWIPE
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    marginTop: 70,
  },
  buttonTextContainer: {
    borderRadius: 10,
    paddingVertical: 15,
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
