import { TextInput } from "react-native";
import { FeedType } from "../../screens/Newsfeed/types";
import { IBoxProps } from "native-base";
import { IPublicacao } from "../../hooks";

export interface INewsfeedCardProps extends IBoxProps<INewsfeedCardProps> {
  data: IPublicacao;
  commentInputRef?: React.RefObject<TextInput>;
  onPressComment?: () => void;
}
