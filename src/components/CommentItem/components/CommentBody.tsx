import { VStack, Text, Button } from "native-base";
import React, { useState } from "react";

import { ICommentBodyProps } from "./types";
import { LayoutChangeEvent } from "react-native";

const NO_OF_LINES = 8;
const TEXT_HEIGHT = 20 * (NO_OF_LINES - 1);

const CommentBody = ({ content, ...rest }: ICommentBodyProps) => {
  const [textCanBeTruncated, setTextCanBeTruncated] = useState(false);
  const [isTextTruncated, setIsTextTruncated] = useState(true);

  const handleTextLayout = (event: LayoutChangeEvent) => {
    if (event.nativeEvent.layout.height > TEXT_HEIGHT) {
      setTextCanBeTruncated(true);
    } else {
      setTextCanBeTruncated(false);
    }
  };

  const handleToggleText = () => {
    setIsTextTruncated(!isTextTruncated);
  };
  return (
    <VStack space={4} {...rest}>
      {content?.text && (
        <VStack space={2} {...rest}>
          <Text
            fontSize="sm"
            onLayout={handleTextLayout}
            noOfLines={isTextTruncated ? NO_OF_LINES : undefined}
          >
            {content.text}
          </Text>

          {textCanBeTruncated && (
            <Button
              variant="unstyled"
              size="sm"
              alignSelf="flex-start"
              onPress={handleToggleText}
              px="0"
              _text={{
                fontSize: "md",
                color: "#c4c4c4",
              }}
            >
              {isTextTruncated ? "Ver mais" : "Ver menos"}
            </Button>
          )}
        </VStack>
      )}
    </VStack>
  );
};

export default CommentBody;
