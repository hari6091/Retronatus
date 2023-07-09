import { MaterialIcons } from "@expo/vector-icons";
import { Box, FlatList, Fab, Icon } from "native-base";
import React, { useCallback, useState } from "react";

import { screens } from "../../constants";
import { FeedEmpty, FeedItemNewsfeed } from "./components";
import { NewsfeedScreenProps, FeedType } from "./types";
import { IPublicacao, usePublicacoes } from "../../hooks";

const NewsfeedScreen = ({ navigation, route }: NewsfeedScreenProps) => {
  const [local, setLocal] = useState<IPublicacao>();
  const { publicacoes } = usePublicacoes(route.params.idLocal);

  const renderItem = useCallback(
    ({ item }: { item: IPublicacao }) => <FeedItemNewsfeed data={item} />,
    []
  );

  const keyExtractor = useCallback(
    (item: IPublicacao) =>
      item.idPublicacao?.toString() ?? Math.random().toString(),
    []
  );

  const ItemSeparatorComponent = useCallback(() => <Box mt="3" />, []);

  const handleGoToPostCreation = () => {
    setLocal(publicacoes ? publicacoes[0] : undefined);
    navigation.navigate(screens.CREATE_POST, {
      eventId: local?.idLocal ?? 1,
    });
  };

  return (
    <Box flex={1} safeAreaX bg="#e9e6e6">
      <FlatList
        testID="feed-items"
        flex={1}
        data={publicacoes}
        ListEmptyComponent={FeedEmpty(local?.idLocal ?? 1)}
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
