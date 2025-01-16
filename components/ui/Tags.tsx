import { ReactNode } from "react";
import { StyleProp, Text, TextStyle, useColorScheme } from "react-native";

export interface SpanProps {
  style?: TextStyle;
  children?: ReactNode;
}

export const Span = ({ style, children }: SpanProps) => {
  const colorScheme = useColorScheme();
  return (
    <Text
      style={{
        fontSize: 16,
        color: colorScheme == "dark" ? "#eee" : "#111",
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

export const B = ({ style, children }: SpanProps) => {
  return <Span style={{ fontWeight: 600, ...style }}>{children}</Span>;
};
