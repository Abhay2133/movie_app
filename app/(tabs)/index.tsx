import {
  Image,
  StyleSheet,
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Show from "@/components/ui/Show";
import { useDetailContext } from "@/context/DetailContext";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  return (
    <SafeAreaView style={styles.main}>
      {/* <Text>Content is in safe area.</Text> */}
      {/* <StatusBar style="light" /> */}
      <View style={styles.appbar}>
        <Text
          style={{
            ...styles.title,
            color: colorScheme == "dark" ? "white" : "black",
          }}
        >
          Movie and Shows
        </Text>
        <TouchableOpacity onPress={() => router.push("/search")}>
          <Ionicons
            name="search"
            size={24}
            color={colorScheme == "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
        {/* <Ionicons name="search" size={24} color="black" /> */}
      </View>

      {/* Main */}
      <DefaultShows />
    </SafeAreaView>
  );
}

function DefaultShows() {
  const router = useRouter();

  const theme = useColorScheme();
  const [data, setData] = useState<{ show: any }[]>([]);
  // const [shows, setShows] = useState<{ uri: string; name: string }[]>([]);
  const [loading, setLoading] = useState("Loading...");

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((res) => res.json())
      .then((data) => {
        // setShows(() =>
        //   data.map((item: any) => ({
        //     name: item.show.name,
        //     uri: item?.show?.image?.medium || "",
        //   }))
        // );
        setData(data);
        setLoading("");
      })
      .catch((e) => console.error(e));
  }, []);

  const shows =
    data.length > 0
      ? data.map((item: any) => ({
          name: item.show.name,
          uri: item?.show?.image?.medium || "",
        }))
      : [];

  const { setViewData } = useDetailContext();
  const handleOnPress = (index: number) => {
    setViewData(data[index].show);
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
        {loading && (
          <Text
            style={{ fontSize: 16, color: theme == "dark" ? "#aaa" : "#333" }}
          >
            {loading}
          </Text>
        )}

        {!loading &&
          shows.map((showData, i) => (
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
  shows: {
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    color: "white",
  },
  appbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingLeft: 10,
    paddingRight: 20,
  },
  main: {
    flex: 1,
    paddingTop: 20,
  },
});
