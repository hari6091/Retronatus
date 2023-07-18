import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Spinner,
  View,
  VStack,
} from "native-base";
import React from "react";

import { UserProfileScreenProps } from "../types";
import emptyStateImage from "../../../../assets/empty.png";
import { FeedItemNewsfeed } from "../../Newsfeed/components";
import { IPublicacao } from "../../../hooks";
import { screens } from "../../../constants";

export default function UserProfileActivityTab({
  items,
  loading,
  user,
  isOwner,
  onPublicacaoDeleted,
}: {
  items: IPublicacao[];
  loading: boolean;
  user: Record<string, any>;
  isOwner?: boolean;
  onPublicacaoDeleted: () => void;
}) {
  const empty = !loading && items.length === 0;

  const navigation = useNavigation<UserProfileScreenProps["navigation"]>();

  const goToCreatePost = () => {
    navigation.navigate(screens.MAIN, {
      screen: screens.HOME,
    });
  };

  if (empty) {
    return (
      <VStack alignItems="center" px="16px" mb="24px">
        <Image source={emptyStateImage} w="100px" h="100px" alt="Empty_Image" />

        <Heading fontSize="2xl" textAlign="center" mt="24px">
          {isOwner ? "Você" : user.name ?? "Esse usuário"} ainda não
          compartilhou nenhum item.
        </Heading>

        {isOwner && (
          <Button mt="24px" w="full" onPress={goToCreatePost}>
            Criar postagem
          </Button>
        )}
      </VStack>
    );
  }

  return (
    <View>
      {items.map((item) => (
        <Box m="10px" key={item.idPublicacao}>
          <FeedItemNewsfeed
            onPublicacaoDeleted={onPublicacaoDeleted}
            data={item}
          />
        </Box>
      ))}

      {loading && (
        <Center p="6">
          <Spinner size="lg" />
        </Center>
      )}
    </View>
  );
}
