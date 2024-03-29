import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { screens } from "../constants";
import { RootStackParamList } from "./types";
import {
  CreateCategory,
  CreateLocal,
  CreatePost,
  Login,
  Newsfeed,
  Signup,
  SingleViewPost,
  Welcome,
  CheckFeedbacks,
  UserProfile,
  RequestLocalFeedback,
  RequestCategoryFeedback,
} from "../screens";
import { useAuth } from "../hooks";
import MainTabScreen from "./MainTabScreen";

export const MainStack = createStackNavigator<RootStackParamList>();

export const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <MainStack.Navigator>
      {token ? (
        <MainStack.Group>
          <MainStack.Screen
            name={screens.MAIN}
            component={MainTabScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name={screens.NEWSFEED}
            component={Newsfeed}
            options={{ headerShown: true, title: "Publicações" }}
          />
          <MainStack.Screen
            name={screens.SINGLE_VIEW_POST}
            component={SingleViewPost}
            options={{ headerShown: true, title: "Postagem" }}
          />
          <MainStack.Screen
            name={screens.CREATE_POST}
            component={CreatePost}
            options={{ headerShown: true, title: "Criar postagem" }}
          />
          <MainStack.Screen
            name={screens.CREATE_LOCAL}
            component={CreateLocal}
            options={{ headerShown: true, title: "Adicionar novo local" }}
          />
          <MainStack.Screen
            name={screens.CREATE_CATEGORY}
            component={CreateCategory}
            options={{ headerShown: true, title: "Adicionar nova categoria" }}
          />
          <MainStack.Screen
            name={screens.FEEDBACK_LOCAL}
            component={RequestLocalFeedback}
            options={{ headerShown: true, title: "Solicitar novo local" }}
          />
          <MainStack.Screen
            name={screens.FEEDBACK_CATEGORY}
            component={RequestCategoryFeedback}
            options={{ headerShown: true, title: "Solicitar categoria" }}
          />
          <MainStack.Screen
            name={screens.CHECK_FEEDBACKS}
            component={CheckFeedbacks}
            options={{ headerShown: true, title: "Avaliar Feedbacks" }}
          />
          <MainStack.Screen
            name={screens.USER_PROFILE}
            component={UserProfile}
            options={{ headerShown: false }}
          />
        </MainStack.Group>
      ) : (
        <MainStack.Group>
          <MainStack.Screen
            name={screens.WELCOME}
            component={Welcome}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name={screens.LOGIN}
            component={Login}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name={screens.SIGNUP}
            component={Signup}
            options={{ headerShown: false }}
          />
        </MainStack.Group>
      )}
    </MainStack.Navigator>
  );
};