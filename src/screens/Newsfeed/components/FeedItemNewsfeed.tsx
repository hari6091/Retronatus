import { Box, Divider } from "native-base";
import React, { useRef } from "react";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { IFeedItemProps } from "./types";
import { CommentForm, CommentItem, NewsfeedCard } from "../../../components";
import { isEmpty } from "lodash";
import { screens } from "../../../constants";
import { SingleViewPostScreenProps } from "../../SingleViewPost/types";

const FeedItemNewsfeed = ({
  data,
  onPublicacaoDeleted,
  onAddComment,
}: IFeedItemProps) => {
  const commentInputRef = useRef<TextInput>(null);
  const navigation = useNavigation<SingleViewPostScreenProps["navigation"]>();

  const handleOpenSingleViewPost = () => {
    navigation.navigate(screens.SINGLE_VIEW_POST, {
      feedId: data.idPublicacao ?? 1,
    });
  };

  return (
    <Box bgColor="white" p="4" testID="feed-item" key={data.idPublicacao}>
      <NewsfeedCard
        data={data}
        commentInputRef={commentInputRef}
        onPublicacaoDeleted={onPublicacaoDeleted}
      />
      <Divider mt="4" />
      {!isEmpty(data.comentarios ?? []) &&
        data.comentarios![data.comentarios!.length - 1] && (
          <CommentItem
            data={data.comentarios![data.comentarios!.length - 1]}
            onPressReply={handleOpenSingleViewPost}
            mt="4"
            readOnly
          />
        )}
      <CommentForm
        onAddComment={onAddComment}
        commentInputRef={commentInputRef}
        feedId={data.idPublicacao}
        mt="4"
      />
    </Box>
  );
};

export default FeedItemNewsfeed;
