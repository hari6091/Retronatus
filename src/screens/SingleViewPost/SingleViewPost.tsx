import { Box, Center, Divider, FlatList, Spinner } from "native-base";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { TextInput } from "react-native";

import {
  CommentForm,
  CommentItemWithReplies,
  NewsfeedCard,
} from "../../components";
import { SingleViewPostScreenProps } from "./types";
import { IComentario, IPublicacao } from "../../hooks";

const SingleViewPostScreen = ({
  navigation,
  route,
}: SingleViewPostScreenProps) => {
  const feedItem: IPublicacao = {
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

  const renderItem = ({ item }: { item: IComentario }) => (
    <CommentItemWithReplies data={item} bgColor="white" px="4" />
  );

  const keyExtractor = useCallback(
    (item: IComentario) => item.idComentario.toString(),
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
              feedId={feedItem.idPublicacao}
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
        data={feedItem.comentarios}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </Box>
  );
};

export default SingleViewPostScreen;
