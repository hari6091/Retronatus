import { FontAwesome } from "@expo/vector-icons";
import {
  Box,
  HStack,
  IconButton,
  VStack,
  FormControl,
  Input,
  Toast,
} from "native-base";
import React from "react";

import { ICommentFormProps } from "./types";
import { useFormik } from "formik";
import { useComentarios, useUsuario } from "../../hooks";

const CommentForm = ({
  onSubmit: onSubmitProp,
  commentInputRef,
  feedId,
  ...rest
}: ICommentFormProps) => {
  const { createComentario } = useComentarios();
  const { me } = useUsuario();

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isValid,
    isSubmitting,
  } = useFormik({
    initialValues: { text: "" },
    onSubmit: async () => {
      if (feedId && me) {
        console.log("Comentando...");
        await createComentario({
          content: values.text,
          idPublicacao: feedId,
          idUsuario: me.idUsuario,
          date: new Date(Date.now()),
        });
        Toast.show({
          title: "Comentário adicionado com sucesso!",
        });
        resetForm();
      }
    },
  });

  const isSubmitDisabled = !values.text || isSubmitting;

  return (
    <VStack width="full" {...rest}>
      <HStack space={2}>
        <Box flex={1}>
          <FormControl isInvalid={!isValid} flex={1} isRequired>
            <Input
              ref={commentInputRef}
              onChangeText={handleChange("text")}
              placeholder="Deixe um comentário..."
              onBlur={handleBlur("text")}
              value={values.text}
            />
          </FormControl>
        </Box>

        <Box justifyContent="center">
          <IconButton
            _icon={{
              as: FontAwesome,
              name: "send",
              size: "6",
              color: isSubmitDisabled ? "#c4c4c4" : "#000",
            }}
            size="md"
            borderRadius="full"
            variant="unstyled"
            isDisabled={isSubmitDisabled}
            onPress={() => handleSubmit()}
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export default CommentForm;
