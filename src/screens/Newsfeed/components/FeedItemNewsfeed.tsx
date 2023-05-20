import { Box, Divider } from "native-base";
import React, { useRef } from "react";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { IFeedItemProps } from "./types";
import { CommentForm, CommentItem, NewsfeedCard } from "../../../components";
import { isEmpty } from "lodash";
import { screens } from "../../../constants";
import { SingleViewPostScreenProps } from "../../SingleViewPost/types";

const FeedItemNewsfeed = ({ data }: IFeedItemProps) => {
  const commentInputRef = useRef<TextInput>(null);
  const navigation = useNavigation<SingleViewPostScreenProps["navigation"]>();

  const handleComment = async (values: any) => {
    // await addComment({
    //   comment: {
    //     text: values?.text,
    //   },
    //   feedId: data.id_publi,
    // });
  };

  const handleOpenSingleViewPost = () => {
    navigation.navigate(screens.SINGLE_VIEW_POST, { feedId: data.id_publi });
  };

  return (
    <Box bgColor="white" p="4" testID="feed-item">
      <NewsfeedCard data={data} commentInputRef={commentInputRef} />
      <Divider mt="4" />
      {!isEmpty(data.comments) && (
        <CommentItem
          data={data.comments.items[data.comments.items.length - 1]}
          onPressReply={handleOpenSingleViewPost}
          mt="4"
          readOnly
        />
      )}
      <CommentForm
        commentInputRef={commentInputRef}
        onSubmit={handleComment}
        feedId={data.id_publi}
        mt="4"
      />
    </Box>
  );
};

export default FeedItemNewsfeed;
