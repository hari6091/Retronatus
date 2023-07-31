import { Center, Image, Text } from "native-base";
import React from "react";

import EmptyComments from "../../../assets/empty.png";

const CommentsEmpty = () => {
  return (
    <Center flex={1} p="6" testID="comments-empty" key={Math.random()}>
      <Image
        source={EmptyComments}
        alt="CommetnsEmpty"
        size="xl"
        resizeMode="contain"
      />
      <Text fontSize="2xl">Ainda não tem nada aqui.</Text>
      <Text fontSize="md" m="3" textAlign="center">
        Aqui ficam os comentários. Todos os referentes a esse publicação
        aparecerão aqui. Faça um!
      </Text>
    </Center>
  );
};

export default CommentsEmpty;
