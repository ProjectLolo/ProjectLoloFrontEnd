import React from "react";
import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import styles from "@styles/styles";
import images from "@assets/images";
import ActivityCard from "../../components/ActivityCard";
import NavButtons from "../../components/NavButtons";

export default function Recommended({ navigation }) {
  const cardContent = [
    {
      id: 1,
      title: "Share",
      text: "Something random",
      image: images.videoCameraPurple,
      top1: "pink",
      top2: "ltPink",
      bottom1: "teal",
      bottom2: "yellow",
    },
    {
      id: 2,
      title: "Read",
      text: "A bedtime story",
      image: images.chat,
      top1: "purple",
      top2: "ltPink",
      bottom1: "yellow",
      bottom2: "dkPink",
    },
    {
      id: 3,
      title: "Teach",
      text: "How to count till 10",
      image: images.monkey,
      top1: "teal",
      top2: "orange",
      bottom1: "ltPurple",
      bottom2: "purple",
    },
    {
      id: 4,
      title: "Sing",
      text: "This is the way we",
      image: images.twitter,
      top1: "yellow",
      top2: "teal",
      bottom1: "ltPink",
      bottom2: "orange",
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
      }}
    >
      <Image style={styles.peekabondLogo} source={images.peekabondLogo} />
      <Text style={styles.titleText}>What do you want to share today?</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
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
              top1={item.top1}
              top2={item.top2}
              bottom1={item.bottom1}
              bottom2={item.bottom2}
            />
          );
        })}
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Library")}>
        <Text style={styles.bottomText}>SEE MORE SUGGESTIONS</Text>
      </TouchableWithoutFeedback>
      <NavButtons page="Recommended" />
    </View>
  );
}
