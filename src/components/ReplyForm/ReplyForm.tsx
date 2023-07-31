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

import { IReplyFormrops } from "./types";
import { useFormik } from "formik";
import { useRespostas, useUsuario } from "../../hooks";

const ReplyForm = ({
  commentInputRef,
  commentId,
  onAddReply,
  ...rest
}: IReplyFormrops) => {
  const { createResposta } = useRespostas(commentId);
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
      if (commentId && me) {
        await createResposta({
          content: values.text,
          idComentario: commentId,
          idUsuario: me.idUsuario,
          date: new Date(Date.now()),
        });
        if (onAddReply) {
          onAddReply();
        }
        Toast.show({
          title: "Resposta adicionada com sucesso!",
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
              placeholder="Deixe uma resposta..."
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

export default ReplyForm;
