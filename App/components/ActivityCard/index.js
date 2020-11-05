import React from "react";
import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import styles from "@styles/styles";

export default function ActivityCard(props) {
  const { title, text, image } = props;
  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          backgroundColor: "green",
          width: 180,
          height: 140,
          justifyContent: "center",
          borderTopLeftRadius: "25%",
          borderTopRightRadius: "25%",
        }}
      >
        <Image style={[styles.activityImage]} source={image} />
      </View>
      <View
        style={{
          background: "rgb(255,211,61)",
          background:
            "linear-gradient(0deg, rgba(255,211,61,1) 0%, rgba(17,233,224,1) 83%)",
          paddingVertical: 20,
          borderBottomLeftRadius: "25%",
          borderBottomRightRadius: "25%",
        }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>{title}</Text>
        <Text style={{ textAlign: "center" }}>{text}</Text>
      </View>
    </View>
  );
}
