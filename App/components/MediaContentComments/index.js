import React from "react";
import { View, Text, Image } from "react-native";
import styles from "@styles/styles";
import colors from "@assets/colors";
import fonts from "@assets/fonts";
import images from "@assets/images";
import moment from "moment";

export default function MediaContentComments(props) {
  const { person, text, video, date } = props;
  console.log("CREATED AT???", date);

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
        <View style={{ flexDirection: "column", width: "100%" }}>
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
          <Text
            style={{
              alignSelf: "flex-end",
              marginRight: 20,
              marginVertical: 5,
              color: "white",
              fontFamily: fonts.regular,
              fontSize: 9,
            }}
          >
            {moment(date).format("MMMM Do YYYY, h:mm:ss a")}
          </Text>
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            padding: 50,
          }}
        >
          <Image style={styles.cardImage} source={images.videoCameraPurple} />
        </View>
      )}
    </View>
  );
}
