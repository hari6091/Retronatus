import {
  Center,
  ScrollView,
  Text,
  Button,
  View,
  HStack,
  Box,
  Icon,
  Heading,
  FlatList,
  Pressable,
} from "native-base";

import React, { ReactNode } from "react";

import { ProfileScreenProps } from "./types";
import { screens } from "../../constants";
import { IPublicacao, useAuth, usePublicacoes } from "../../hooks";
import UserProfileScreenHeader from "./components/UserProfileHeader";
import UserActivity from "./components/UserActivity";

const Profile = ({ navigation }: ProfileScreenProps) => {
  const { logout } = useAuth();

  // const { getUsuarioPublicacoes } = usePublicacoes(1);

  const publicacoes: IPublicacao[] = [
    {
      idPublicacao: 1,
      content: "Segunda",
      medias: [],
      status: "perdido",
      date: "2023-06-18T23:44:10.417Z",
      idUsuario: 1,
      idLocal: 1,
      idCategoria: 1,
      comentarios: [
        {
          idComentario: 1,
          content: "comentário",
          idUsuario: 1,
          idPublicacao: 1,
          date: "2023-06-19T01:24:53.693Z",
          respostas: [],
        },
        {
          idComentario: 5,
          content: "comentário3",
          idUsuario: 1,
          idPublicacao: 1,
          date: "2023-06-19T01:24:53.693Z",
          respostas: [],
        },
      ],
    },
    {
      idPublicacao: 1,
      content: "Segunda",
      medias: [],
      status: "perdido",
      date: "2023-06-18T23:44:10.417Z",
      idUsuario: 1,
      idLocal: 1,
      idCategoria: 1,
      comentarios: [
        {
          idComentario: 1,
          content: "comentário",
          idUsuario: 1,
          idPublicacao: 1,
          date: "2023-06-19T01:24:53.693Z",
          respostas: [],
        },
        {
          idComentario: 5,
          content: "comentário3",
          idUsuario: 1,
          idPublicacao: 1,
          date: "2023-06-19T01:24:53.693Z",
          respostas: [],
        },
      ],
    },
    {
      idPublicacao: 1,
      content: "Segunda",
      medias: [],
      status: "perdido",
      date: "2023-06-18T23:44:10.417Z",
      idUsuario: 1,
      idLocal: 1,
      idCategoria: 1,
      comentarios: [
        {
          idComentario: 1,
          content: "comentário",
          idUsuario: 1,
          idPublicacao: 1,
          date: "2023-06-19T01:24:53.693Z",
          respostas: [],
        },
        {
          idComentario: 5,
          content: "comentário3",
          idUsuario: 1,
          idPublicacao: 1,
          date: "2023-06-19T01:24:53.693Z",
          respostas: [],
        },
      ],
    },
  ];

  const user = {
    name: "user",
  };

  const handleNavigateLogin = async () => {
    await logout();
    navigation.navigate(screens.WELCOME);
  };
  return (
    <Center flex={1} safeArea w="100%">
      <ScrollView w="100%" flex={1} bg="#FFFFFF">
        <UserProfileScreenHeader
          user={user!}
          isOwner
          isAdmin
          // onEditProfile={() => setEditing(true)}
          onReport={navigation.goBack}
        />

        <UserActivity
          items={publicacoes}
          loading={false}
          user={user!}
          isOwner
        />
      </ScrollView>
    </Center>
  );
};

export default Profile;
