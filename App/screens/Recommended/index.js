import React, { useEffect, useState } from "react";

import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
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
      image: images.Share,
      nav: "ShareSomething",
    },
    {
      id: 2,
      image: images.Read,
      nav: "ReadAStory",
    },
    {
      id: 3,
      image: images.Teach,
      nav: "Teach",
    },
    {
      id: 4,
      image: images.Sing,
      nav: "SingASong",
    },
  ];

  const cardContent2 = [
    {
      id: 1,
      image: images.Share,
      nav: "ShareSomething",
    },
    {
      id: 2,
      image: images.Read,
      nav: "ReadAStory",
    },
    {
      id: 3,
      image: images.Teach,
      nav: "Teach",
    },
    {
      id: 4,
      image: images.Sing,
      nav: "SingASong",
    },
    {
      id: 5,
      image: images.Activate,
      nav: "Activate",
    },
    {
      id: 6,
      image: images.Fun,
      nav: "FunAnimals",
    },
    {
      id: 7,
      image: images.Memory,
      nav: "HolidayMemory",
    },
    {
      id: 8,
      image: images.Sing,
      nav: "TakeVideo",
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

      <NavHome screen="Recommended"/>
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
            return <ActivityCard image={item.image} nav={item.nav} />;
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
                <ActivityCard image={item.image} nav={item.nav} />
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

      <NavButtons screen="Recommended" />
    </View>
  );
}
