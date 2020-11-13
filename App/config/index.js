import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-community/async-storage";
import { server } from "@env";

const httpLink = createHttpLink({

  uri: server || "http://192.168.42.37:5000/graphql",

});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token;
  try {
    token = await AsyncStorage.getItem("userToken");
  } catch (e) {
    console.log("token error apolloa client", e);
  }

  console.log("token within apollo client", token);

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
