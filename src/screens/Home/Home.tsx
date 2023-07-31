import {
  Center,
  Text,
  Input,
  FormControl,
  Icon,
  Box,
  FlatList,
  Fab,
  useDisclose,
  Actionsheet,
  Spinner,
  AlertDialog,
  Button,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { HomeScreenProps } from "./types";
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "../../components";
import { data } from "./MockCards";
import { screens } from "../../constants";
import { useLocais, useUsuario } from "../../hooks";
import { ILocal } from "../../hooks/useLocais/useLocais";

const Home = ({ navigation }: HomeScreenProps) => {
  const { allLocais, deleteLocal } = useLocais();
  const { me } = useUsuario();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [locais, setLocais] = useState<ILocal[]>();

  const loadLocais = useCallback(async () => {
    try {
      setIsLoading(true);
      const getLocais = await allLocais();
      setLocais(getLocais);
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

  useEffect(() => {
    loadLocais();
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      loadLocais();
    }, [loadLocais])
  );

  const handleNavigateNewsfeed = async (idLocal: number) => {
    navigation.navigate(screens.NEWSFEED, { idLocal });
  };

  const handleNavigateAddLocal = () => {
    navigation.navigate(screens.CREATE_LOCAL);
    onClose();
  };

  const handleNavigateAddCategory = () => {
    navigation.navigate(screens.CREATE_CATEGORY);
    onClose();
  };

  const handleNavigateSeeFeedbacks = () => {
    navigation.navigate(screens.CHECK_FEEDBACKS);
    onClose();
  };

  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [localToDelete, setLocalToDelete] = React.useState<number>();

  const onCloseDelete = () => setIsDeleteOpen(false);

  const cancelRef = React.useRef(null);

  const openHandleDeleteLocal = (localId: number) => {
    setIsDeleteOpen(!isDeleteOpen);
    setLocalToDelete(localId);
  };

  const handleDeleteLocal = async () => {
    try {
      if (localToDelete && me?.is_Super_Admin) {
        await deleteLocal(localToDelete);
        onCloseDelete();
        loadLocais();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Center flex={1} flexDirection="column" safeArea px="8" bg="#FFE5A5">
      <Text fontSize="36px" textAlign="center" mb="42px" color="#232831">
        Achaki
      </Text>

      <FlatList
        data={locais}
        onRefresh={() => loadLocais()}
        refreshing={isLoading}
        renderItem={({ item }) => (
          <Box mb="38px">
            <Card
              idLocal={item.idLocal ?? Math.random()}
              name={item.name}
              address={item.address}
              onPress={handleNavigateNewsfeed}
              onLongPress={openHandleDeleteLocal}
            />
          </Box>
        )}
        keyExtractor={(item) => item.idLocal?.toString() ?? ""}
      />
      {me?.is_Super_Admin ? (
        <Fab
          renderInPortal={false}
          right={6}
          bottom={18}
          shadow={3}
          w="64px"
          h="64px"
          bg="#232831"
          icon={<Icon color="white" as={MaterialIcons} name="add" size="md" />}
          onPress={onOpen}
        />
      ) : (
        <Fab
          renderInPortal={false}
          right={6}
          bottom={18}
          shadow={3}
          w="64px"
          h="64px"
          bg="#232831"
          icon={<Icon color="white" as={MaterialIcons} name="add" size="md" />}
          onPress={() => navigation.navigate(screens.FEEDBACK)}
        />
      )}

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={handleNavigateAddLocal}>
            Adicionar novo local
          </Actionsheet.Item>
          <Actionsheet.Item onPress={handleNavigateAddCategory}>
            Adicionar nova categoria
          </Actionsheet.Item>
          <Actionsheet.Item onPress={handleNavigateSeeFeedbacks}>
            Avaliar Solicitações
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isDeleteOpen}
        onClose={onCloseDelete}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Apagar local</AlertDialog.Header>
          <AlertDialog.Body>
            Isto vai deletar esse local. Essa ação não pode ser desfeita. Dados
            apagados não podem ser recuperados.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onCloseDelete}
                ref={cancelRef}
              >
                Cancelar
              </Button>
              <Button colorScheme="danger" onPress={() => handleDeleteLocal()}>
                Deletar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default Home;
