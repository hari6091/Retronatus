import { Button, HStack, Text } from "native-base";
import React, { useState } from "react";

import { ICommentActionsProps } from "./types";
import { ReplyForm } from "../../ReplyForm";

const CommentActions = ({
  replyAmount = 0,
  data,
  onComment,
  isReply,
  onPressReply,
  onAddReply,
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
          <Text color="#747474" onPress={onPressReply}>
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
          <ReplyForm commentId={data?.idComentario} onAddReply={onAddReply} />
        )}
      </HStack>
    </>
  );
};

export default CommentActions;
