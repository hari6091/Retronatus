import {
  Actionsheet,
  Badge,
  HStack,
  IconButton,
  Text,
  useDisclose,
  Pressable,
  Button,
  AlertDialog,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import User from "./User";
import { IUserFeedCardHeaderProps } from "./types";
import { FontAwesome5 } from "@expo/vector-icons";
import { IPublicacao, usePublicacoes } from "../../../hooks";
import { SingleViewPostScreenProps } from "../../../screens/SingleViewPost/types";

const Icon = ({
  type,
}: {
  type: "achado" | "perdido" | "devolvido" | undefined;
}) => {
  switch (type) {
    case "perdido":
      return <Badge colorScheme="error">Perdido</Badge>;
    case "achado":
      return <Badge colorScheme="warning">Achado</Badge>;
    default:
      return <Badge colorScheme="success">Devolvido</Badge>;
  }
};

const UserFeedCard = ({
  name,
  profilePic,
  status,
  date,
  publiId,
  onRequestDetail,
  isOwner,
  isSingleView,
  onPressPerdido,
  onPressAchado,
  onPressDevolvido,
  ...rest
}: IUserFeedCardHeaderProps) => {
  const [publicacao, setPublicacao] = useState<IPublicacao>();

  const { editPublicacao, getSinglePublicacao, deletePublicacao } =
    usePublicacoes();
  const navigation = useNavigation<SingleViewPostScreenProps["navigation"]>();

  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  const loadPubli = useCallback(async () => {
    const getPubli = await getSinglePublicacao(publiId);
    setPublicacao(getPubli);
  }, [publiId]);

  useEffect(() => {
    loadPubli();
  }, []);

  const handlePressDelete = async () => {
    if (publicacao) {
      try {
        await deletePublicacao(publiId);
        onClose();
        if (isSingleView) {
          navigation.goBack();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const formattedDate = () => {
    if (date) {
      return new Date(date).toLocaleString("pt-br", {
        dateStyle: "short",
        timeStyle: "short",
      });
    }
  };

  return (
    <Pressable onPress={onRequestDetail}>
      <User
        avatar={{
          source: profilePic,
        }}
        name={name}
        // onUserPress={onUserAvatarPress}
        rightElement={
          <HStack space="5">
            {status && <Icon type={status} />}
            {isOwner ? (
              <MoreOptionsAccessory
                onClickAchado={onPressAchado}
                onClickDevolvido={onPressDevolvido}
                onClickPerdido={onPressPerdido}
                onClickDelete={() => setIsOpen(!isOpen)}
                status={status}
              />
            ) : null}
          </HStack>
        }
        bottomElement={<Text>{formattedDate()}</Text>}
        {...rest}
      />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Apagar publicacão</AlertDialog.Header>
          <AlertDialog.Body>
            Isto vai deletar esse post. Essa ação não pode ser desfeita. Dados
            apagados não podem ser recuperados.
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
              <Button colorScheme="danger" onPress={handlePressDelete}>
                Deletar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Pressable>
  );
};

const MoreOptionsAccessory = ({
  status,
  onClickDevolvido,
  onClickAchado,
  onClickPerdido,
  onClickDelete,
}: {
  status: "achado" | "perdido" | "devolvido" | undefined;
  onClickDevolvido: () => void;
  onClickAchado: () => void;
  onClickPerdido: () => void;
  onClickDelete: () => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <>
      <IconButton
        _icon={{
          as: FontAwesome5,
          name: "ellipsis-h",
          size: "5",
          color: "#000",
        }}
        onPress={onOpen}
        size="5"
        borderRadius="full"
      />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {status === "devolvido" ? null : (
            <Actionsheet.Item
              onPress={() => {
                onClickDevolvido();
                onClose();
              }}
            >
              Marcar como DEVOLVIDO
            </Actionsheet.Item>
          )}
          {status === "achado" ? null : (
            <Actionsheet.Item
              onPress={() => {
                onClickAchado();
                onClose();
              }}
            >
              Marcar como ACHADO
            </Actionsheet.Item>
          )}
          {status === "perdido" ? null : (
            <Actionsheet.Item
              onPress={() => {
                onClickPerdido();
                onClose();
              }}
            >
              Marcar como PERDIDO
            </Actionsheet.Item>
          )}
          <Actionsheet.Item
            onPress={() => {
              onClickDelete();
              onClose();
            }}
          >
            DELETAR
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default UserFeedCard;
