import { Button, Center, Heading, Image, Text } from "native-base";
import React from "react";

import EmptyNewsfeed from "../../../../assets/empty.png";

const FeedEmpty = () => {
  return (
    <Center flex={1} p="6" testID="feed-empty">
      <Image source={EmptyNewsfeed} size="2xl" resizeMode="contain" />
      <Text fontSize="2xl">Ainda não tem nada aqui.</Text>
      <Text fontSize="md" m="3" textAlign="center">
        Aqui é o feed de atividades. Todos os achados e perdidos postados
        referente a esse local aparecerão aqui.
      </Text>
      <Button bg="#232831">Criar publicação</Button>
    </Center>
  );
};

export default FeedEmpty;
