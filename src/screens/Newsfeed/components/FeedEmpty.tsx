import { Button, Center, Heading, Image, Text } from "native-base";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import EmptyNewsfeed from "../../../../assets/empty.png";
import { NewsfeedScreenProps } from "../types";
import { screens } from "../../../constants";

const FeedEmpty = (local: number) => {
  const navigation = useNavigation<NewsfeedScreenProps["navigation"]>();

  const handleGoToPostCreation = () => {
    navigation.navigate(screens.CREATE_POST, {
      eventId: local,
    });
  };

  return (
    <Center flex={1} p="6" testID="feed-empty" key={Math.random()}>
      <Image
        source={EmptyNewsfeed}
        alt="NewsFeedEmpty"
        size="2xl"
        resizeMode="contain"
      />
      <Text fontSize="2xl">Ainda não tem nada aqui.</Text>
      <Text fontSize="md" m="3" textAlign="center">
        Aqui é o feed de atividades. Todos os achados e perdidos postados
        referente a esse local aparecerão aqui.
      </Text>
      <Button bg="#232831" onPress={handleGoToPostCreation}>
        Criar publicação
      </Button>
    </Center>
  );
};

export default FeedEmpty;
