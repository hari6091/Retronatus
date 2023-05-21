import { isEqual } from "lodash";
import React, { memo } from "react";

import { CommentHeader, CommentBody, CommentActions } from "./components";
import { ICommentItemProps } from "./types";
import { VStack } from "native-base";

const CommentItem = ({
  data,
  isReply,
  onPressReply,
  readOnly,
  ...rest
}: ICommentItemProps) => {
  const { id, author, createdAt, descricao, replies } = data;

  const handleReplies = async (values: any) => {
    // await addComment({
    //   parentId: id,
    //   comment: {
    //     text: values?.text,
    //   },
    //   feedId: values.feedId,
    // });
  };

  return (
    <VStack {...rest} pr={isReply ? "8" : null}>
      <VStack bg="#ececec" borderRadius="10px" py="12px" pl="12px">
        <CommentHeader
          author={{
            name: author.name,
            profilePicThumb: author.profilePicThumb,
          }}
          publishedAt={createdAt}
        />

        <CommentBody
          content={{
            text: descricao,
          }}
          mt="2"
        />
      </VStack>
      <CommentActions
        replyAmount={replies?.length ?? 0}
        commentId={id}
        onComment={handleReplies}
        data={data}
        mt="3"
        onPressReply={onPressReply}
        isReply={isReply}
        readOnly={readOnly}
      />
    </VStack>
  );
};

export default memo(CommentItem, isEqual);
