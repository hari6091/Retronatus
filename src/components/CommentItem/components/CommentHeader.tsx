import { HStack, VStack, Text, Avatar } from "native-base";
import React from "react";

import { ICommentHeaderProps } from "./types";

const CommentHeader = ({
  author,
  publishedAt,
  ...rest
}: ICommentHeaderProps) => {
  const authorAvatarSource = author.profilePicThumb
    ? { uri: author.profilePicThumb }
    : undefined;

  return (
    <HStack space={2} {...rest}>
      <Avatar source={authorAvatarSource} />

      <VStack flex={1} justifyContent="center">
        <HStack justifyContent="center">
          <Text isTruncated flex={1}>
            {author.name}
          </Text>
        </HStack>

        <HStack flex={1}>
          <Text fontSize="sm" flexShrink={0}>
            {publishedAt}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default CommentHeader;
