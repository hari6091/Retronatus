import { FontAwesome } from "@expo/vector-icons";
import {
  Box,
  HStack,
  IconButton,
  VStack,
  FormControl,
  Input,
} from "native-base";
import React from "react";

import { ICommentFormProps } from "./types";
import { useFormik } from "formik";

const CommentForm = ({
  onSubmit: onSubmitProp,
  commentInputRef,
  feedId,
  ...rest
}: ICommentFormProps) => {
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
      if (isSubmitDisabled || !onSubmitProp) {
        return;
      }
      await onSubmitProp({ feedId, text: values.text });
      resetForm();
    },
  });

  const hasContent = values.text;
  const isSubmitDisabled = !hasContent || isSubmitting;

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
