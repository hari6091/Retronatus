import {
  Box,
  FlatList,
  HStack,
  Icon,
  Pressable,
  VStack,
  Text,
  AlertDialog,
  Button,
  Toast,
} from "native-base";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFeedbacks } from "../../hooks";
import { IFeedback } from "../../hooks/useFeedbacks/useFeedbacks";
import { useFocusEffect } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const CheckFeedbacks = () => {
  const { getFeedbacks, confirmFeedback, deleteFeedback } = useFeedbacks();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>();

  const loadFeedbacks = useCallback(async () => {
    try {
      setIsLoading(true);
      const getFdbk = await getFeedbacks();
      setFeedbacks(getFdbk.reverse());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFeedbacks();
    }, [loadFeedbacks])
  );

  const [isOpen, setIsOpen] = useState(false);
  const [feedbackId, setFeedbackId] = useState<number | undefined>(undefined);

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);

  const [isOpenDeleteFeedback, setIsOpenDeleteFeedback] = useState(false);

  const renderItem = useCallback(
    ({ item }: { item: IFeedback }) => (
      <Pressable
        m="22px"
        onPress={() => {
          setIsOpen(true);
          setFeedbackId(item.idFeedback);
        }}
        onLongPress={() => {
          setIsOpenDeleteFeedback(true);
          setFeedbackId(item.idFeedback);
        }}
      >
        <HStack
          bg="#FDFDFF"
          w="full"
          justifyContent="space-evenly"
          alignItems="center"
          borderColor="#232831"
          borderWidth="1px"
          borderRadius="10px"
          p="20px 16px"
        >
          <Icon
            as={Entypo}
            name={item.type === "Local" ? "location" : "sound-mix"}
            size="12"
          />
          <VStack w="60%">
            <Text fontSize="16px">{item.name}</Text>
            <Text fontSize="14px">{item.address}</Text>
            <Text fontSize="14px">{item.type}</Text>
          </VStack>
        </HStack>
      </Pressable>
    ),
    []
  );

  const keyExtractor = useCallback(
    (item: IFeedback) =>
      item.idFeedback?.toString() ?? Math.random().toString(),
    []
  );

  const ItemSeparatorComponent = useCallback(() => <Box mt="2" />, []);

  const handleConfirmFeedback = async () => {
    try {
      if (feedbackId) {
        await confirmFeedback(feedbackId);
      }
      onClose();
      loadFeedbacks();
      Toast.show({
        title: "Feedback adicionado!",
      });
    } catch (err) {
      Toast.show({
        title: "Algo deu errado. " + err,
      });
    }
  };

  const handleDeleteFeedback = async () => {
    try {
      if (feedbackId) {
        await deleteFeedback(feedbackId);
      }
      setIsOpenDeleteFeedback(false);
      loadFeedbacks();
      Toast.show({
        title: "Feedback removido!",
      });
    } catch (err) {
      Toast.show({
        title: "Algo deu errado. " + err,
      });
    }
  };

  return (
    <Box flex={1} safeAreaX bg="#FFF">
      <FlatList
        testID="feedback-items"
        flex={1}
        data={feedbacks}
        onRefresh={() => loadFeedbacks()}
        refreshing={isLoading}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        w="full"
      />

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Confirmar feedback</AlertDialog.Header>
          <AlertDialog.Body>
            Isto vai confirmar a criação desse feeback.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancelar
              </Button>
              <Button colorScheme="emerald" onPress={handleConfirmFeedback}>
                Criar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpenDeleteFeedback}
        onClose={() => {
          setIsOpenDeleteFeedback(false);
        }}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Deletar feedback</AlertDialog.Header>
          <AlertDialog.Body>
            Isto vai deletar esse feeback. Essa informação não poderá ser
            recuperada.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => {
                  setIsOpenDeleteFeedback(false);
                }}
                ref={cancelRef}
              >
                Cancelar
              </Button>
              <Button colorScheme="danger" onPress={handleDeleteFeedback}>
                Deletar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};

export default CheckFeedbacks;