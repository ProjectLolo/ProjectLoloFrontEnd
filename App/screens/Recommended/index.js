import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import styles from "@styles/styles";
import images from "@assets/images";
import ActivityCard from "../../components/ActivityCard";
import NavButtons from "../../components/NavButtons";
import NavHome from "../../components/NavHome";
import { useIsFocused } from "@react-navigation/native";

export default function Recommended({ navigation }) {
  const [showMore, setShowMore] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setShowMore(false);
    }
  }, [isFocused]);

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

  const cardContent2 = [
    {
      id: 1,
      title: "Share",
      text: "Something random",
      image: images.videoCameraPurple,
      top1: "pink",
      top2: "ltPink",
      bottom1: "teal",
      bottom2: "yellow",
      nav: "ShareSomething"
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
    {
      id: 5,
      title: "Teach",
      text: "How to count till 10",
      image: images.monkey,
      top1: "teal",
      top2: "orange",
      bottom1: "ltPurple",
      bottom2: "purple",
    },
    {
      id: 6,
      title: "Sing",
      text: "This is the way we",
      image: images.twitter,
      top1: "yellow",
      top2: "teal",
      bottom1: "ltPink",
      bottom2: "orange",
    },
  ];

  //see more suggestions doesn't bring you to another screen...(library), it just shows more suggestions on the recommended page.
  //ternary style. useState.

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
      }}
    >
      <NavHome />
      <Text style={styles.titleText}>What do you want to share today?</Text>

      {!showMore ? (
        <FlatList
          contentContainerStyle={{
            alignSelf: "center",
          }}
          data={cardContent}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback>
                <ActivityCard
                  title={item.title}
                  text={item.text}
                  image={item.image}
                  top1={item.top1}
                  top2={item.top2}
                  bottom1={item.bottom1}
                  bottom2={item.bottom2}
                  nav={item.nav}
                />
              </TouchableWithoutFeedback>
            );
          }}
        />
      ) : (
        <FlatList
          style={{ marginBottom: 10 }}
          contentContainerStyle={{
            alignSelf: "center",
          }}
          data={cardContent2}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback>
                <ActivityCard
                  title={item.title}
                  text={item.text}
                  image={item.image}
                  top1={item.top1}
                  top2={item.top2}
                  bottom1={item.bottom1}
                  bottom2={item.bottom2}
                />
              </TouchableWithoutFeedback>
            );
          }}
        />
      )}
      {!showMore && (
        <TouchableWithoutFeedback
          onPress={() => (!showMore ? setShowMore(true) : setShowMore(false))}
        >
          <Text style={styles.bottomText}>SEE MORE SUGGESTIONS</Text>
        </TouchableWithoutFeedback>
      )}

      <NavButtons page="Recommended" />
    </View>
  );
}
