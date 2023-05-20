import { Box, HStack, Pressable, Text } from "native-base";
import React, { memo } from "react";

import { INewsfeedCardStatsProps } from "./types";

const NewsfeedCardStats = ({
  commentsAmount = 0,
  navigation,
  onRequestDetail,
  ...rest
}: INewsfeedCardStatsProps) => {
  return (
    <Pressable onPress={onRequestDetail}>
      <HStack space={1} justifyContent="space-between" {...rest}>
        <Box w="full">
          <Pressable py="1" onPress={onRequestDetail}>
            {({ isPressed }) => (
              <Text
                fontSize="sm"
                textAlign="right"
                color="#c4c4c4"
                style={{
                  transform: [
                    {
                      scale: isPressed ? 0.98 : 1,
                    },
                  ],
                }}
              >
                {commentsAmount === 0 || commentsAmount > 1
                  ? `${commentsAmount} comentários`
                  : `${commentsAmount} comentário`}
              </Text>
            )}
          </Pressable>
        </Box>
      </HStack>
    </Pressable>
  );
};

export default memo(NewsfeedCardStats);
