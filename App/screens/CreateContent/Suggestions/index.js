import React, { useEffect, useState } from "react";

import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
import styles from "@styles/styles";
import images from "@assets/images";
import StoryCard from "../../../components/StoryCard";
import NavButtons from "../../../components/NavButtons";
import NavHome from "../../../components/NavHome";
import { useIsFocused } from "@react-navigation/native";
import {tempStories} from "../tempStories"

export default function Recommended({ navigation }) {

    const [stories, setStories] = useState(tempStories);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
      }}
    >
      <NavHome screen="Recommended" />
      <Text style={[styles.title, { marginTop: 0 }]}>
        {"Content Suggestions"}
      </Text>
        <FlatList
          style={{ marginBottom: "-5%", marginTop: "-5%" }}
          contentContainerStyle={{
            alignSelf: "center",
            flexGrow: 1,
            justifyContent: "center",
            width: "90%",
          }}
          data={stories}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <StoryCard item={item}/>;
          }}
        />
    
            {/* <FlatList
            style={{ marginBottom: 10 }}
            contentContainerStyle={{
                alignSelf: "center",
                flexGrow: 1,
                justifyContent: "center",
                width: "90%",
            }}
            data={stories}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                return (
                <TouchableWithoutFeedback>
                    <StoryCard item={item} />
                </TouchableWithoutFeedback>
                );
            }}
            /> */}

      {/* {!showMore && (
        <TouchableWithoutFeedback
          onPress={() => (!showMore ? setShowMore(true) : setShowMore(false))}
        >
          <View style={[styles.loginButton, { marginBottom: "5%" }]}>
            <Text style={styles.loginButtonText}>SEE MORE SUGGESTIONS</Text>
          </View>
        </TouchableWithoutFeedback>
      )} */}

      <NavButtons screen="Recommended" />
    </View>
  );
}
