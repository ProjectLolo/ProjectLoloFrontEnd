import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  FlatList
} from "react-native";
import StoryCard from "../../../components/StoryCard";


export default function ShareSomething({ navigation }) {
  const [stories, setStories] = useState([])

  const storiesURL = "http://192.168.42.37:4000";

  async function fetchAllStories() {
    try {
      const response = await axios.get(`${storiesURL}/story`);
      const Stories = response.data;
      setStories(Stories)
      
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  }

  console.log("Stories", stories);

  useEffect(() => {
    fetchAllStories();
  }, []);

  return (
    <View style={styles.container}>
     <FlatList
          contentContainerStyle={{
            alignSelf: "center",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
          }}
          data={stories}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <StoryCard item={item} />;
          }}
        />
    </View>
  );
}
const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },
  icon: {
    width: 60,
    height: 60,
  },
  image: {
    width: 240,
    height: 240,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mainContainer: {
    width: 300,
    flexDirection: "column",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
