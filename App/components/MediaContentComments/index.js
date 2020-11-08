import React from "react";
import { View, Text, Image } from "react-native";
import styles from "@styles/styles";
import colors from "@assets/colors";
import fonts from "@assets/fonts";
import images from "@assets/images";

export default function MediaContentComments(props) {
  const { person, text, video } = props;

  return (
    <View
      style={{
        backgroundColor: colors.pink,
        marginVertical: 10,
        borderRadius: 25,
      }}
    >
      <View
        style={{
          backgroundColor: colors.dkPink,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: 20,
            marginVertical: 5,
            color: "white",
            fontFamily: fonts.bold,
            fontSize: 16,
          }}
        >
          {person}
        </Text>
      </View>
      {text ? (
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: 20,
            marginVertical: 5,
            color: "white",
            fontFamily: fonts.regular,
            fontSize: 16,
          }}
        >
          {text}
        </Text>
      ) : (
        <View
          style={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Image
            style={{
              width: "100%",
              height: 250,

              borderBottomRightRadius: 25,
              borderBottomLeftRadius: 25,
              resizeMode: "contain",
              alignSelf: "center",
            }}
            source={images.videoCameraPurple}
          />
        </View>
      )}
    </View>
  );
}
