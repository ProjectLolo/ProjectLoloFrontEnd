import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { useMutation } from "@apollo/client";

import { CREATE_COMMENT } from "../../../graphql/mutations";
import styles from "@styles/styles";
import colors from "@assets/colors";
import fonts from "@assets/fonts";
import images from "@assets/images";

export default function CommentBox({ loveBankId, refetch, firstName }) {
  const [variables, setVariables] = useState({
    loveBankId: loveBankId,
    comment: "",
  });
  console.log(variables);

  const [commentLovebank, { error }] = useMutation(CREATE_COMMENT, {
    onError: (error) => console.log("hi from the commentbox"),
    onCompleted(data) {
      console.log("succes!", data);
      setVariables({ ...variables, comment: "" });
      refetch();
    },
  });

  function submitComment(e) {
    // e.preventDefault();

    commentLovebank({ variables });
  }

  const [writeComment, setWriteComment] = useState(false);
  return (
    <View
      style={{
        backgroundColor: colors.ltPurple,
        borderRadius: 25,
        marginBottom: "5%",
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
          {!writeComment ? "Want to leave a message?" : firstName}
        </Text>
      </View>
      {!writeComment ? (
        <TouchableWithoutFeedback onPress={() => setWriteComment(true)}>
          <View
            style={{
              flexDirection: "row",
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
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              color: colors.purple,
              margin: 10,
              marginHorizontal: 20,
              width: "50%",
            }}
            placeholder='"Write comment here..."'
            placeholderTextColor={colors.purple}
            multiline={true}
            onChangeText={(text) =>
              setVariables({ ...variables, comment: text })
            }
            value={variables.comment}
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
            <TouchableWithoutFeedback onPress={submitComment}>
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
