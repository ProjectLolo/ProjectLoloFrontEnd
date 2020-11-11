import React from "react";
import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
import { AuthContext } from "../../context/Auth";
import { useQuery } from "@apollo/client";
import NavHome from "../../components/NavHome";
import NavButtons from "../../components/NavButtons";
import MediaContentCard from "../../components/MediaContentCard";
import styles from "@styles/styles";
import images from "@assets/images";
import { GET_LOVEBANKS } from "../../../graphql/queries";

export default function LoveBank({ route, navigation }) {
  //hardcoded kidId, not sure atm where to get it from
  const { data } = useQuery(GET_LOVEBANKS, {
    variables: {
      kidId: route.params.activeKid,
    },
  });

  // const cardContent = [
  //   {
  //     id: 1,
  //     title: "Kid goes to bed story",
  //     person: "dad",
  //     topColor: "pink",
  //     bottomColor: "purple",
  //     video: images.videoCameraPurple,
  //   },
  // ];
  // if (!data) {
  //   return (
  //     <View>
  //       <Text>...loading</Text>
  //     </View>
  //   );
  // }
  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      <NavHome />
      <Text style={styles.titleText}>Welcome to [kid]'s love bank!</Text>
      <FlatList
        style={{ marginBottom: 10 }}
        contentContainerStyle={{
          alignSelf: "center",
        }}
        data={data && data.loveBanks}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("MediaContentDetails")}
            >
              <MediaContentCard
                title={item.title}
                person={item.userId}
                topColor="pink"
                bottomColor="purple"
                video={images.videoCameraPurple}
              />
            </TouchableWithoutFeedback>
          );
        }}
      />
      <NavButtons screen="LoveBank" />
    </View>
  );
}
