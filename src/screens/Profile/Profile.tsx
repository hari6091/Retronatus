import { Center, ScrollView, Text, Button } from "native-base";
import React from "react";

import { ProfileScreenProps } from "./types";
import { screens } from "../../constants";
import { useAuth } from "../../hooks";

const Profile = ({ navigation }: ProfileScreenProps) => {
  const { logout } = useAuth();

  const handleNavigateLogin = async () => {
    await logout();
    navigation.navigate(screens.WELCOME);
  };

  return (
    <Center flex={1} flexDirection="column" safeArea px="10" bg="#FFE5A5">
      <Text fontSize="36px" textAlign="center" mb="42px" color="#232831">
        Retronatus
      </Text>
      <ScrollView
        keyboardShouldPersistTaps="always"
        _contentContainerStyle={{ flexGrow: 1 }}
      >
        <Text>Aqui é a aba do perfil!</Text>
        <Button onPress={handleNavigateLogin}>Sair</Button>
      </ScrollView>
    </Center>
  );
};

export default Profile;
