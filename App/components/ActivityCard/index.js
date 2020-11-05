import React from "react";
import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import styles from "@styles/styles";
import colors from "@assets/colors";
import { LinearGradient } from "expo-linear-gradient";

export default function ActivityCard(props) {
  const { title, text, image, top1, top2, bottom1, bottom2 } = props;
  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          backgroundColor: colors[top2],
          borderTopLeftRadius: "25%",
          borderTopRightRadius: "25%",
        }}
      >
        <LinearGradient
          colors={[colors[top1], colors[top2]]}
          style={{
            backgroundColor: "green",
            width: 180,
            height: 140,
            justifyContent: "center",
            borderRadius: "20%",
          }}
        >
          <Image style={[styles.activityImage]} source={image} />
        </LinearGradient>
      </View>
      <View
        style={{
          backgroundColor: colors[bottom1],
          borderBottomLeftRadius: "25%",
          borderBottomRightRadius: "25%",
        }}
      >
        <LinearGradient
          colors={[colors[bottom1], colors[bottom2]]}
          style={{
            paddingVertical: 20,
            borderRadius: "20%",
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>{title}</Text>
          <Text style={{ textAlign: "center" }}>{text}</Text>
        </LinearGradient>
      </View>
    </View>
  );
}
