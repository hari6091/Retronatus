import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { screens } from "../constants";

export type MainTabParamList = {
  [screens.HOME]: undefined;
  [screens.PROFILE]: undefined;
  [screens.NOTIFICATIONS]: undefined;
};

export type RootStackParamList = {
  // Unauth
  [screens.WELCOME]: undefined;
  [screens.LOGIN]: undefined;
  [screens.SIGNUP]: undefined;
  // Auth
  [screens.MAIN]: NavigatorScreenParams<MainTabParamList>;
  [screens.NEWSFEED]: { eventId: number };
  [screens.SINGLE_VIEW_POST]: { feedId: number };
  [screens.CREATE_POST]: { eventId: number };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
