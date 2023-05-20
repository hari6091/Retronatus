import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";
import React from "react";

import { IconProps } from "./types";

export const Home = (props: IconProps) => {
  const color = props.focused ? "#fff" : "#FFE5A5";

  return <Icon as={Ionicons} name="md-home" size="7" color={color} />;
};

export default Home;
