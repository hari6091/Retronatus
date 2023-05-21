import { Video, ResizeMode } from "expo-av";
import { Box, Image } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { IMediaItemProps, MediaTypes } from "./types";

const MediaItem = ({ data, ...rest }: IMediaItemProps) => {
  const WIDTH = 70;
  const HEIGHT = 70;

  let mediaContent;

  switch (data.type) {
    case MediaTypes.IMAGE: {
      mediaContent = (
        <Image
          alt="Image"
          w={WIDTH}
          h={HEIGHT}
          resizeMode="cover"
          source={{ uri: data.source }}
          overflow="hidden"
          borderRadius="8"
        />
      );

      break;
    }
    case MediaTypes.VIDEO: {
      mediaContent = (
        <Box w={WIDTH} h={HEIGHT} overflow="hidden" borderRadius="8">
          <Video
            style={[StyleSheet.absoluteFill, { backgroundColor: "#18181b" }]}
            source={{
              uri: data.source,
            }}
            resizeMode={ResizeMode.CONTAIN}
          />
        </Box>
      );

      break;
    }
  }

  return (
    <Box {...rest} p="2">
      {mediaContent}
    </Box>
  );
};

export default MediaItem;
