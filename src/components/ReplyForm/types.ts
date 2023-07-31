import { IStackProps } from "native-base";
import { RefObject } from "react";
import { TextInput } from "react-native";

export interface IReplyFormrops extends IStackProps {
  commentInputRef?: RefObject<TextInput>;
  commentId?: number;
  onAddReply?: () => void;
}
