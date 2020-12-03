import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import styles from "@styles/styles";
import { MaterialIcons } from "@expo/vector-icons";
import SvgUri from "expo-svg-uri";

const screenHeight = Dimensions.get("window").height;

export default function StoryPage(props) {
  const { pages } = props;

  const scrollRef = useRef();
  const [i, setI] = useState(0);

  const imageFile = pages[i].image;
  const fileExtension = imageFile.split(".").pop();

  console.log("this is File ExT",fileExtension)
  // useEffect(() => {
  //   scrollRef.current?.scrollTo({
  //         y : -9999,
  //         animated : true
  //     });
  // }, [])

  function next() {
    if (i < pages.length - 1) {
      setI(i + 1);
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
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

  console.log("pages content", pages[i].image);
  return (
    <View style={{ height: (screenHeight * 1) / 3 }}>
      
      {pages[i].image && fileExtension === "svg" ? (
        <SvgUri
          width="200"
          height="200"
          source={{
            uri: pages[i].image,
          }}
          style={{
            marginTop: (screenHeight * -1) / 4 - 30,
            marginBottom: 50,
            zIndex: 999,
          }}
        />
      ) : pages[i].image && fileExtension === "png?raw=true" ? (
        <Image
          source={{ uri: pages[i].image,}}
          style={{
            width:150,
            height:150,
            marginTop: (screenHeight * -1) / 4,
            marginBottom: 70,
            zIndex: 999,
          }}
        />
      ) : null}

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{
          alignSelf: "center",
        }}
      >
        <View>
        <Text style={{color: "red", justifyContent: "space-between"}}>
          This feature is still under construction.
        </Text>
        </View>
        <Text
          style={[
            { paddingLeft: 40, paddingRight: 40, lineHeight: 40 },
            styles.bold,
          ]}
        >
          {pages[i].content}
        </Text>
        
      </ScrollView>
      <View style={{ flexDirection: "row", textAlign: 'center' }}>
        {i > 0 ? (
          <MaterialIcons
            name="navigate-before"
            size={80}
            style={styles.purpleText}
            onPress={previous}
          />
        ) : (
          <MaterialIcons style={{ color: "white" }} />
        )}
        <MaterialIcons
          name="navigate-next"
          size={80}
          style={styles.purpleText}
          onPress={next}
        />
      </View>
    </View>
  );
}
