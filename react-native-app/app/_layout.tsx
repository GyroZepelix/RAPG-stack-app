import {View} from "react-native";
import {Slot} from "expo-router";
import {ApolloClient, ApolloProvider, gql, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: `${process.env.EXPO_PUBLIC_BASE_URL}/graphql`,
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