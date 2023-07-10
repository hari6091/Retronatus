import {
  Center,
  Text,
  Input,
  FormControl,
  Icon,
  Box,
  FlatList,
  Fab,
  useDisclose,
  Actionsheet,
  Spinner,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { HomeScreenProps } from "./types";
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "../../components";
import { data } from "./MockCards";
import { screens } from "../../constants";
import { useLocais } from "../../hooks";
import { ILocal } from "../../hooks/useLocais/useLocais";

const Home = ({ navigation }: HomeScreenProps) => {
  const { allLocais } = useLocais();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [locais, setLocais] = useState<ILocal[]>();

  const loadLocais = useCallback(async () => {
    try {
      setIsLoading(true);
      const getLocais = await allLocais();
      setLocais(getLocais);
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

  useEffect(() => {
    loadLocais();
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      loadLocais();
    }, [loadLocais])
  );

  const handleNavigateNewsfeed = async (idLocal: number) => {
    navigation.navigate(screens.NEWSFEED, { idLocal });
  };

  const handleNavigateAddLocal = () => {
    navigation.navigate(screens.CREATE_LOCAL);
    onClose();
  };

  const handleNavigateAddCategory = () => {
    navigation.navigate(screens.CREATE_CATEGORY);
    onClose();
  };

  return (
    <Center flex={1} flexDirection="column" safeArea px="8" bg="#FFE5A5">
      <Text fontSize="36px" textAlign="center" mb="42px" color="#232831">
        Retronatus
      </Text>

      <FlatList
        data={locais}
        onRefresh={() => loadLocais()}
        refreshing={isLoading}
        renderItem={({ item }) => (
          <Box mb="38px">
            <Card
              idLocal={item.idLocal ?? Math.random()}
              name={item.name}
              address={item.address}
              onPress={handleNavigateNewsfeed}
            />
          </Box>
        )}
        keyExtractor={(item) => item.idLocal?.toString() ?? ""}
      />
      <Fab
        renderInPortal={false}
        right={6}
        bottom={18}
        shadow={3}
        w="64px"
        h="64px"
        bg="#232831"
        icon={<Icon color="white" as={MaterialIcons} name="add" size="md" />}
        onPress={onOpen}
      />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={handleNavigateAddLocal}>
            Adicionar novo local
          </Actionsheet.Item>
          <Actionsheet.Item onPress={handleNavigateAddCategory}>
            Adicionar nova categoria
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};

export default Home;
