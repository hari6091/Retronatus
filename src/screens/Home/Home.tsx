import {
  Center,
  Text,
  Input,
  FormControl,
  Icon,
  Box,
  FlatList,
} from "native-base";
import React from "react";

import { HomeScreenProps } from "./types";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../components";
import { data } from "./MockCards";
import { screens } from "../../constants";

const Home = ({ navigation }: HomeScreenProps) => {
  const handleNavigateNewsfeed = async (eventId: number) => {
    navigation.navigate(screens.NEWSFEED, { eventId });
  };
  return (
    <Center flex={1} flexDirection="column" safeArea px="8" bg="#FFE5A5">
      <Text fontSize="36px" textAlign="center" mb="42px" color="#232831">
        Retronatus
      </Text>
      <FormControl mb="6">
        <Input
          placeholder="Search"
          borderWidth="0"
          borderRadius="10px"
          bg="#EBE8E1"
          fontSize="14px"
          leftElement={<Icon as={Ionicons} name="search" size="6" m="5px" />}
        />
      </FormControl>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box mb="38px">
            <Card
              id={item.id}
              title={item.title}
              date={item.date}
              onPress={handleNavigateNewsfeed}
            />
          </Box>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </Center>
  );
};

export default Home;
