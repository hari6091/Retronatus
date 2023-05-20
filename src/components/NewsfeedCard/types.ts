import { TextInput } from "react-native";
import { FeedType } from "../../screens/Newsfeed/types";
import { IBoxProps } from "native-base";

export interface INewsfeedCardProps extends IBoxProps<INewsfeedCardProps> {
  data: FeedType;
  commentInputRef?: React.RefObject<TextInput>;
  onPressComment?: () => void;
}
