import { TextInput } from "react-native";
import { IPublicacao } from "../../../hooks";

export interface IFeedItemProps {
  data: IPublicacao;
  commentInputRef?: React.RefObject<TextInput>;
  onPressComment?: () => void;
}
