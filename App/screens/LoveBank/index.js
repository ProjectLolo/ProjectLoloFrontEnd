import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import NavHome from "../../components/NavHome";
import NavButtons from "../../components/NavButtons";
import MediaContentCard from "../../components/MediaContentCard";
import styles from "@styles/styles";
import { useIsFocused } from "@react-navigation/native";
import { GET_LOVEBANKS } from "../../../graphql/queries";

export default function LoveBank({ route, navigation }) {
  //hardcoded kidId, not sure atm where to get it from
  const isFocused = useIsFocused();
  const [loveBanks, setLoveBanks] = useState([]);
  const { kidData } = route.params;

  const { data, refetch } = useQuery(GET_LOVEBANKS, {
    variables: {
      kidId: route.params.activeKid,
    },
    onError(error) {
      console.log("error", error.graphQLErrors);
    },
    onCompleted(fetchedData) {
      console.log("works", fetchedData);
    },
  });


  useEffect(() => {
    refetch();
    setLoveBanks(data);
  }, [refetch, data, isFocused]);

  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      <NavHome />
      <Text style={styles.titleText}>
        Welcome to {route.params.kidName}'s love bank!
      </Text>
      <FlatList
        style={{ marginBottom: 10 }}
        contentContainerStyle={{
          alignSelf: "center",
        }}
        data={loveBanks && loveBanks.loveBanks}
        numColumns={2}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("MediaContentDetails")}
            >
              <MediaContentCard
                title={item.title}
                type={item.type}
                person={item.userId._id}
                topColor="pink"
                bottomColor="purple"
                loveBankId={item._id}
                likes={item.likes.length}
                category={item.category}
                preview={item.url}
                video={item.url}
                firstName={item.userId.firstName}
          
              />
            </TouchableWithoutFeedback>
          );
        }}
      />
      <NavButtons
        screen="LoveBank"
        userId={route.params.activeUser}
        kidName={route.params.kidName}
        kidData={kidData}
      />
    </View>
  );
}
