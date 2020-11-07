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
      bottomColor: "dkPink",
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
      bottomColor: "purple",
    },
    {
      id: 4,
      title: "Life lesson",
      person: "grammy Lis",
      topColor: "dkPink",
      bottomColor: "teal",
    },
    {
      id: 5,
      title: "Kid goes to bed story",
      person: "dad",
      topColor: "pink",
      bottomColor: "dkPink",
    },
    {
      id: 6,
      title: "Song",
      person: "auntie Annie",
      topColor: "purple",
      bottomColor: "yellow",
    },
    {
      id: 7,
      title: "Animal kingdom",
      person: "cousin Jan",
      topColor: "teal",
      bottomColor: "purple",
    },
    {
      id: 8,
      title: "Life lesson",
      person: "grammy Lis",
      topColor: "dkPink",
      bottomColor: "teal",
    },
    {
      id: 9,
      title: "Kid goes to bed story",
      person: "dad",
      topColor: "pink",
      bottomColor: "dkPink",
    },
    {
      id: 10,
      title: "Song",
      person: "auntie Annie",
      topColor: "purple",
      bottomColor: "yellow",
    },
    {
      id: 11,
      title: "Animal kingdom",
      person: "cousin Jan",
      topColor: "teal",
      bottomColor: "purple",
    },
    {
      id: 12,
      title: "Life lesson",
      person: "grammy Lis",
      topColor: "dkPink",
      bottomColor: "teal",
    },
    {
      id: 13,
      title: "Kid goes to bed story",
      person: "dad",
      topColor: "pink",
      bottomColor: "dkPink",
    },
    {
      id: 14,
      title: "Song",
      person: "auntie Annie",
      topColor: "purple",
      bottomColor: "yellow",
    },
    {
      id: 15,
      title: "Animal kingdom",
      person: "cousin Jan",
      topColor: "teal",
      bottomColor: "purple",
    },
    {
      id: 16,
      title: "Life lesson",
      person: "grammy Lis",
      topColor: "dkPink",
      bottomColor: "teal",
    },
  ];

  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      <NavHome />
      <Text style={styles.titleText}>Welcome to [kid]'s love bank!</Text>
      <FlatList
        style={{ marginBottom: 10 }}
        contentContainerStyle={{
          alignSelf: "center",
        }}
        data={cardContent}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("MediaContentDetails")}
            >
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
      <NavButtons screen="LoveBank" />
    </View>
  );
}
