import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-community/async-storage";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists

  // commented out cause no setting storage yet

  // const token = async () => await AsyncStorage.getItem("token");

  // delete the below
  const token = true;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token
        ? `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmE5NjQ0MWZmNDFmODNmNjk5N2RjNzkiLCJlbWFpbCI6IldlQHdlLmNvbSIsImlhdCI6MTYwNDk1MjMyMSwiZXhwIjoxNjA0OTU5NTIxfQ.uNZ4c6xQdiEW14xm0rO8lBoyCnp52TlhtX8deMBlQo8`
        : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
