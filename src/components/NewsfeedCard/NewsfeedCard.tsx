import React, { useCallback, useEffect, useState } from "react";
import { INewsfeedCardProps } from "./types";
import { VStack } from "native-base";
import { Actions, Header, PostBody, Stats } from "./components";
import { useNavigation } from "@react-navigation/native";
import { SingleViewPostScreenProps } from "../../screens/SingleViewPost/types";
import { screens } from "../../constants";
import { IUsuario, useUsuario } from "../../hooks";

const NewsfeedCard = ({
  data,
  commentInputRef,
  onPressComment,
  ...rest
}: INewsfeedCardProps) => {
  const navigation = useNavigation<SingleViewPostScreenProps["navigation"]>();
  const { idPublicacao, idUsuario, content, status, date } = data;

  const [usuario, setUsuario] = useState<IUsuario>();

  const { getSingleUsuario } = useUsuario();

  const loadUser = useCallback(async () => {
    const getUser = await getSingleUsuario(idUsuario);
    setUsuario(getUser);
  }, [idUsuario]);

  useEffect(() => {
    loadUser();
  });

  const handlePressComment = useCallback(async () => {
    if (onPressComment) {
      await onPressComment();
    }
    if (commentInputRef && typeof commentInputRef !== "undefined") {
      commentInputRef?.current?.focus();
    }
  }, [commentInputRef]);

  const handleOpenSingleViewPost = () => {
    navigation.navigate(screens.SINGLE_VIEW_POST, { feedId: idPublicacao });
  };

  return (
    <VStack {...rest}>
      <Header
        publiId={idPublicacao}
        name={usuario?.name ?? "Carregando..."}
        profilePic=""
        status={status}
        date={date}
        onRequestDetail={handleOpenSingleViewPost}
      />
      <PostBody
        content={{ text: content }}
        onRequestDetail={handleOpenSingleViewPost}
      />
      <Stats
        navigation={navigation}
        commentsAmount={data.comentarios?.length}
        onRequestDetail={handleOpenSingleViewPost}
      />
      <Actions onPressComment={handlePressComment} />
    </VStack>
  );
};

export default NewsfeedCard;
