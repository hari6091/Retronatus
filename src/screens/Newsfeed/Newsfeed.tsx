import { MaterialIcons } from "@expo/vector-icons";
import { Box, FlatList, Fab, Icon } from "native-base";
import React, { useCallback } from "react";

import { screens } from "../../constants";
import { FeedEmpty, FeedItemNewsfeed } from "./components";
import { NewsfeedScreenProps, FeedType } from "./types";
import { IPublicacao, usePublicacoes } from "../../hooks";

const NewsfeedScreen = ({ navigation, route }: NewsfeedScreenProps) => {
  // const { publicacoes } = usePublicacoes(route.params.idLocal);
  const publicacoes: IPublicacao[] = [
    {
      idPublicacao: 1,
      content: "Segunda",
      medias: [],
      status: "perdido",
      date: "2023-06-18T23:44:10.417Z",
      idUsuario: 1,
      idLocal: 1,
      idCategoria: 1,
      comentarios: [
        {
          idComentario: 1,
          content: "comentário",
          idUsuario: 1,
          idPublicacao: 1,
          date: "2023-06-19T01:24:53.693Z",
          respostas: [],
        },
        {
          idComentario: 5,
          content: "comentário3",
          idUsuario: 1,
          idPublicacao: 1,
          date: "2023-06-19T01:24:53.693Z",
          respostas: [],
        },
      ],
    },
  ];

  const renderItem = useCallback(
    ({ item }: { item: IPublicacao }) => <FeedItemNewsfeed data={item} />,
    []
  );

  const keyExtractor = useCallback(
    (item: IPublicacao) => item.idPublicacao.toString(),
    []
  );

  const ItemSeparatorComponent = useCallback(() => <Box mt="3" />, []);

  const handleGoToPostCreation = () => {
    navigation.navigate(screens.CREATE_POST, {
      eventId: publicacoes[0].idPublicacao,
    });
  };

  return (
    <Box flex={1} safeAreaX bg="#e9e6e6">
      <FlatList
        testID="feed-items"
        flex={1}
        data={publicacoes}
        ListEmptyComponent={FeedEmpty}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onEndReachedThreshold={2}
        initialNumToRender={10}
        w="full"
      />

      <Fab
        testID="create-post-button"
        renderInPortal={false}
        right={6}
        bottom={12}
        shadow={3}
        w="64px"
        h="64px"
        bg="#232831"
        icon={<Icon color="white" as={MaterialIcons} name="add" size="md" />}
        onPress={handleGoToPostCreation}
      />
    </Box>
  );
};

export default React.memo(NewsfeedScreen);
