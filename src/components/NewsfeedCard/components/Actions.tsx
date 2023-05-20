import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Icon, Popover, VStack, Button } from "native-base";
import React from "react";

import { INewsfeedCardActionsProps } from "./types";

const Actions = ({ onPressComment, ...rest }: INewsfeedCardActionsProps) => {
  return (
    <HStack justifyContent="flex-start" alignItems="center" py="2" {...rest}>
      <Box w="50%">
        <Button
          size="md"
          bg="#232831"
          onPress={onPressComment}
          leftIcon={<Icon as={Ionicons} name="chatbox-outline" size="sm" />}
        >
          Comentar
        </Button>
      </Box>
    </HStack>
  );
};

export default Actions;
