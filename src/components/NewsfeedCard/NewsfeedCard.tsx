import React, { useCallback } from "react";
import { INewsfeedCardProps } from "./types";
import { VStack } from "native-base";
import { Actions, Header, PostBody, Stats } from "./components";
import { useNavigation } from "@react-navigation/native";
import { SingleViewPostScreenProps } from "../../screens/SingleViewPost/types";
import { screens } from "../../constants";

const NewsfeedCard = ({
  data,
  commentInputRef,
  onPressComment,
  ...rest
}: INewsfeedCardProps) => {
  const navigation = useNavigation<SingleViewPostScreenProps["navigation"]>();

  const { id_publi, name, profilePic, descricao, status, data_cadastro } = data;

  const handlePressComment = useCallback(async () => {
    if (onPressComment) {
      await onPressComment();
    }
    if (commentInputRef && typeof commentInputRef !== "undefined") {
      commentInputRef?.current?.focus();
    }
  }, [commentInputRef]);

  const handleOpenSingleViewPost = () => {
    navigation.navigate(screens.SINGLE_VIEW_POST, { feedId: id_publi });
  };

  return (
    <VStack {...rest}>
      <Header
        publiId={id_publi}
        name={name}
        profilePic={profilePic}
        status={status}
        date={data_cadastro}
        onRequestDetail={handleOpenSingleViewPost}
      />
      <PostBody
        content={{ text: descricao }}
        onRequestDetail={handleOpenSingleViewPost}
      />
      <Stats
        navigation={navigation}
        commentsAmount={data.comments?.items.length}
        onRequestDetail={handleOpenSingleViewPost}
      />
      <Actions onPressComment={handlePressComment} />
    </VStack>
  );
};

export default NewsfeedCard;
