import React from "react";
import {
  FlatList,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

export default function StoryPage(props) {
  const pages = [
    {
      id: 1,
      content: "this is page 1",
    },
    {
      id: 2,
      content: "this is page 2",
    },
    {
      id: 3,
      content: "this is page 3",
    },
  ];

  const i = 0

  if(i == pages.length-1) 
  {i=0;}
  else
  {i=i+1;}

  return (
    <View>
      <View>
        {/* <Image source={page.icon} /> */}
      </View>
      <TouchableWithoutFeedback>
        <FlatList
          contentContainerStyle={{
            alignSelf: "center",
          }}
        >
          <Text>{page.content[i]}</Text>
          <Button title="next page"></Button>
        </FlatList>
      </TouchableWithoutFeedback>
    </View>
  );
}
