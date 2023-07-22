import { Center, ScrollView } from "native-base";

import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { UserProfileScreenProps } from "./types";
import { IPublicacao, IUsuario, usePublicacoes, useUsuario } from "../../hooks";
import UserProfileScreenHeader from "./components/UserProfileHeader";
import UserActivity from "./components/UserActivity";

const UserProfile = ({ route }: UserProfileScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = route.params?.userId;

  const { getUsuarioPublicacoes } = usePublicacoes();
  const { getSingleUsuario } = useUsuario();

  const [publi, setPubli] = useState<IPublicacao[]>();
  const [user, setUser] = useState<IUsuario>();

  const loadPubli = useCallback(async () => {
    try {
      setIsLoading(true);
      const getPubli = await getUsuarioPublicacoes(userId);
      setPubli(getPubli);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadPubli();
  }, [userId]);

  const loadUser = useCallback(async () => {
    try {
      const getUser = await getSingleUsuario(userId);
      setUser(getUser);
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  useEffect(() => {
    loadUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPubli();
    }, [loadPubli])
  );

  return (
    <Center flex={1} safeArea w="100%">
      <ScrollView w="100%" flex={1} bg="#FFFFFF">
        <UserProfileScreenHeader
          user={user!}
          isAdmin={user?.is_Super_Admin || false}
          // onEditProfile={() => setEditing(true)}
        />

        <UserActivity
          onPublicacaoDeleted={loadPubli}
          items={publi?.reverse() ?? []}
          loading={isLoading}
          user={user!}
          isOwner
        />
      </ScrollView>
    </Center>
  );
};

export default UserProfile;
