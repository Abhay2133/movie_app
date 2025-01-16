import Show from "@/components/ui/Show";
import { useDetailContext, ViewData } from "@/context/DetailContext";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

export default function Search() {
  const colorScheme = useColorScheme();

  const [query, setQuery] = useState("");
  // const [results, setResults] = useState([]);
  const [data, setData] = useState<{ show: ViewData }[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      return setData(() => []);
    }
    let isValid = true;
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then((res) => res.json())
      .then((d) => {
        if (!isValid) return;
        setData(() => d);
      })
      .catch(console.error);
    return () => {
      isValid = false;
    };
  }, [query]);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
      <View style={styles.main}>
        <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            borderRadius: 5,
            margin: 10,
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 16,
            color: colorScheme == "dark" ? "#fff" : "#222",
            backgroundColor: colorScheme == "dark" ? "#555" : "#ddd",
            borderColor: colorScheme == "dark" ? "#111" : "#efefef",
          }}
          placeholder="Search movies and shows"
          onChangeText={(query) => setQuery(query)}
          defaultValue={query}
        />
      </View>
      <Results data={data.map((i) => i.show)} />
    </SafeAreaView>
  );
}

function Results({ data }: { data: ViewData[] }) {
  const theme = useColorScheme();
  const loading = data.length == 0;

  const results = data.length
    ? data.map((item: any) => ({
        name: item.name,
        uri: item?.image?.medium || "",
      }))
    : [];

  const router = useRouter();
  const { setViewData } = useDetailContext();
  const handleOnPress = (index: number) => {
    setViewData(data[index]);
    router.push("/details");
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme == "dark" ? "#000" : "#efefef",
          padding: 5,
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          paddingBottom: 10,

          // for "loading..."
          flexWrap: loading ? "nowrap" : "wrap",
          alignItems: loading ? "center" : "flex-start",
        }}
      >
        {!results.length && (
          <Text style={{ textAlign: "center", color: "#aaa", fontSize: 16 }}>
            Results will appear here...
          </Text>
        )}

        {results.length > 0 &&
          results.map((showData, i) => (
            <Show
              key={i}
              uri={showData.uri}
              name={showData.name}
              onPressed={() => handleOnPress(i)}
            />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    // backgroundColor: "green",
  },
});
