import { IStackProps } from "native-base";
import { ReactNode } from "react";
import { SingleViewPostScreenProps } from "../../../screens/SingleViewPost/types";

export interface IUserFeedCardHeaderProps {
  name: string;
  profilePic: string;
  status: "achado" | "perdido" | "devolvido" | undefined;
  date: string | undefined;
  publiId: number | undefined;
  isOwner: boolean;
  onRequestDetail: () => void;
  onPressPerdido: () => void;
  onPressAchado: () => void;
  onPressDevolvido: () => void;
  onPressDelete: () => void;
}

export interface IUserProps extends Omit<IStackProps, "children"> {
  avatar: { source?: string; width?: number; height?: number };
  name: string;
  bottomElement?: ReactNode;
  rightElement?: ReactNode;
  onUserPress?: () => void;
}

export interface IPostProps extends IStackProps {
  content: {
    text?: string;
    // images?: IMediaGridProps["medias"]["images"];
  };
  onRequestDetail?: () => void;
}

export interface INewsfeedCardStatsProps extends IStackProps {
  commentsAmount?: number;
  navigation: SingleViewPostScreenProps["navigation"];
  onRequestDetail?: () => void;
}

export interface INewsfeedCardActionsProps extends IStackProps {
  onPressComment?: () => void;
}

export type MoreOptionsAccessoryProps = {
  item: {
    id: number;
    ownerId: number;
    markAsLost: () => void;
    markAsFound: () => void;
    markAsReturned: () => void;
  };
};
