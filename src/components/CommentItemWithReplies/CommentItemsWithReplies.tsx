import { Box, Button, Divider } from "native-base";
import React, { useState } from "react";

import { CommentItem } from "../CommentItem";
import { ICommentItemWithRepliesProps } from "./types";

const CommentItemWithReplies = ({
  data,
  ...rest
}: ICommentItemWithRepliesProps) => {
  const { respostas } = data;

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

  return (
    <Box w="full" {...rest}>
      <CommentItem data={data} />

      {respostas ? respostas.length > 0 && renderButton() : null}

      {areRepliesVisible && (
        <Box>
          {respostas?.map((item) => (
            <Box key={item.idResposta}>
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
