import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as VideoThumbnails from 'expo-video-thumbnails';
import styles from "@styles/styles";
import adjust from "../../styles/adjust";
import colors from "@assets/colors";
import images from "@assets/images";
import fonts from "@assets/fonts";
import { useNavigation } from "@react-navigation/native";

export default function MediaContentCard(props) {
  const [titleVid, setTitleVid] = useState("");
  const [recImage, setRecImage] = useState(null);
  const [backCol, setBackCol] = useState(colors.black);
  const [sizeImage, setSizeImage] = useState({
    width: 0,
    height: 0,
    loading: true,
  });
  const [thumbnail, setThumbnail] = useState("")
  const navigation = useNavigation();
  const {
    title,
    person,
    topColor,
    bottomColor,
    video,
    loveBankId,
    likes,
    category,
    preview,
    firstName,
    type
  } = props;
  console.log(video);
  console.log("MEDIA CARD PREVIEW", preview)
  useEffect(() => { 
    if (category === "share") {
      setTitleVid("Share Something");
      setRecImage(images.RecShare);
      setBackCol(colors.teal);
    }
  }, [category]);

  useEffect(() => {
    if (preview) {
      setSizeImage({ ...setSizeImage, loading: true });
      Image.getSize(
        preview,
        (width, height) => {
          setSizeImage({ width: width, height: height, loading: false });
          console.log("SIZE??????????", sizeImage)
        },
        (error) => {
          setSizeImage({ ...sizeImage, loading: false });
          console.log("Size Image ERROR:", error);
        }
      );
    }
  }, [preview]);

  useEffect(()=>{
    generateThumbnail()
  },[video])

  const generateThumbnail = async () => {
    if(type === "video"){
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        video,
        {
          time: 15000,
        }
      );
      setThumbnail(uri);
    } catch (e) {
      console.warn(e);
    }} else {
      setThumbnail(video)
    }
  };

  console.log("sizeImage", sizeImage);

  const width = sizeImage.width > sizeImage.height ? 180 : 90;
  const height = sizeImage.height > sizeImage.width ? 183.75 : 120;

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("MediaContentDetails", {
          backCol,
          firstName,
          titleVid,
          loveBankId,
          video,
          preview,
          person,
          recImage,
          likes,
          type
        })
      }
    >
      <View
        style={[
          {
            marginHorizontal: "2.5%",
            borderRadius: 20,
            width: 180,
            height: 240,
            marginTop: "5%",
            paddingHorizontal: "5%",
            paddingVertical: "5%",
            justifyContent: "center",
          },
        ]}
      >
        <View
          style={{
            backgroundColor: colors.black,
            width: 170,
            height: 225,
            alignSelf: "center",
            justifyContent: "flex-start",
            borderRadius: 20,
            // marginBottom: sizeImage.width > sizeImage.height ? "25%" : 0,
            // padding: 5,
          }}
        >
          {sizeImage.loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Image
              style={[
                {
                  resizeMode: "contain",
                  alignSelf: "center",
                  width: 170,
                  height: 192,
                },
              ]}
              source={{ uri: thumbnail }}
            />
          )}
          <View
            style={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              width: "100%",
              height: "15%",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                position: "absolute",
              }}
              source={recImage}
            />
            <View
              style={{
                width: "60%",
                marginRight: "5%",
                marginLeft: "10%",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  {
                    width: "100%",
                    color: "white",
                    fontFamily: fonts.bold,
                    textAlign: "center",
                    fontSize: adjust(16),
                  },
                ]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}
              >
                {titleVid} by {firstName}
              </Text>
            </View>
            <Image source={images.star} style={style.heart} />
            <Text
              style={[
                styles.cardTitle,
                {
                  marginLeft: "5%",
                  marginRight: "10%",
                },
              ]}
            >
              {likes}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  heart: {
    height: 20,
    width: 20,
    alignSelf: "center",
  },
});