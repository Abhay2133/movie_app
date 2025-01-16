import { useColorScheme, View, Image, Text, Dimensions, TouchableOpacity } from "react-native";

export default function Show({
  uri = "",
  name = "",
  onPressed
}: {
  uri: string;
  name: string;
  onPressed: ()=>void;
}) {
  const width = Dimensions.get("window").width / 2 - 20;
  const theme = useColorScheme();

  return (
    <TouchableOpacity
      onPress={onPressed}
      style={{
        // height: 300,
        width,
        borderRadius: 5,
        backgroundColor: theme == "dark" ? "#222" : "white",
        boxShadow: `0 3px 4px ${theme == "dark" ? "#333" : "#aaa"}`,
        borderWidth: 1,
        borderColor: theme == "dark" ? "#333" : "#ccc",
        padding: 5,

        // paddingBottom: 20,
      }}
    >
      <Image
        source={{ uri }}
        height={width - 11}
        width={width - 11}
        style={{ borderRadius: 5 }}
      />
      <Text
        style={{
          fontSize: 16,
          padding: 5,
          paddingBottom: 0,
          color: theme == "dark" ? "#aaa" : "black",
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}
