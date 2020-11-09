import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
} from "react-native";
import NavHome from "../../components/NavHome";
import images from "@assets/images";
import styles from "@styles/styles";
import changeProfilePicture from "../../components/ChangeProfilePicture";
import ChangeProfilePicture from "../../components/ChangeProfilePicture";

export default function Settings({ navigation }) {
  const [changeProfilePicture, setChangeProfilePicture] = useState(false);

  function hideOptions() {
    setChangeProfilePicture(false);
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      <NavHome />
      <TouchableWithoutFeedback onPress={() => setChangeProfilePicture(true)}>
        <View style={{ backgroundColor: "red" }}>
          <Image style={styles.cardImage} source={images.monkey} />
          <Text style={{ alignSelf: "center" }}>Change Profile Picture</Text>
        </View>
      </TouchableWithoutFeedback>

      {changeProfilePicture && <ChangeProfilePicture hide={hideOptions} />}

      <Text style={{ textAlign: "center" }}>Settings</Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Recommended")}
      >
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to Recommended
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
