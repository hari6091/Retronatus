import { MaterialIcons } from "@expo/vector-icons";
import { Box, FlatList, Fab, Icon } from "native-base";
import React, { useCallback } from "react";

import { screens } from "../../constants";
import { FeedEmpty, FeedItemNewsfeed } from "./components";
import { NewsfeedScreenProps, FeedType } from "./types";

const NewsfeedScreen = ({ navigation }: NewsfeedScreenProps) => {
  const items: FeedType[] = [
    {
      id_publi: 1,
      name: "Hari",
      profilePic: "Teste",
      descricao: "Ontem eu perdi minha tilápia de estimação. Alguém viu?",
      data_cadastro: "12/12/2012",
      status: "perdido",
      comments: {
        items: [
          {
            id: 1,
            author: {
              id: 1,
              name: "Emanuel",
              profilePicThumb: "profile1.jpg",
            },
            createdAt: "2023-05-18",
            totalReplies: 2,
            descricao: "Eu acho que sei onde tá!",
          },
          {
            id: 2,
            author: {
              id: 1,
              name: "Eliezio",
              profilePicThumb: "profile1.jpg",
            },
            createdAt: "2023-05-18",
            totalReplies: 2,
            descricao: "Eu acho que sei onde tá!",
          },
        ],
      },
    },
    {
      id_publi: 2,
      name: "Natália",
      profilePic: "Teste",
      descricao: "Esse app é melhor que o meu Braim Cazé!",
      data_cadastro: "12/12/2012",
      status: "devolvido",
    },
    {
      id_publi: 3,
      name: "Emanuel",
      profilePic: "Teste",
      descricao: "ABC >>>> América",
      data_cadastro: "12/12/2012",
      status: "achado",
    },
  ];

  const renderItem = useCallback(
    ({ item }: { item: FeedType }) => <FeedItemNewsfeed data={item} />,
    []
  );

  const keyExtractor = useCallback(
    (item: FeedType) => item.id_publi.toString(),
    []
  );

  const ItemSeparatorComponent = useCallback(() => <Box mt="3" />, []);

  const handleGoToPostCreation = () => {
    navigation.navigate(screens.CREATE_POST, { eventId: items[0].id_publi });
  };

  return (
    <Box flex={1} safeAreaX bg="#e9e6e6">
      <FlatList
        testID="feed-items"
        flex={1}
        data={items}
        ListEmptyComponent={FeedEmpty}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onEndReachedThreshold={2}
        // onRefresh={refresh}
        // refreshing={isRefreshing}
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
