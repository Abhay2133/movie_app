import { useDetailContext } from "@/context/DetailContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import RenderHTML from "react-native-render-html";

import {
  SafeAreaView,
  useColorScheme,
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { B, Span } from "@/components/ui/Tags";

export default function Details() {
  const { viewData } = useDetailContext();
  const colorScheme = useColorScheme();

  const { width } = useWindowDimensions();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorScheme == "dark" ? "#111" : "#eee",
      }}
    >
      <AppBar />
      <ScrollView
        style={{
          flex: 1,
          margin: 10,
          borderRadius: 10,
          padding: 10,
          backgroundColor: colorScheme == "dark" ? "#222" : "#fff",
          boxShadow: `0 3px 4px ${colorScheme == "dark" ? "#111" : "#ccc"}`,
        }}
      >
        <View
          style={{
            overflow: "hidden",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 10,
            borderRadius: 10,
            boxShadow: `0 3px 4px ${colorScheme == "dark" ? "#111" : "#aaa"}`,
          }}
        >
          <Image
            source={{ uri: viewData.image?.original }}
            width={200}
            height={200}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            marginTop: 10,
            fontWeight: 600,
          }}
        >
          {viewData.name}
        </Text>

        {/* Description */}
        <Text style={{ color: "#888" }}>Description</Text>
        <RenderHTML
          contentWidth={width}
          source={{ html: viewData?.summary || "" }}
          tagsStyles={{
            p: {
              margin: 5,
              fontSize: 16,
              color: colorScheme == "dark" ? "#eee" : "#111",
            },
          }}
        />

        {/* Rating */}
        <View style={{ height: 5 }} />
        <View style={{ flexDirection: "row" }}>
          <B>Rating : </B>
          <Span>{viewData.rating?.average || "N/A"}</Span>
        </View>

        {/* Type */}
        <View style={{ flexDirection: "row" }}>
          <B>Type : </B>
          <Span>{viewData.type}</Span>
        </View>

        {/* Status */}
        <View style={{ flexDirection: "row" }}>
          <B>Status : </B>
          <Span>{viewData.status}</Span>
        </View>

        {/* Premiered */}
        <View style={{ flexDirection: "row" }}>
          <B>Premeired : </B>
          <Span>{viewData.premiered}</Span>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function AppBar() {
  const colorScheme = useColorScheme();
  const { viewData } = useDetailContext();
  return (
    <Stack.Screen
      options={{
        title: `${viewData.name}`,
        headerStyle: {
          backgroundColor: colorScheme == "dark" ? "#111" : "#eee",
        },
        headerTintColor: colorScheme == "dark" ? "#eee" : "#111",
        headerTitleStyle: {
          fontWeight: "bold",
        },

        // headerTitle: props => <LogoTitle {...props} />,
      }}
    />
  );
}
