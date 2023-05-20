import { Entypo } from "@expo/vector-icons";
import { HStack, Icon, Pressable, Text, VStack } from "native-base";
import React from "react";

export type CardType = {
  id: number;
  title: string;
  date?: string;
  icon?: string;
  onPress?: (id: number) => void;
};

export const Card = ({ id, title, date, icon, onPress }: CardType) => {
  return (
    <Pressable onPress={() => onPress?.(id)}>
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
        <Icon as={Entypo} name={icon ?? "location"} size="12" />
        <VStack w="60%">
          <Text fontSize="16px">{title}</Text>
          <Text fontSize="12px">{date}</Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default Card;
