import {View} from "react-native";
import {Slot} from "expo-router";
import {ApolloClient, ApolloProvider, gql, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://192.168.88.96:8080/graphql',
    cache: new InMemoryCache(),
});

const Page = () => {
    return (
        <ApolloProvider client={client}>
            <Slot />
        </ApolloProvider>
    )
}

export default Page