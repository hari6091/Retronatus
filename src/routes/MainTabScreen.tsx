import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { screens } from "../constants";
import { Home, Notifications, Profile } from "../screens";
import { MainTabParamList } from "./types";
import { HomeIcon, NotificationIcon, PeopleIcon } from "../components";

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#232831",
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
        },
      }}
    >
      <Tab.Screen
        name={screens.HOME}
        component={Home}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: (props) => <HomeIcon {...props} />,
        })}
      />
      <Tab.Screen
        name={screens.NOTIFICATIONS}
        component={Notifications}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: (props) => <NotificationIcon {...props} />,
        })}
      />
      <Tab.Screen
        name={screens.PROFILE}
        component={Profile}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: (props) => <PeopleIcon {...props} />,
        })}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
