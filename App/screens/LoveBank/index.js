import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  RefreshControl,
} from "react-native";
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

  const [loveBanks, setLoveBanks] = useState([]);
  const { data, refetch } = useQuery(GET_LOVEBANKS, {
    variables: {
      kidId: route.params.activeKid,
    },
  });

  useEffect(() => {
    refetch();
    setLoveBanks(data);
  }, [refetch, data]);

  if (!loveBanks) {
    return (
      <View>
        <Text>...loading</Text>
      </View>
    );
    ``;
  }
  console.log("NUMBER OF LIKES", data);
  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      <NavHome />
      <Text style={styles.titleText}>Welcome to [kid]'s love bank!</Text>
      <FlatList
        style={{ marginBottom: 10 }}
        contentContainerStyle={{
          alignSelf: "center",
        }}
        data={loveBanks.loveBanks}
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
                loveBankId={item._id}
              />
            </TouchableWithoutFeedback>
          );
        }}
      />
      <NavButtons screen="LoveBank" />
    </View>
  );
}
