import {
  Actionsheet,
  Badge,
  HStack,
  IconButton,
  Tag,
  Text,
  useDisclose,
} from "native-base";
import React from "react";
import { Pressable } from "react-native";

// import { MoreOptionsActionSheet } from "../../screens/components/MoreOptionsActionSheet";
import User from "./User";
import { IUserFeedCardHeaderProps } from "./types";
import { FontAwesome5 } from "@expo/vector-icons";

const Icon = ({ type }: { type: "achado" | "perdido" | "devolvido" }) => {
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
  ...rest
}: IUserFeedCardHeaderProps) => {
  const isOwner = true;
  return (
    <Pressable /*onPress={onRequestDetail}*/>
      <User
        avatar={{
          source: profilePic,
          alt: name,
        }}
        name={name}
        // onUserPress={onUserAvatarPress}
        rightElement={
          <HStack space="5">
            <Icon type={status} />
            {isOwner ? <MoreOptionsAccessory status={status} /> : null}
          </HStack>
        }
        bottomElement={<Text>{date}</Text>}
        {...rest}
      />
    </Pressable>
  );
};

const MoreOptionsAccessory = ({
  status,
}: {
  status: "achado" | "perdido" | "devolvido";
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
            <Actionsheet.Item>Marcar como DEVOLVIDO</Actionsheet.Item>
          )}
          {status === "achado" ? null : (
            <Actionsheet.Item>Marcar como ACHADO</Actionsheet.Item>
          )}
          {status === "perdido" ? null : (
            <Actionsheet.Item>Marcar como PERDIDO</Actionsheet.Item>
          )}
          <Actionsheet.Item>DELETAR</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default UserFeedCard;
