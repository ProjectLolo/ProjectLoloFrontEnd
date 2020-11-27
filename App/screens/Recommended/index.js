import React, { useEffect, useState } from "react";

import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
import styles from "@styles/styles";
import images from "@assets/images";
import ActivityCard from "../../components/ActivityCard";
import NavButtons from "../../components/NavButtons";
import NavHome from "../../components/NavHome";
import {
  read,
  teach,
  sing,
  activate,
  fun,
  memory,
} from "../CreateContent/tempStories";

export default function Recommended({ route, navigation }) {
  const [showMore, setShowMore] = useState(false);
  console.log("ROUTE PARAMS IN REC", route.params);

  const cardContent = [
    {
      id: 1,
      image: images.Share,
      nav: "ShareSomething",
      stories: "",
    },
    {
      id: 2,
      image: images.Read,
      nav: "ReadAStory",
      stories: read,
    },
    {
      id: 3,
      image: images.Teach,
      nav: "Teach",
      stories: teach,
    },
    {
      id: 4,
      image: images.Sing,
      nav: "SingASong",
      stories: sing,
    },
  ];

  const cardContent2 = [
    {
      id: 1,
      image: images.Share,
      nav: "ShareSomething",
      stories: "",
    },
    {
      id: 2,
      image: images.Read,
      nav: "ReadAStory",
      stories: read,
    },
    {
      id: 3,
      image: images.Teach,
      nav: "Teach",
      stories: teach,
    },
    {
      id: 4,
      image: images.Sing,
      nav: "SingASong",
      stories: sing,
    },
    {
      id: 5,
      image: images.Activate,
      nav: "Activate",
      stories: activate,
    },
    {
      id: 6,
      image: images.Fun,
      nav: "Fun",
      stories: fun,
    },
    {
      id: 7,
      image: images.Memory,
      nav: "Memory",
      stories: memory,
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
      <NavHome screen="Recommended" />
      <Text style={[styles.title, { marginTop: 0 }]}>
        {"What do you want to \n share today?"}
      </Text>
      {!showMore ? (
        <FlatList
          style={{ marginBottom: "-5%", marginTop: "-5%" }}
          contentContainerStyle={{
            alignSelf: "center",
            flexGrow: 1,
            justifyContent: "center",
            width: "90%",
          }}
          data={cardContent}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <ActivityCard
                image={item.image}
                nav={item.nav}
                stories={item.stories}
              />
            );
          }}
        />
      ) : (
        <FlatList
          style={{ marginBottom: 10 }}
          contentContainerStyle={{
            alignSelf: "center",
            flexGrow: 1,
            justifyContent: "center",
            width: "90%",
          }}
          data={cardContent2}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback>
                <ActivityCard
                  image={item.image}
                  nav={item.nav}
                  stories={item.stories}
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
          <View style={[styles.loginButton, { marginBottom: "5%" }]}>
            <Text style={styles.loginButtonText}>SEE MORE SUGGESTIONS</Text>
          </View>
        </TouchableWithoutFeedback>
      )}

      <NavButtons
        screen="Recommended"
        userId={route.params.activeUser}
        kidName={route.params.kidName}
      />
    </View>
  );
}
