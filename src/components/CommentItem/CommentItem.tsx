import { isEqual } from "lodash";
import React, { memo, useCallback, useEffect, useState } from "react";

import { CommentHeader, CommentBody, CommentActions } from "./components";
import { ICommentItemProps } from "./types";
import { VStack } from "native-base";
import { IUsuario, useUsuario } from "../../hooks";

const CommentItem = ({
  data,
  isReply,
  onPressReply,
  onAddReply,
  readOnly,
  ...rest
}: ICommentItemProps) => {
  const { idComentario, idUsuario, date, content, respostas } = data;

  const [usuario, setUsuario] = useState<IUsuario>();

  const { getSingleUsuario } = useUsuario();

  const loadUser = useCallback(async () => {
    const getUser = await getSingleUsuario(idUsuario);
    setUsuario(getUser);
  }, [idUsuario]);

  useEffect(() => {
    loadUser();
  }, []);

  const formattedDate = () => {
    if (date) {
      return new Date(date).toLocaleString("pt-br", {
        dateStyle: "short",
        timeStyle: "short",
      });
    }
  };

  return (
    <VStack {...rest} pr={null}>
      <VStack bg="#ececec" borderRadius="10px" py="12px" pl="12px">
        <CommentHeader
          author={{
            name: usuario?.name ?? "Carregando...",
            profilePicThumb: "",
          }}
          publishedAt={formattedDate()}
        />

        <CommentBody
          content={{
            text: content,
          }}
          mt="2"
        />
      </VStack>
      <CommentActions
        replyAmount={respostas?.length ?? 0}
        data={data}
        mt="3"
        onPressReply={onPressReply}
        isReply={isReply}
        readOnly={readOnly}
        onAddReply={onAddReply}
      />
    </VStack>
  );
};

export default memo(CommentItem, isEqual);
