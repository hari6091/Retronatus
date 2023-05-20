import { IStackProps } from "native-base";
import { RefObject } from "react";
import { TextInput } from "react-native";

export interface ICommentFormProps extends IStackProps {
  onSubmit?: ({
    text,
    feedId,
  }: {
    text: string;
    feedId?: number;
  }) => Promise<void> | void;
  commentInputRef?: RefObject<TextInput>;
  feedId?: number;
}
