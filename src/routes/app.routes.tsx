import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { screens } from "../constants";
import { RootStackParamList } from "./types";
import { Login, Newsfeed, Signup, SingleViewPost, Welcome } from "../screens";
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
            options={{ headerShown: true }}
          />
          <MainStack.Screen
            name={screens.SINGLE_VIEW_POST}
            component={SingleViewPost}
            options={{ headerShown: true }}
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
