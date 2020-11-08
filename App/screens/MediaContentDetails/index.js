import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import NavHome from "../../components/NavHome";
import MediaContentComments from "../../components/MediaContentComments";
import styles from "@styles/styles";
import colors from "@assets/colors";
import images from "@assets/colors";
import fonts from "@assets/fonts";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function MediaContentDetails({ route, navigation }) {
  const { title, person, topColor, bottomColor, video } = route.params;
  const [comment, setComment] = useState("");

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
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
      <View style={[styles.cardContainer, { marginTop: 0, marginBottom: 10 }]}>
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

      <View
        style={{
          backgroundColor: colors.ltPurple,
          marginHorizontal: 10,
          width: "95%",
          borderRadius: 25,
        }}
      >
        <View
          style={{
            backgroundColor: colors.purple,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <Text style={{ alignSelf: "center", color: "white" }}>
            NameOfPersonWhoIsLoggedIn
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              color: colors.purple,
              margin: 10,
              width: "60%",
            }}
            placeholder='"Write comment here..."'
            placeholderTextColor={colors.purple}
            multiline={true}
            onChangeText={(text) => setComment(text)}
            value={comment}
          />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: colors.purple,
              width: "30%",
              borderBottomRightRadius: 25,
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: colors.ltPurple,
                  borderRadius: 25,
                  padding: 10,
                  margin: 10,
                  width: "90%",
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color: "white",
                    fontFamily: fonts.bold,
                  }}
                >
                  Record
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    color: "white",
                    fontFamily: fonts.bold,
                  }}
                >
                  video
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    color: "white",
                    fontFamily: fonts.bold,
                  }}
                >
                  message
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: colors.ltPurple,
                  borderRadius: 25,
                  padding: 10,
                  margin: 10,
                  width: "90%",
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color: "white",
                    fontFamily: fonts.bold,
                  }}
                >
                  Submit
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    color: "white",
                    fontFamily: fonts.bold,
                  }}
                >
                  message
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{ marginHorizontal: 10 }}
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
    </View>
  );
}
