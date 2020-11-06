import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";

export function index() {
  useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
  });
}

const fonts = {
  regular: "Montserrat_400Regular",
  bold: "Montserrat_700Bold",
  semiBold: "Montserrat_600SemiBold",
  medium: "Montserrat_500Medium",
};

export default fonts;
