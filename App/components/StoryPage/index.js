import React from "react";
import { FlatList, View, Text, Button, TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function StoryPage(props) {
  return (
    <View>
      <View>
        <Image source={page.icon} />
      </View>
      <TouchableWithoutFeedback>
        <FlatList
          contentContainerStyle={{
            alignSelf: "center",
          }}
        >
          <Text>{page.content}</Text>
          <Button title="next page"></Button>
        </FlatList>
      </TouchableWithoutFeedback>
      
    </View>
  );
}
