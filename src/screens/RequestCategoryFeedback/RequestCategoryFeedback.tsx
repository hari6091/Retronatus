import React, { useLayoutEffect } from "react";
import { RequestCategoryFeedbackProps } from "./types";
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
import { useFeedbacks } from "../../hooks";
import { IFeedback } from "../../hooks/useFeedbacks/useFeedbacks";

const RequestCategoryFeedback = ({
  navigation,
}: RequestCategoryFeedbackProps) => {
  const { createFeedbackCategoria } = useFeedbacks();
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
  } = useFormik<IFeedback>({
    initialValues: { name: "", type: "Category" },
    onSubmit: async () => {
      await onSubmit(values);
    },
  });

  const onSubmit = async (props: IFeedback) => {
    try {
      await createFeedbackCategoria(props);
      Toast.show({
        title: "Solicitação enviada, aguarde aprovação do administrador",
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        title: "Erro ao criar categoria",
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
          isDisabled={!values.name}
          isLoading={isSubmitting}
        >
          Confirmar
        </Button>
      ),
    });
  }, [navigation, isSubmitting, handleSubmit, onSubmit]);

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
              Informe o nome da categoria que deseja solicitar:
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RequestCategoryFeedback;
