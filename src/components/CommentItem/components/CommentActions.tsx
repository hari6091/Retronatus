import { Button, HStack, Text } from "native-base";
import React, { useState } from "react";

import { ICommentActionsProps } from "./types";
import { CommentForm } from "../../CommentForm";

const CommentActions = ({
  replyAmount = 0,
  commentId,
  data,
  onComment,
  isReply,
  onPressReply,
  readOnly,
  ...rest
}: ICommentActionsProps) => {
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);

  const handleRepliesVisibility = () => {
    setAreRepliesVisible(!areRepliesVisible);
  };

  return (
    <>
      {!isReply && (
        <HStack space={3} alignItems="center" {...rest}>
          <Text color="#c4c4c4" onPress={onPressReply}>
            {replyAmount === 0 || replyAmount > 1
              ? `${replyAmount} comentários`
              : `${replyAmount} comentário`}
          </Text>
          {!readOnly && (
            <HStack space={3} alignItems="center">
              <Text bold>•</Text>

              <Button
                variant="unstyled"
                px="0"
                py="1"
                _text={{
                  fontSize: "md",
                  color: "#121212",
                }}
                onPress={handleRepliesVisibility}
              >
                Responder
              </Button>
            </HStack>
          )}
        </HStack>
      )}

      <HStack>
        {areRepliesVisible && (
          <CommentForm feedId={data?.id} onSubmit={onComment} />
        )}
      </HStack>
    </>
  );
};

export default CommentActions;
