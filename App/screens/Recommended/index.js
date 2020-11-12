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
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
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
            alignItems: "center",
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
          <Text style={styles.bottomText}>SEE MORE SUGGESTIONS</Text>
        </TouchableWithoutFeedback>
      )}

      <NavButtons screen="Recommended" />
    </View>
  );
}
