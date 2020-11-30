import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
import styles from "@styles/styles";
import images from "@assets/images";
import ActivityCard from "../../components/ActivityCard";
import NavButtons from "../../components/NavButtons";
import NavHome from "../../components/NavHome";

import {
  share,
  read,
  teach,
  sing,
  activate,
  fun,
  memory,
} from "../CreateContent/tempStories";

import { useQuery } from "@apollo/client";
import { GET_ALL_KIDS } from "../../../graphql/queries";
import { useIsFocused } from "@react-navigation/native";


export default function Recommended({ route, navigation }) {
  const isFocused = useIsFocused();
  const [showMore, setShowMore] = useState(false);
  const [kidData, setKidData] = useState("");

  const { data, refetch, loading: dataLoading } = useQuery(GET_ALL_KIDS, {
    variables: {
      userId: route.params.activeUser,
    },
    onCompleted(fetchedData) {},
  });

  useEffect(() => {
    refetch();
    data && setKidData(data);
  }, [data, isFocused, refetch]);


  const cardContent = [
    {
      id: 1,
      image: images.Share,
      nav: "ShareSomething",
      stories: share,
    },
    {
      id: 2,
      image: images.Read,
      nav: "ReadAStory",
      stories: read,
    },
    {
      id: 3,
      image: images.Teach,
      nav: "Teach",
      stories: teach,
    },
    {
      id: 4,
      image: images.Sing,
      nav: "SingASong",
      stories: sing,
    },
  ];

  const cardContent2 = [
    {
      id: 1,
      image: images.Share,
      nav: "ShareSomething",
      stories: share,
    },
    {
      id: 2,
      image: images.Read,
      nav: "ReadAStory",
      stories: read,
    },
    {
      id: 3,
      image: images.Teach,
      nav: "Teach",
      stories: teach,
    },
    {
      id: 4,
      image: images.Sing,
      nav: "SingASong",
      stories: sing,
    },
    {
      id: 5,
      image: images.Activate,
      nav: "Activate",
      stories: activate,
    },
    {
      id: 6,
      image: images.Fun,
      nav: "Fun",
      stories: fun,
    },
    {
      id: 7,
      image: images.Memory,
      nav: "Memory",
      stories: memory,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
      }}
    >
      <NavHome screen="Recommended" />
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
            return (
              <ActivityCard
                image={item.image}
                nav={item.nav}
                stories={item.stories}
              />
            );
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
                <ActivityCard
                  image={item.image}
                  nav={item.nav}
                  stories={item.stories}
                />
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

      <NavButtons
        screen="Recommended"
        userId={route.params.activeUser}
        kidName={route.params.kidName}
        kidData={kidData}
      />
    </View>
  );
}
