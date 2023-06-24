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
  const handleNavigateNewsfeed = async (idLocal: number) => {
    navigation.navigate(screens.NEWSFEED, { idLocal });
  };
  // const { locais } = useHome();
  return (
    <Center flex={1} flexDirection="column" safeArea px="8" bg="#FFE5A5">
      <Text fontSize="36px" textAlign="center" mb="42px" color="#232831">
        Retronatus
      </Text>
      <FlatList
        data={data} //deletar e substituir por 'locais'
        renderItem={({ item }) => (
          <Box mb="38px">
            <Card
              idLocal={item.idLocal}
              name={item.name}
              address={item.address}
              onPress={handleNavigateNewsfeed}
            />
          </Box>
        )}
        keyExtractor={(item) => item.idLocal.toString()}
      />
    </Center>
  );
};

export default Home;
