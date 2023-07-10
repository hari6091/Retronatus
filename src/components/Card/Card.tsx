import { Entypo } from "@expo/vector-icons";
import { HStack, Icon, Pressable, Text, VStack } from "native-base";
import React from "react";

export type CardType = {
  idLocal: number;
  name: string;
  address: string;
  onPress?: (idLocal: number) => void;
  onLongPress?: (idLocal: number) => void;
};

export const Card = ({
  idLocal,
  name,
  address,
  onPress,
  onLongPress,
}: CardType) => {
  return (
    <Pressable
      onPress={() => onPress?.(idLocal)}
      onLongPress={() => onLongPress?.(idLocal)}
    >
      <HStack
        bg="#EBE8E1"
        w="full"
        justifyContent="space-evenly"
        alignItems="center"
        borderColor="#232831"
        borderWidth="1px"
        borderRadius="10px"
        p="20px 16px"
      >
        <Icon as={Entypo} name="location" size="12" />
        <VStack w="60%">
          <Text fontSize="16px">{name}</Text>
          <Text fontSize="12px">{address}</Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default Card;
