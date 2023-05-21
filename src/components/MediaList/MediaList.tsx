import { MaterialIcons } from "@expo/vector-icons";
import { Box, ScrollView, IconButton, Icon } from "native-base";
import React, { useCallback } from "react";

import MediaItem from "./MediaItem";
import { IMediaListProps } from "./types";

const MediaList = ({ items, onRemove }: IMediaListProps) => {
  const handleRemove = useCallback(
    (id: string | number) => {
      return () => onRemove(id);
    },
    [onRemove]
  );

  const renderItem = useCallback(
    (item: (typeof items)[0], index: number) => {
      return (
        <Box
          key={item.id}
          position="relative"
          mr={index === items.length - 1 ? 0 : 3}
        >
          <IconButton
            variant="solid"
            position="absolute"
            size="6"
            top="0"
            right="0"
            zIndex={1}
            bgColor="gray.400"
            borderRadius="full"
            justifyContent="center"
            alignItems="center"
            icon={<Icon as={MaterialIcons} name="close" size="4" />}
            onPress={handleRemove(item.id)}
          />

          <MediaItem testID="media-item" data={item} />
        </Box>
      );
    },
    [handleRemove]
  );

  return (
    <ScrollView horizontal py="2" borderTopWidth="1" borderTopColor="gray.200">
      {items.map((item, index) => renderItem(item, index))}
    </ScrollView>
  );
};

export default MediaList;
