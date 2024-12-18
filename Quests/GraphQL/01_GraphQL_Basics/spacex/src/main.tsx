import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);

const client = new ApolloClient({
	uri: "https://spacex-production.up.railway.app/",
	cache: new InMemoryCache(),
});

root.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
);
