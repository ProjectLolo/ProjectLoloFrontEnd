import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const screenHeight = Dimensions.get("window").height;

export default function StoryPage(props) {
  const { pages } = props;

  const [i, setI] = useState(0);

  // const pages = [
  //   {
  //     id: 1,
  //     content: "this is page 1",
  //   },
  //   {
  //     id: 2,
  //     content: "this is page 2",
  //   },
  //   {
  //     id: 3,
  //     content: "this is page 3",
  //   },
  // ];

  function next() {
    if( i < pages.length - 1) {
    setI(i + 1) 
  } else {
    setI(pages.length - 1)
  }
}
  console.log(i);

  console.log("pages content", pages);
  return (
    <View style={{ height: (screenHeight * 1) / 3 }}>
      <View>{/* <Image source={page.icon} /> */}</View>
      <ScrollView
        contentContainerStyle={{
          alignSelf: "center",
        }}
      >
        <Text>{pages[i].content}</Text>

        <Button title="next page" onPress={next}></Button>
      </ScrollView>
    </View>
  );
}
