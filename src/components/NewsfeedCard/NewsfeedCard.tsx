import React, { useCallback, useEffect, useState } from "react";
import { INewsfeedCardProps } from "./types";
import { AlertDialog, Button, VStack } from "native-base";
import { Actions, Header, PostBody, Stats } from "./components";
import { useNavigation } from "@react-navigation/native";
import { SingleViewPostScreenProps } from "../../screens/SingleViewPost/types";
import { screens } from "../../constants";
import { IUsuario, usePublicacoes, useUsuario } from "../../hooks";

const NewsfeedCard = ({
  data,
  commentInputRef,
  onPressComment,
  isSingleView,
  onPublicacaoDeleted,
  ...rest
}: INewsfeedCardProps) => {
  const navigation = useNavigation<SingleViewPostScreenProps["navigation"]>();

  const { idPublicacao, idUsuario, content, status, date } = data || {};

  const { me } = useUsuario();

  const [usuario, setUsuario] = useState<IUsuario>();

  const { getSingleUsuario } = useUsuario();

  const loadUser = useCallback(async () => {
    if (idUsuario) {
      const getUser = await getSingleUsuario(idUsuario);
      setUsuario(getUser);
    }
  }, [idUsuario]);

  useEffect(() => {
    loadUser();
  }, []);

  const handlePressComment = useCallback(async () => {
    if (onPressComment) {
      await onPressComment();
    }
    if (commentInputRef && typeof commentInputRef !== "undefined") {
      commentInputRef?.current?.focus();
    }
  }, [commentInputRef]);

  const handleOpenSingleViewPost = () => {
    navigation.navigate(screens.SINGLE_VIEW_POST, {
      feedId: idPublicacao ?? 1,
    });
  };

  const isOwner = me?.idUsuario === idUsuario;

  const [info, setInfo] = useState<
    "achado" | "perdido" | "devolvido" | undefined
  >(status);

  const { editPublicacao, deletePublicacao } = usePublicacoes();

  const handlePressDevolvido = async () => {
    if (data) {
      try {
        await editPublicacao({ ...data, status: "devolvido" });
        setInfo("devolvido");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handlePressPerdido = async () => {
    if (data) {
      try {
        await editPublicacao({ ...data, status: "perdido" });
        setInfo("perdido");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handlePressAchado = async () => {
    if (data) {
      try {
        await editPublicacao({ ...data, status: "achado" });
        setInfo("achado");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handlePressUser = async () => {
    if (idUsuario) {
      navigation.navigate(screens.USER_PROFILE, { userId: idUsuario });
    }
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  const handlePressDelete = async () => {
    if (idPublicacao) {
      try {
        await deletePublicacao(idPublicacao);
        onClose();
        if (isSingleView) {
          navigation.goBack();
        }
        if (onPublicacaoDeleted) {
          onPublicacaoDeleted();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <>
      <VStack {...rest}>
        <Header
          isOwner={isOwner}
          publiId={idPublicacao}
          name={usuario?.name ?? "Carregando..."}
          profilePic=""
          status={info ?? status}
          date={date}
          onRequestDetail={handleOpenSingleViewPost}
          onPressPerdido={handlePressPerdido}
          onPressAchado={handlePressAchado}
          onPressDevolvido={handlePressDevolvido}
          onUserClick={handlePressUser}
          onPressDelete={() => setIsOpen(!isOpen)}
        />
        <PostBody
          content={{ text: content }}
          onRequestDetail={handleOpenSingleViewPost}
        />
        <Stats
          navigation={navigation}
          commentsAmount={data?.comentarios?.length}
          onRequestDetail={handleOpenSingleViewPost}
        />
        <Actions onPressComment={handlePressComment} />
      </VStack>

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
    </>
  );
};

export default NewsfeedCard;
