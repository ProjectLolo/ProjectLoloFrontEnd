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
import styles from "@styles/styles";
import ExplanationCarousel from "../../components/ExplanationCarousel";

export default function Welcome({ navigation }) {
  const [animation, setAnimation] = useState(false);
  const buttonWidth = Dimensions.get("window").width * 0.3;
  const styling = StyleSheet.create({
    buttonContainer: {
      borderRadius: 10,
      paddingVertical: 15,
      width: buttonWidth,
      backgroundColor: "#6464E1",
    },
    buttonText: { alignSelf: "center", color: "white" },
  });

  useEffect(() => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image style={styles.peekabooLogo} source={images.peekabooLogo} />
      <ExplanationCarousel />
      <View style={{ flexDirection: "row", flex: 1, marginTop: 70 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <View style={styling.buttonContainer}>
            <Text style={styling.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <View style={[styling.buttonContainer, { marginLeft: 50 }]}>
            <Text style={styling.buttonText}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
      {animation ? (
        <View
          style={{
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              top: "45%",
              left: "38%",
            }}
            source={images.swipe}
          />
        </View>
      ) : null}
    </View>
  );
}
