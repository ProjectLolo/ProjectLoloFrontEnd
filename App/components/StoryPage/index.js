import React from "react";
import {
  FlatList,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
} from "react-native";

export default function StoryPage(props) {
  
  // const {pages} = props
  
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

  function next () {
  if(i == pages.length-1) 
  {i=0;}
  else
  {i=i+1;}
  }

  function next(){
    console.log("next")
  }

  console.log("pages content", pages.content)
  return (
    
    <View style={{height: 400}}>
      <View>
        {/* <Image source={page.icon} /> */}
      </View>
      <TouchableWithoutFeedback>
        <FlatList
          contentContainerStyle={{
            alignSelf: "center",
          }}
        >
          <Text>{pages.content}</Text>
          <Button title="next page" onPress={next()}></Button>
        </FlatList>
      </TouchableWithoutFeedback>
    </View>
  );
}
