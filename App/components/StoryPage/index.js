import React, { useState, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const screenHeight = Dimensions.get("window").height;

export default function StoryPage(props) {
  const { pages } = props;

  const scrollRef = useRef();
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
    if (i < pages.length - 1) {
      setI(i + 1);
      scrollRef.current?.scrollTo({
        y : 0,
        animated : true
    });
    } else {
      setI(pages.length - 1);
    }
  }

  function previous() {
    if (i > 0) {
      setI(i - 1);
    } 
  }
  console.log(i);

  console.log("pages content", pages);
  return (
    <View style={{ height: (screenHeight * 1 / 3) }}>
      {/* <View>
       {pages[i].image ? <Image style={{width:300, height:300}}source={pages[i].image} />
       :
       null}
      </View> */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{
          alignSelf: "center",
        }}
      >
        <Text style={{paddingLeft:40, paddingRight:40, lineHeight: 40 }}>{pages[i].content}</Text>
        <View style={{flex:1, flexDirection:"row", justifyContent:"space-between"}}>
        {i > 0 ? 
          
          <MaterialIcons
                      name="navigate-before"
                      size={100}
                      color="purple"
                      onPress={previous}
                    />
         : <MaterialIcons style={{visibility:"hidden"}} />
          }
        <MaterialIcons
                      name="navigate-next"
                      size={100}
                      color="purple"
                      onPress={next}
                    />
        </View>
      </ScrollView>
    </View>
  );
}
