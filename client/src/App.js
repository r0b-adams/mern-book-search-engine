import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_request, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          savedBooks: {
            // add this to address warning
            // expicitly overwrite existing arr with incoming arr
            merge(_existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchBooks />} />
          <Route path="/saved" element={<SavedBooks />} />
          <Route
            path="*"
            element={<h1 className="display-2">Wrong page!</h1>}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
