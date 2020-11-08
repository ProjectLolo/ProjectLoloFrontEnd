import React from "react";
import { View, Text } from "react-native";

export default function MediaContentComments(props) {
  const { person, text, video } = props;
  return (
    <View>
      <Text>{person}</Text>
    </View>
  );
}
