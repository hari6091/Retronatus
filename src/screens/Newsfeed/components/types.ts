import { TextInput } from "react-native";
import { FeedType } from "../types";

export interface IFeedItemProps {
  data: FeedType;
  commentInputRef?: React.RefObject<TextInput>;
  onPressComment?: () => void;
}
