import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import styles from "@styles/styles";
import colors from "@assets/colors";
import fonts from "@assets/fonts";
import images from "@assets/images";

export default function CommentBox() {
  const [comment, setComment] = useState("");
  const [writeComment, setWriteComment] = useState(false);
  return (
    <View
      style={{
        backgroundColor: colors.ltPurple,
        marginHorizontal: 10,
        width: "95%",
        borderRadius: 25,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          backgroundColor: colors.purple,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          padding: 5,
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            color: "white",
            fontFamily: fonts.bold,
            fontSize: 16,
          }}
        >
          {!writeComment
            ? "Want to leave a message?"
            : `NameOfPersonWhoIsLoggedIn`}
        </Text>
      </View>
      {!writeComment ? (
        <TouchableWithoutFeedback onPress={() => setWriteComment(true)}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                alignSelf: "center",
                resizeMode: "contain",
              }}
              source={images.tap}
            />
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontFamily: fonts.regular,
                fontSize: 16,
                padding: 5,
              }}
            >
              - Click here! -
            </Text>
            <Image
              style={{
                width: 20,
                height: 20,
                alignSelf: "center",
                resizeMode: "contain",
              }}
              source={images.tap}
            />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              color: colors.purple,
              margin: 10,
              marginHorizontal: 20,
              width: "60%",
            }}
            placeholder='"Write comment here..."'
            placeholderTextColor={colors.purple}
            multiline={true}
            onChangeText={(text) => setComment(text)}
            value={comment}
          />
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: colors.purple,
              width: "30%",
              borderBottomRightRadius: 25,
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: colors.ltPurple,
                  borderRadius: 25,
                  padding: 10,
                  margin: 10,
                  width: "90%",
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color: "white",
                    fontFamily: fonts.bold,
                  }}
                >
                  Record
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    color: "white",
                    fontFamily: fonts.bold,
                  }}
                >
                  video
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    color: "white",
                    fontFamily: fonts.bold,
                  }}
                >
                  message
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setComment("");
                setWriteComment(false);
              }}
            >
              <View
                style={{
                  backgroundColor: colors.ltPurple,
                  borderRadius: 25,
                  padding: 10,
                  margin: 10,
                  width: "90%",
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color: "white",
                    fontFamily: fonts.bold,
                  }}
                >
                  Submit
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    color: "white",
                    fontFamily: fonts.bold,
                  }}
                >
                  message
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )}
    </View>
  );
}
