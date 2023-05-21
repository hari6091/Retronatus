import { MaterialIcons } from "@expo/vector-icons";
import { HStack, IconButton, Icon, Text, Pressable } from "native-base";
import React from "react";

import { IMediaToolbarProps } from "./types";

const MediaToolbar = ({ onPressImage }: IMediaToolbarProps) => {
  return (
    <Pressable onPress={onPressImage}>
      <HStack
        w="full"
        px={6}
        shadow={2}
        bgColor="white"
        h={74}
        alignItems="center"
        space={2}
      >
        <IconButton
          icon={<Icon as={MaterialIcons} name="camera-alt" size={7} />}
          size={10}
          color="#777777"
          variant="unstyled"
          justifyContent="center"
          alignItems="center"
          onPress={onPressImage}
        />
        <Text>Adicione algumas imagens ou vídeos...</Text>
      </HStack>
    </Pressable>
  );
};

export default MediaToolbar;
