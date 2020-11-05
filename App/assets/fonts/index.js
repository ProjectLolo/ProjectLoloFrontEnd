import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

export function index() {
  useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });
}

const fonts = {
  regular: "Montserrat_400Regular",
  bold: "Montserrat_700Bold",
  semiBold: "Montserrat_600SemiBold",
};

export default fonts;
