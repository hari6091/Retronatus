import {
  Center,
  Flex,
  Text,
  Button,
  HStack,
  VStack,
  Box,
  Link,
  FormControl,
  Input,
} from "native-base";
import React from "react";
import * as Yup from "yup";

import { LoginScreenProps, SignInType } from "./types";
import { screens } from "../../constants";
import { useAuth } from "../../hooks";
import { useFormik } from "formik";

const SignInSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email("Insira um email válido!")
      .required("Este campo é obrigatório!"),
    password: Yup.string().required("Este campo é obrigatório!"),
  });

const Login = ({ navigation }: LoginScreenProps) => {
  const { signIn } = useAuth();

  const handleNavigateToSignup = () => {
    navigation.navigate(screens.SIGNUP);
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: SignInSchema,
      onSubmit: () => {
        signIn(values);
      },
    });

  const getErrorMsg = (field: keyof typeof values) => {
    return touched[field] ? errors[field] : undefined;
  };

  return (
    <>
      <Center flex={1} flexDirection="column" safeArea px="10" bg="#232831">
        <Text fontSize="36px" textAlign="center" mb="42px" color="#EBE8E1">
          Retronatus
        </Text>
        <Flex backgroundColor="#FFE5A5" borderRadius="10px">
          <VStack justifyContent="center">
            <Center pt="8" mx="8">
              <HStack justifyContent="center" alignItems="center">
                <Box w="full">
                  <Text textAlign="center" color="#232831" fontSize="18px">
                    Login
                  </Text>
                </Box>
              </HStack>
            </Center>
            <Center p="14px">
              <FormControl isInvalid={!!getErrorMsg("email")} mb="6">
                <Input
                  placeholder="Email"
                  borderColor="#232831"
                  borderBottomWidth="2"
                  borderLeftWidth="0"
                  borderRightWidth="0"
                  borderTopWidth="0"
                  borderRadius="0"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                <FormControl.ErrorMessage>
                  {getErrorMsg("email")}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl mb="12" isInvalid={!!getErrorMsg("password")}>
                <Input
                  placeholder="Senha"
                  type="password"
                  borderColor="#232831"
                  borderBottomWidth="2"
                  borderLeftWidth="0"
                  borderRightWidth="0"
                  borderTopWidth="0"
                  borderRadius="0"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                <FormControl.ErrorMessage>
                  {getErrorMsg("password")}
                </FormControl.ErrorMessage>
              </FormControl>
              <VStack w="full" space="6">
                <Button
                  h="55px"
                  w="full"
                  borderRadius="10px"
                  bg="#232831"
                  onPress={() => handleSubmit()}
                >
                  Login
                </Button>
                <HStack justifyContent="center" w="full">
                  <Text>Não possui cadastro? </Text>
                  <Link onPress={handleNavigateToSignup}>Cadastre-se</Link>
                </HStack>
              </VStack>
            </Center>
          </VStack>
        </Flex>
      </Center>
    </>
  );
};

export default Login;
