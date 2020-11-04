import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export function index() {
  useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });
}

const fonts = {
  regular: "Montserrat_400Regular",
  bold: "Montserrat_700Bold",
};

export default fonts;
