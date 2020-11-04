import { StyleSheet } from "react-native";
import fonts from "@assets/fonts";

export default StyleSheet.create({
  // alignment

  center: {
    textAlign: "center",
  },

  // font

  h2: {
    fontSize: 20,
    fontWeight: "bold",
  },

  regular: {
    fontFamily: fonts.regular,
  },
  bold: {
    fontFamily: fonts.bold,
  },

  //  color palette

  purple: {
    backgroundColor: "#6464E1",
  },
  purpleText: {
    color: "#6464E1",
  },
  ltPurple: {
    backgroundColor: "#AEADFF",
  },
  teal: {
    backgroundColor: "#11E9E0",
  },
  yellow: {
    backgroundColor: "#FFD33D",
  },
  ltPink: {
    backgroundColor: "#F6E6CC",
  },
  pink: {
    backgroundColor: "#F6ABA7",
  },
  dkPink: {
    backgroundColor: "#FF6E5A",
  },
  peekabooLogo: {
    resizeMode: "contain",
    width: "50%",
    alignSelf: "center",
  },
});
