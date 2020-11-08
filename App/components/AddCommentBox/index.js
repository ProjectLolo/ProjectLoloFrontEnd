import React, { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import styles from "@styles/styles";
import colors from "@assets/colors";
import fonts from "@assets/fonts";

export default function AddCommentBox() {
  const [comment, setComment] = useState("");
  return (
    <View
      style={{
        backgroundColor: colors.ltPurple,
        marginHorizontal: 10,
        width: "95%",
        borderRadius: 25,
      }}
    >
      <View
        style={{
          backgroundColor: colors.purple,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <Text style={{ alignSelf: "center", color: "white" }}>
          NameOfPersonWhoIsLoggedIn
        </Text>
      </View>
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
            justifyContent: "space-between",
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
    </View>
  );
}
