import { Box, Center, Divider, FlatList, Spinner } from "native-base";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { TextInput } from "react-native";

import {
  CommentForm,
  CommentItemWithReplies,
  NewsfeedCard,
} from "../../components";
import { FeedType } from "../Newsfeed/types";
import { CommentType } from "../../components/CommentItem/types";
import { SingleViewPostScreenProps } from "./types";

const SingleViewPostScreen = ({
  navigation,
  route,
}: SingleViewPostScreenProps) => {
  const feedItem: FeedType = {
    id_publi: 1,
    name: "Hari",
    profilePic: "Teste",
    descricao: "Ontem eu perdi minha tilápia de estimação. Alguém viu?",
    data_cadastro: "Teste",
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
          replies: [
            {
              id: 1,
              author: {
                id: 1,
                name: "Emanuel",
                profilePicThumb: "profile1.jpg",
              },
              createdAt: "2023-05-18",
              totalReplies: 2,
              descricao: "Isso aqui é a resposta da resposta :)",
            },
          ],
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
        {
          id: 3,
          author: {
            id: 1,
            name: "Natália",
            profilePicThumb: "profile1.jpg",
          },
          createdAt: "2023-05-18",
          totalReplies: 2,
          descricao: "Eu não sei de nada! 👀",
        },
      ],
    },
  };
  const commentInputRef = useRef<TextInput>(null);

  const [isCommentInputVisible, setIsCommentInputVisible] =
    useState<boolean>(false);

  const handleComment = async (values: any) => {
    // await addComment({
    //   comment: {
    //     text: values?.text,
    //   },
    //   feedId: feedItem.id,
    // });
  };

  const renderItem = ({ item }: { item: CommentType }) => (
    <CommentItemWithReplies data={item} bgColor="white" px="4" />
  );

  const keyExtractor = useCallback(
    (item: { id: number }) => item.id.toString(),
    []
  );

  const ListHeaderComponent = () =>
    !route.params.feedId ? null : (
      <>
        <NewsfeedCard
          data={feedItem}
          bgColor="white"
          px="4"
          pt="4"
          pb={isCommentInputVisible ? null : "4"}
          commentInputRef={commentInputRef}
          onPressComment={() => {
            setIsCommentInputVisible(true);
          }}
        />
        {isCommentInputVisible ? (
          <Box bgColor="white" p="4">
            <Divider mb="4" />
            <CommentForm
              feedId={feedItem.id_publi}
              onSubmit={handleComment}
              commentInputRef={commentInputRef}
            />
            <Divider mt="4" />
          </Box>
        ) : null}
      </>
    );

  const ItemSeparatorComponent = useCallback(
    () => (
      <Box bgColor="white" p="4">
        <Divider />
      </Box>
    ),
    []
  );

  return (
    <Box testID="single-view-post" flex={1} safeAreaX>
      <FlatList
        flex={1}
        data={feedItem.comments?.items}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        // onRefresh={refresh}
        // refreshing={isRefreshing}
      />
    </Box>
  );
};

export default SingleViewPostScreen;
