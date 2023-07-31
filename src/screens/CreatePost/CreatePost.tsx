import * as ImagePicker from "expo-image-picker";
import { filter, findIndex } from "lodash";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Select,
  Toast,
} from "native-base";
import React, { useLayoutEffect, useCallback, useState } from "react";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";

import { MediaList, MediaItemType, MediaTypes } from "../../components";
import { MediaToolBar } from "./MediaToolbar";
import { CreatePostScreenProps, PostType } from "./types";
import { useFormik } from "formik";
import { useCategorias, usePublicacoes, useUsuario } from "../../hooks";

const CreatePost = ({ navigation, route }: CreatePostScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createPublicacao } = usePublicacoes();
  const { me } = useUsuario();
  const { categorias } = useCategorias();

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
    initialValues: { text: "", medias: [], status: "perdido", categoria: "" },
    onSubmit: async () => {
      await onSubmit(values);
      resetForm();
    },
  });

  const onSubmit = async ({}: { text: string; medias: MediaItemType[] }) => {
    try {
      if (me) {
        setIsLoading(!isLoading);
        await createPublicacao({
          content: values.text,
          medias: values.medias,
          status: values.status,
          idUsuario: me?.idUsuario,
          idLocal: route.params.eventId,
          idCategoria: +values.categoria,
        });
        navigation.goBack();
      }
      return;
    } catch (error) {
      Toast.show({
        title: "Erro ao publicar postagem",
        description: "Error: " + error,
      });
    } finally {
      setIsLoading(!isLoading);
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
          height="5"
          _text={{ color: "black", fontSize: 16, fontWeight: 700 }}
          _pressed={{ backgroundColor: "rgba(0,0,0,0)" }}
          onPress={() => handleSubmit()}
          isLoading={isLoading}
          isDisabled={
            isSubmitting || !values.categoria || !values.status || !values.text
          }
        >
          Publicar
        </Button>
      ),
    });
  }, [navigation, isSubmitting, handleSubmit, onSubmit]);

  const handleRemove = useCallback(
    (id: number | string) => {
      setFieldValue(
        "medias",
        filter(values.medias, (item) => item.idMedia !== id)
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
      idMedia: Date.now(),
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
            <Select
              w="full"
              placeholder="Selecione o status..."
              mt="1"
              onValueChange={handleChange("status")}
            >
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
            <Select
              w="full"
              placeholder="Selecione a categoria..."
              mt="1"
              onValueChange={handleChange("categoria")}
            >
              {categorias
                ? categorias.map((categoria) => (
                    <Select.Item
                      label={categoria.name}
                      value={categoria.idCategoria?.toString() ?? ""}
                      key={categoria.idCategoria}
                    />
                  ))
                : null}
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
