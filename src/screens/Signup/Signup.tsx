import {
  Center,
  Flex,
  ScrollView,
  Text,
  Button,
  HStack,
  VStack,
  Box,
  Link,
  Input,
  FormControl,
  Toast,
} from "native-base";
import React from "react";
import * as Yup from "yup";

import { SignupScreenProps, SignupType } from "./types";
import { screens } from "../../constants";
import { useFormik } from "formik";
import { useAuth } from "../../hooks";

const SignUpSchema = () =>
  Yup.object().shape({
    name: Yup.string().required("Este campo é obrigatório!"),
    email: Yup.string()
      .email("Insira um email válido!")
      .required("Este campo é obrigatório!"),
    password: Yup.string().required("Este campo é obrigatório!"),
    confPassword: Yup.string().required("Este campo é obrigatório!"),
  });

const Signup = ({ navigation }: SignupScreenProps) => {
  const { signUp } = useAuth();

  const handleSignUp = async (values: SignupType) => {
    try {
      await signUp(values);
      navigation.goBack();
      Toast.show({
        title: "Cadastro realizado! Efetue o login",
      });
    } catch (err) {
      Toast.show({
        title: "Algo deu errado, tente novamente mais tarde.",
      });
    }
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError,
    isSubmitting,
  } = useFormik({
    initialValues: { name: "", email: "", password: "", confPassword: "" },
    validationSchema: SignUpSchema,
    onSubmit: () => {
      if (values.password !== values.confPassword) {
        setFieldError("confPassword", "As senhas não combinam!");
        return;
      }
      handleSignUp(values);
    },
  });

  const handleNavigateToLogin = () => {
    navigation.navigate(screens.LOGIN);
  };

  const getErrorMsg = (field: keyof typeof values) => {
    return touched[field] ? errors[field] : undefined;
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      _contentContainerStyle={{ flexGrow: 1 }}
    >
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
                    Faça o seu cadastro!
                  </Text>
                </Box>
              </HStack>
            </Center>
            <Center p="14px">
              <FormControl mb="6" isInvalid={!!getErrorMsg("name")}>
                <Input
                  placeholder="Nome"
                  borderColor="#232831"
                  borderBottomWidth="2"
                  borderLeftWidth="0"
                  borderRightWidth="0"
                  borderTopWidth="0"
                  borderRadius="0"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                />
                <FormControl.ErrorMessage>
                  {getErrorMsg("name")}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl mb="6" isInvalid={!!getErrorMsg("email")}>
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
              <FormControl mb="6" isInvalid={!!getErrorMsg("password")}>
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
              <FormControl mb="12" isInvalid={!!getErrorMsg("confPassword")}>
                <Input
                  placeholder="Confirmar senha"
                  type="password"
                  borderColor="#232831"
                  borderBottomWidth="2"
                  borderLeftWidth="0"
                  borderRightWidth="0"
                  borderTopWidth="0"
                  borderRadius="0"
                  onChangeText={handleChange("confPassword")}
                  onBlur={handleBlur("confPassword")}
                />
                <FormControl.ErrorMessage>
                  {getErrorMsg("confPassword")}
                </FormControl.ErrorMessage>
              </FormControl>
              <VStack w="full" space="6">
                <Button
                  h="55px"
                  w="full"
                  borderRadius="10px"
                  bg="#232831"
                  onPress={() => handleSubmit()}
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                >
                  Cadastrar-se
                </Button>
                <HStack justifyContent="center" w="full">
                  <Text>Já possui cadastro? </Text>
                  <Link onPress={handleNavigateToLogin}>Login</Link>
                </HStack>
              </VStack>
            </Center>
          </VStack>
        </Flex>
      </Center>
    </ScrollView>
  );
};

export default Signup;
