import { ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

export interface SpanProps {
  style?: TextStyle;
  children?: ReactNode;
}

export const Span = ({ style, children }: SpanProps) => {
  return <Text style={{fontSize: 16, ...style}}>{children}</Text>;
};

export const B = ({ style, children }: SpanProps) => {
  return <Span style={{fontWeight:600, ...style}}>{children}</Span>
};
