import React, { useLayoutEffect } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Toast,
} from "native-base";
import { useFormik } from "formik";
import { useCategorias } from "../../hooks";
import { CategoryType, CreateCategoryScreenProps } from "./types";

const CreateCategory = ({ navigation }: CreateCategoryScreenProps) => {
  const { createCategoria } = useCategorias();
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isValid,
    isSubmitting,
  } = useFormik<CategoryType>({
    initialValues: { name: "" },
    onSubmit: async () => {
      if (isSubmitDisabled) {
        return;
      }
      await onSubmit(values);
      resetForm();
    },
  });
  const hasContent = values.name;
  const isSubmitDisabled = !hasContent || isSubmitting;

  const onSubmit = async (props: CategoryType) => {
    if (isSubmitDisabled) {
      return;
    }
    try {
      await createCategoria(props);
      navigation.goBack();
    } catch (error) {
      Toast.show({
        title: "Erro ao criar categoria",
        description: JSON.stringify(error),
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          mt="1"
          pr="4"
          testID="btn-save"
          borderRadius="0"
          variant="unstyled"
          size="full"
          justifyContent="flex-end"
          alignItems="center"
          height="8"
          _text={{ color: "black", fontSize: 18, fontWeight: 700 }}
          _pressed={{ backgroundColor: "rgba(0,0,0,0)" }}
          onPress={() => handleSubmit()}
          isDisabled={isSubmitDisabled}
          isLoading={isSubmitting}
        >
          Criar
        </Button>
      ),
    });
  }, [navigation, isSubmitDisabled, isSubmitting, handleSubmit, onSubmit]);

  return (
    <KeyboardAvoidingView flex={1}>
      <Box h={1} w="full" bgColor="white" />
      <ScrollView flex={1} bg="white" _contentContainerStyle={{ flexGrow: 1 }}>
        <Box px={4} py={6}>
          <FormControl
            isRequired
            isDisabled={isSubmitting}
            isInvalid={!isValid}
          >
            <FormControl.Label>
              Informe o nome da categoria que deseja criar:
            </FormControl.Label>
            <Input
              value={values.name}
              onChangeText={handleChange("name")}
              placeholder="Ex.: Eletrônicos"
              fontSize="16px"
              flex={1}
              p={4}
              bg="#fff"
              onBlur={handleBlur("name")}
              textAlignVertical="top"
            />
          </FormControl>
        </Box>

        <Divider />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateCategory;
