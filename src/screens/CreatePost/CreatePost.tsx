import * as ImagePicker from "expo-image-picker";
import { filter, findIndex, isNumber } from "lodash";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Select,
} from "native-base";
import React, { useLayoutEffect, useState, useCallback } from "react";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";

import {
  MediaList,
  MediaItemType,
  MediaTypes,
  Progress,
} from "../../components";
import { MediaToolBar } from "./MediaToolbar";
import { CreatePostScreenProps, PostType } from "./types";
import { useFormik } from "formik";

const CreatePost = ({ navigation, route }: CreatePostScreenProps) => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
    resetForm,
    isValid,
    isSubmitting,
  } = useFormik<PostType>({
    initialValues: { text: "", medias: [] },
    onSubmit: async () => {
      if (isSubmitDisabled) {
        return;
      }
      await onSubmit(values);
      resetForm();
    },
  });

  const hasContent = values.text || values.medias.length > 0;
  const isSubmitDisabled = !hasContent || isSubmitting;

  const onSubmit = async ({}: { text: string; medias: MediaItemType[] }) => {
    // if (isSubmitDisabled) {
    //   return;
    // }
    // const images = map(
    //   filter(medias, (item) => item.type === 'image'),
    //   (item) => item.source as string,
    // );
    // const videos = map(
    //   filter(medias, (item) => item.type === 'video'),
    //   (item) => item.source as string,
    // );
    // try {
    //   await publishFeed(
    //     {
    //       target: { type: 'circle', id: selectedGroup.id },
    //       payload: {
    //         text,
    //         link: embed?.url,
    //         gif: gifPayload,
    //         images,
    //         videos,
    //         poll,
    //       },
    //     },
    //     (percentage) => {
    //       setUploadProgress(percentage);
    //     },
    //   );
    //   navigation.goBack();
    // } catch (error) {
    //   Toast.show({
    //     title: intl.formatMessage({
    //       description: 'Text for the error when publishing a post',
    //       defaultMessage: 'Error publishing your new post',
    //     }),
    //     status: 'error',
    //     description: getRequestErrorMessage(error),
    //   });
    // } finally {
    //   setUploadProgress(null);
    // }
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
          height="5"
          _text={{ color: "black", fontSize: 16, fontWeight: 700 }}
          _pressed={{ backgroundColor: "rgba(0,0,0,0)" }}
          onPress={() => handleSubmit()}
          isDisabled={isSubmitDisabled}
          isLoading={isSubmitting}
        >
          Publicar
        </Button>
      ),
    });
  }, [navigation, isSubmitDisabled, isSubmitting, handleSubmit, onSubmit]);

  const handleRemove = useCallback(
    (id: number | string) => {
      setFieldValue(
        "medias",
        filter(values.medias, (item) => item.id !== id)
      );
    },
    [values.medias]
  );

  const addMedia = (mediaItem: MediaItemType) => {
    const newMedias = [...values.medias];

    let prevMediaIndex = -1;

    if (mediaItem.type === "video") {
      prevMediaIndex = findIndex(
        newMedias,
        (item) => item.type === mediaItem.type
      );
    }
    if (prevMediaIndex !== -1) {
      newMedias[prevMediaIndex] = mediaItem;
    } else {
      newMedias.push(mediaItem);
    }
    setFieldValue("medias", newMedias);
  };

  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("A permissão para acessar a câmera é necessária");

      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });

    if (pickerResult.canceled === true) {
      return;
    }

    const mediaItem = {
      id: Date.now(),
      type:
        pickerResult.type === "image"
          ? MediaTypes.IMAGE
          : pickerResult.type === "video"
          ? MediaTypes.VIDEO
          : undefined,
      source: pickerResult.uri,
    } as MediaItemType;

    addMedia(mediaItem);
  };

  return (
    <KeyboardAvoidingView testID="create-post-screen" flex={1}>
      <Box h={1} w="full" bgColor="white" />
      <ScrollView flex={1} bg="white" _contentContainerStyle={{ flexGrow: 1 }}>
        <Box px={4} py={3}>
          <FormControl isRequired isReadOnly>
            <FormControl.Label>Você achou ou perdeu algo?</FormControl.Label>
            <Select w="full" placeholder="Selecione o status..." mt="1">
              <Select.Item label="Eu achei algo" value="achado" />
              <Select.Item label="Eu perdi algo" value="perdido" />
            </Select>
          </FormControl>
        </Box>

        <Box px={4} py={3}>
          <FormControl isRequired isReadOnly>
            <FormControl.Label>
              Selecione a categoria do item que você irá publicar
            </FormControl.Label>
            <Select w="full" placeholder="Selecione a categoria..." mt="1">
              <Select.Item label="UX Research" value="ux" />
              <Select.Item label="Web Development" value="web" />
              <Select.Item label="Cross Platform Development" value="cross" />
              <Select.Item label="UI Designing" value="ui" />
              <Select.Item label="Backend Development" value="backend" />
            </Select>
          </FormControl>
        </Box>

        <Divider />

        <FormControl isInvalid={!isValid} isDisabled={isSubmitting} isRequired>
          <Input
            multiline
            variant="unstyled"
            value={values.text}
            onChangeText={handleChange("text")}
            placeholder="Publique algo, dê uma descrição bem detalhada..."
            fontSize="16px"
            p={12}
            flex={1}
            borderWidth={0}
            px={4}
            py={6}
            bg="#fff"
            onBlur={handleBlur("text")}
            numberOfLines={15}
            textAlignVertical="top"
          />
        </FormControl>

        {values.medias.length > 0 && (
          <Box style={{ height: 98 }}>
            <MediaList items={values.medias} onRemove={handleRemove} />
          </Box>
        )}
      </ScrollView>

      <KeyboardAccessoryView alwaysVisible androidAdjustResize hideBorder>
        <MediaToolBar
          isDisabled={isSubmitting}
          onPressImage={openImagePickerAsync}
        />
      </KeyboardAccessoryView>
    </KeyboardAvoidingView>
  );
};

export default CreatePost;
