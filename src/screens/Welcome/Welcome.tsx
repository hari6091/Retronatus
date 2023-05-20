import {
  Center,
  Flex,
  ScrollView,
  Image,
  Text,
  Button,
  HStack,
  VStack,
  Box,
} from "native-base";
import React from "react";
import Icon from "../../../assets/main-icon.png";

import { WelcomeScreenProps } from "./types";
import { screens } from "../../constants";

const Welcome = ({ navigation }: WelcomeScreenProps) => {
  const handleNavigateToLogin = () => {
    navigation.navigate(screens.LOGIN);
  };

  const handleNavigateToSignup = () => {
    navigation.navigate(screens.SIGNUP);
  };

  return (
    <ScrollView
      testID="welcome"
      keyboardShouldPersistTaps="always"
      _contentContainerStyle={{ flexGrow: 1 }}
    >
      <Center flex={1} flexDirection="column" safeArea px="10" bg="#232831">
        <Text fontSize="36px" textAlign="center" mb="42px" color="#EBE8E1">
          Retronatus
        </Text>
        <Flex backgroundColor="#FFE5A5" borderRadius="10px" height="60%">
          <VStack space="25%" justifyContent="center">
            <Center pt="8" mx="8">
              <HStack justifyContent="center" alignItems="center">
                <Box w="30%">
                  <Image source={Icon} alt="main_logo" w="42px" h="42px" />
                </Box>
                <Box w="70%">
                  <Text
                    textAlign="center"
                    mt="4"
                    color="#232831"
                    fontSize="16px"
                  >
                    O app de achados e perdidos da sua região.
                  </Text>
                </Box>
              </HStack>
            </Center>
            <Center p="14px">
              <Button.Group size="lg" direction="column" width="full" space="6">
                <Button
                  h="55px"
                  borderRadius="10px"
                  bg="#232831"
                  onPress={handleNavigateToLogin}
                >
                  Login
                </Button>
                <Button
                  h="55px"
                  borderRadius="10px"
                  bg="#232831"
                  onPress={handleNavigateToSignup}
                >
                  Cadastro
                </Button>
              </Button.Group>
            </Center>
          </VStack>
        </Flex>
      </Center>
    </ScrollView>
  );
};

export default Welcome;
