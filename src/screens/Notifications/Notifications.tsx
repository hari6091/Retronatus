import { Center, ScrollView, Text, Button } from "native-base";
import React from "react";

import { NotificationsScreenProps } from "./types";
import { screens } from "../../constants";
import { useAuth } from "../../hooks";

const Notifications = ({ navigation }: NotificationsScreenProps) => {
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
        <Text>Aqui é a aba de notificações!</Text>
        <Button onPress={handleNavigateLogin}>Sair</Button>
      </ScrollView>
    </Center>
  );
};

export default Notifications;
