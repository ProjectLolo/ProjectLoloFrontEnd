import React from "react";
import { View, Text, Image } from "react-native";
import styles from "@styles/styles";
import colors from "@assets/colors";
import fonts from "@assets/fonts";
import images from "@assets/images";

export default function MediaContentComments(props) {
  const { person, text, video } = props;

  function addComment() {
    if (text && !video) {
      return (
        <Text
          style={{
            alignSelf: "left",
            marginLeft: 20,
            marginVertical: 5,
            color: "white",
            fontFamily: fonts.regular,
            fontSize: 16,
          }}
        >
          {text}
        </Text>
      );
    }

    if (video && !text) {
      return (
        <View
          style={{
            backgroundColor: colors.teal,
            justifyContent: "center",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            padding: 100,
          }}
        >
          <Text>hello</Text>
          <Image
            style={[styles.cardImage, { backgroundColor: "blue" }]}
            source={images.videoCameraPurple}
          />
        </View>
      );
    }
  }

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
            alignSelf: "left",
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
            backgroundColor: colors.teal,
            justifyContent: "center",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            padding: 100,
          }}
        >
          <Text>hello</Text>
          <Image
            style={[styles.cardImage, { backgroundColor: "blue" }]}
            source={images.videoCameraPurple}
          />
        </View>
      )}
      {addComment()}
    </View>
  );
}
