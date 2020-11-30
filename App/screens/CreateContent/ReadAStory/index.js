import React, { useState, useEffect } from "react";
// import axios from "axios";
import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
// import NavButtons from "../../../components/NavButtons";
import StoryCard from "../../../components/StoryCard";
import styles from "@styles/styles";
import NavHome from "../../../components/NavHome";
import { read } from "../tempStories.js";

export default function ReadAStory({ route, navigation }) {
  const title = route.params.nav.replace(/([A-Z])/g, " $1").trim();
  // const storiesURL = "http://localhost:4000" ;

  // async function fetchAllStories() {
  //   try {
  //     const response = await axios.get(`${storiesURL}/story`);
  //     const Stories = response.data;
  //     setStories(Stories)

  //   } catch (error) {
  //     if (error.response) {
  //       console.log(error.response.data.message);
  //     } else {
  //       console.log(error.message);
  //     }
  //   }
  // }

  useEffect(() => {
    // setStories(tempStories)
    // fetchAllStories();
  }, []);
  // console.log("Stories", stories);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
      }}
    >
      <NavHome />
      <Text style={[styles.title, { marginTop: 0 }]}>{title}</Text>
      <FlatList
        style={{ marginBottom: 40, marginTop: "-5%" }}
        contentContainerStyle={{
          alignSelf: "center",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
        }}
        data={read}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback>
              <StoryCard item={item} />
            </TouchableWithoutFeedback>
          );
        }}
      />
      {/* <NavButtons
        screen="Recommended"
        userId={route.params.activeUser}
        kidName={route.params.kidName}
      /> */}
    </View>
  );
}
