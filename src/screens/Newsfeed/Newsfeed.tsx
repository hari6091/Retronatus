import { MaterialIcons } from "@expo/vector-icons";
import { Box, FlatList, Fab, Icon } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { screens } from "../../constants";
import { FeedEmpty, FeedItemNewsfeed } from "./components";
import { NewsfeedScreenProps } from "./types";
import { IPublicacao, usePublicacoes } from "../../hooks";

const NewsfeedScreen = ({ navigation, route }: NewsfeedScreenProps) => {
  const { allPublicacaoByLocal } = usePublicacoes();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [publicacoes, setPublicacoes] = useState<IPublicacao[]>();

  const loadPublicacoes = useCallback(async () => {
    try {
      setIsLoading(true);
      const getPublicacoes = await allPublicacaoByLocal(route.params.idLocal);
      setPublicacoes(getPublicacoes);
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

  useEffect(() => {
    loadPublicacoes();
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      loadPublicacoes();
    }, [loadPublicacoes])
  );

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
    navigation.navigate(screens.CREATE_POST, {
      eventId: route.params.idLocal,
    });
  };

  return (
    <Box flex={1} safeAreaX bg="#e9e6e6">
      <FlatList
        testID="feed-items"
        flex={1}
        data={publicacoes}
        onRefresh={() => loadPublicacoes()}
        refreshing={isLoading}
        ListEmptyComponent={FeedEmpty(route.params.idLocal)}
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
