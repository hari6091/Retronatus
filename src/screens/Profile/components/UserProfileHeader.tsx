import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  HStack,
  Icon,
  Button,
  Avatar,
  Heading,
  Text,
} from "native-base";
import React from "react";

import { ProfileScreenProps, ProfileHeaderProps } from "../types";

export default function UserProfileScreenHeader({
  user,
  isOwner,
  isAdmin,
  onEditProfile,
}: ProfileHeaderProps) {
  const navigation = useNavigation<ProfileScreenProps["navigation"]>();
  return (
    <Box>
      <HStack
        py="4"
        px="2"
        backgroundColor="#fff"
        justifyContent="space-between"
        space="12"
        shadow="1"
      >
        <Box width="1/5" alignItems="center">
          <Button
            testID="btn-back"
            mt="1"
            variant="ghost"
            size="full"
            height="32px"
            justifyContent="center"
            alignItems="center"
            onPress={navigation.goBack}
            _text={{ color: "black", fontSize: 18, fontWeight: 700 }}
            _pressed={{ backgroundColor: "rgba(0,0,0,0)" }}
            leftIcon={
              <Icon mb="1" size="6" as={MaterialIcons} name="arrow-back" />
            }
          >
            Voltar
          </Button>
        </Box>
      </HStack>

      <Center pt="12px">
        <Avatar width="140px" height="140px" />

        <Heading size="xl" mt="16px">
          {user.name}
        </Heading>

        {isAdmin ? (
          <Text size="sm" textAlign="center" height="22px">
            Administrador
          </Text>
        ) : null}

        {isOwner ? (
          <Button mt="20px" size="sm" onPress={onEditProfile}>
            Editar perfil
          </Button>
        ) : null}
      </Center>
    </Box>
  );
}
