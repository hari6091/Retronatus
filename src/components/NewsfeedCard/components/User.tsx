import { Box, HStack, VStack, Pressable, Text, Avatar } from "native-base";
import React from "react";

import { IUserProps } from "./types";

const User = ({
  avatar,
  name,
  bottomElement,
  rightElement,
  onUserPress,
  ...rest
}: IUserProps) => {
  const avatarSource = avatar?.source ? { uri: avatar.source } : undefined;
  const avatarSize =
    avatar?.width && avatar?.height
      ? { width: avatar?.width, height: avatar?.height }
      : { width: 48, height: 48 };

  return (
    <HStack width="full" space={2} {...rest} alignItems="center">
      <Pressable onPress={onUserPress}>
        <Box style={avatarSize}>
          <Avatar
            bgColor="#c4c4c4"
            source={avatarSource}
            size="full"
            testID="user-avatar"
          />
        </Box>
      </Pressable>

      <VStack space={0.5} flex={1} justifyContent="center">
        <Pressable onPress={onUserPress}>
          <Text isTruncated fontSize="md">
            {name}
          </Text>
        </Pressable>
        {bottomElement && bottomElement}
      </VStack>

      {rightElement && rightElement}
    </HStack>
  );
};

export default User;
