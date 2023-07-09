import { Center, ScrollView } from "native-base";

import React, { useCallback, useEffect, useState } from "react";

import { ProfileScreenProps } from "./types";
import { IPublicacao, useAuth, usePublicacoes, useUsuario } from "../../hooks";
import UserProfileScreenHeader from "./components/UserProfileHeader";
import UserActivity from "./components/UserActivity";

const Profile = ({ navigation, route }: ProfileScreenProps) => {
  // const { logout } = useAuth();
  const { me } = useUsuario();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = route.params?.userId ?? me?.idUsuario;

  const { getUsuarioPublicacoes } = usePublicacoes(userId);

  const [publi, setPubli] = useState<IPublicacao[]>();

  const loadPubli = useCallback(async () => {
    if (userId) {
      try {
        setIsLoading(true);
        const getPubli = await getUsuarioPublicacoes(userId);
        setPubli(getPubli);
      } finally {
        setIsLoading(false);
      }
    }
  }, [userId]);

  useEffect(() => {
    loadPubli();
  }, [userId]);

  // const handleNavigateLogin = async () => {
  //   await logout();
  //   navigation.navigate(screens.WELCOME);
  // };

  return (
    <Center flex={1} safeArea w="100%">
      <ScrollView w="100%" flex={1} bg="#FFFFFF">
        <UserProfileScreenHeader
          user={me!}
          isAdmin={me?.is_Super_Admin || false}
          // onEditProfile={() => setEditing(true)}
          onReport={navigation.goBack}
        />

        <UserActivity
          items={publi ?? []}
          loading={isLoading}
          user={me!}
          isOwner
        />
      </ScrollView>
    </Center>
  );
};

export default Profile;
