import React from "react";
import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
import NavHome from "../../components/NavHome";
import NavButtons from "../../components/NavButtons";
import MediaContentCard from "../../components/MediaContentCard";
import styles from "@styles/styles";

export default function LoveBank({ navigation }) {
  const cardContent = [
    {
      id: 1,
      title: "Kid goes to bed story",
      person: "dad",
      topColor: "pink",
      bottomColor: "teal",
    },
    {
      id: 2,
      title: "Song",
      person: "auntie Annie",
      topColor: "purple",
      bottomColor: "yellow",
    },
    {
      id: 3,
      title: "Animal kingdom",
      person: "cousin Jan",
      topColor: "teal",
      bottomColor: "ltPurple",
    },
    {
      id: 4,
      title: "Life lesson",
      person: "grammy Lis",
      topColor: "yellow",
      bottomColor: "ltPink",
    },
  ];

  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      <NavHome />
      <Text style={styles.titleText}>Welcome to [kid]'s love bank!</Text>
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
              <MediaContentCard
                title={item.title}
                person={item.person}
                topColor={item.topColor}
                bottomColor={item.bottomColor}
              />
            </TouchableWithoutFeedback>
          );
        }}
      />
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Settings")}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to Settings
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("MediaContentDetails")}
      >
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to MediaContentDetails
        </Text>
      </TouchableWithoutFeedback>
      <NavButtons screen="LoveBank" />
    </View>
  );
}
