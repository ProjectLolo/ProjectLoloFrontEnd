import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from "react-native";
import NavHome from "../../components/NavHome";
import MediaContentComments from "../../components/MediaContentComments";
import styles from "@styles/styles";
import colors from "@assets/colors";
import images from "@assets/colors";

export default function MediaContentDetails({ route, navigation }) {
  const { title, person, topColor, bottomColor, video } = route.params;

  const cardContent = [
    {
      id: 1,
      person: "mom",
      text: "Love this video!",
      video: null,
    },
    {
      id: 2,
      person: "auntie Annie",
      text: "Very well read!",
      video: null,
    },
    {
      id: 3,
      person: "cousin Jan",
      text: null,
      video: images.videoCameraPurple,
    },
  ];

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <NavHome />
      <View style={styles.cardContainer}>
        <View
          style={{
            backgroundColor: colors[topColor],
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 35,
            justifyContent: "center",
          }}
        >
          <Text
            style={[styles.cardTitle, { paddingHorizontal: 5 }]}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            {title} by {person}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors[bottomColor],
            justifyContent: "center",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            padding: 50,
          }}
        >
          <Image style={styles.cardImage} source={video} />
        </View>
      </View>

      <FlatList
        style={{ marginBottom: 10 }}
        contentContainerStyle={{
          alignSelf: "center",
        }}
        data={cardContent}
        numColumns={1}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("MediaContentDetails")}
            >
              <MediaContentComments
                person={item.person}
                text={item.text}
                video={item.video}
              />
            </TouchableWithoutFeedback>
          );
        }}
      />

      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Recommended")}
      >
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to Recommended
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
