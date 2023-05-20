import { orderBy } from "lodash";
import { Box, Button, Divider } from "native-base";
import React, { useMemo, useState } from "react";

import { CommentItem } from "../CommentItem";
import { ICommentItemWithRepliesProps } from "./types";

const CommentItemWithReplies = ({
  data,
  ...rest
}: ICommentItemWithRepliesProps) => {
  const { replies, totalReplies } = data;

  const [areRepliesVisible, setAreRepliesVisible] = useState(false);

  const handleRepliesVisibility = () => {
    setAreRepliesVisible(!areRepliesVisible);
  };

  const renderButton = () => {
    let btnLabel;
    let handlePress = handleRepliesVisibility;

    if (areRepliesVisible) {
      btnLabel = "Esconder respostas";
    } else {
      btnLabel = "Ver respostas";
    }

    const button = (
      <Box mt="4">
        <Divider />
        <Button
          variant="unstyled"
          px="0"
          py="1"
          my="1.5"
          _text={{
            fontSize: "md",
            color: "#cfcfcf",
          }}
          onPress={handlePress}
          //   isLoading={isLoading}
        >
          {btnLabel}
        </Button>
        <Divider />
      </Box>
    );

    return button;
  };

  const listData = useMemo(
    () =>
      orderBy(replies, [(item) => new Date(item.createdAt).getTime()], ["asc"]),
    [replies]
  );

  return (
    <Box w="full" {...rest}>
      <CommentItem data={data} />

      {replies ? replies.length > 0 && renderButton() : null}

      {areRepliesVisible && (
        <Box>
          {listData?.map((item) => (
            <Box key={item.id}>
              <CommentItem data={item} ml="8" mt="3" isReply />

              <Divider mt="3" />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CommentItemWithReplies;
