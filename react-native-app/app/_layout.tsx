import {View} from "react-native";
import {Slot} from "expo-router";
import {ApolloClient, ApolloProvider, gql, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com/',
    cache: new InMemoryCache(),
});

const Page = () => {
    client.query({
        query: gql`
            query {
              countries {
                name
              }
            }
            `
    }).then((result) => {console.log(result.data)}).catch((err) => {console.error(err)})


    return (
        <ApolloProvider client={client}>
            <View style={{width: 50, height: 50, backgroundColor: "#f00"}} />
            <Slot />
        </ApolloProvider>
    )
}

export default Page