import { StyleSheet } from "react-native";
import fonts from "@assets/fonts";
import adjust from "./adjust";
import colors from "@assets/colors";

export default StyleSheet.create({
  //login/signup/password -screens
  title: {
    fontSize: adjust(18),
    fontFamily: fonts.bold,
    color: colors.purple,
    textAlign: "center",
    marginTop: "20%",
    marginBottom: "5%",
  },
  titlePassword: {
    fontSize: adjust(22),
    fontFamily: fonts.semiBold,
    color: colors.black,
    textAlign: "left",
    marginTop: "30%",
    marginLeft: "5%",
  },
  text: {
    fontSize: adjust(12),
    fontFamily: fonts.regular,
    color: colors.grey,
    textAlign: "left",
    marginTop: "3%",
    marginBottom: "5%",
    marginLeft: "5%",
  },
  inputBox: {
    fontFamily: fonts.regular,
    color: colors.grey,
    alignSelf: "center",
    width: "90%",
    height: 60,
    fontSize: adjust(16),
    paddingLeft: 15,
    borderWidth: 0.2,
    borderColor: colors.grey,
    borderRadius: 5,
  },
  inputLabel: {
    marginLeft: "5%",
    paddingBottom: 5,
    paddingTop: "5%",
    fontFamily: fonts.regular,
  },
  passwordButton: {
    backgroundColor: colors.teal,
    marginTop: "10%",
    width: "90%",
    padding: "4.5%",
    alignSelf: "center",
    borderRadius: 5,
  },
  passwordButtonText: {
    fontSize: adjust(12),
    color: colors.black,
    fontFamily: fonts.semiBold,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: colors.purple,
    marginTop: "10%",
    width: "90%",
    padding: "4.5%",
    alignSelf: "center",
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: adjust(12),
    color: colors.white,
    fontFamily: fonts.semiBold,
    textAlign: "center",
  },
  bottomText: {
    marginTop: "10%",
    fontSize: adjust(12),
    fontFamily: fonts.semiBold,
    color: colors.grey,
    textAlign: "center",
  },
  showPassword: {
    textAlign: "right",
    fontSize: adjust(12),
    fontFamily: fonts.bold,
    right: "5%",
    marginTop: 5,
    color: colors.ltPurple,
  },

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
  peekabondLogo: {
    resizeMode: "contain",
    width: "50%",
    alignSelf: "center",
  },
});
