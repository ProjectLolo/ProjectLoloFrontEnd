import React, { useContext } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { AuthContext } from "../../context/Auth";

export default function Settings({ route, navigation }) {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ textAlign: "center" }}>Settings</Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Recommended")}
      >
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to Recommended
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => signOut()}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>Log out</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
