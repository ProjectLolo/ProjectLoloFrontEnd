import React from "react";
import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import styles from "@styles/styles";
import images from "@assets/images";
import ActivityCard from "../../components/ActivityCard";

export default function Recommended({ navigation }) {
  const cardContent = [
    {
      id: 1,
      title: "Share",
      text: "Something random",
      image: images.videoCameraPurple,
    },
    {
      id: 2,
      title: "Read",
      text: "A bedtime story",
      image: images.twitter,
    },
    {
      id: 3,
      title: "Teach",
      text: "How to count till 10",
      image: images.twitter,
    },
    {
      id: 4,
      title: "Sing",
      text: "This is the way we",
      image: images.videoCameraPurple,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.peekabondLogo} source={images.peekabondLogo} />
      <Text style={styles.titleText}>What do you want to share today?</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          backgroundColor: "red",
          justifyContent: "space-between",
          justifyContent: "space-around",
        }}
      >
        {cardContent.map((item) => {
          return (
            <ActivityCard
              key={item.id}
              title={item.title}
              text={item.text}
              image={item.image}
            />
          );
        })}
      </View>
    </View>
  );
}
