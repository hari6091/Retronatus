import { TextInput } from "react-native";
import { IBoxProps } from "native-base";
import { IPublicacao } from "../../hooks";

export interface INewsfeedCardProps extends IBoxProps<INewsfeedCardProps> {
  data: IPublicacao | undefined;
  commentInputRef?: React.RefObject<TextInput>;
  onPressComment?: () => void;
  isSingleView?: boolean;
  onPublicacaoDeleted: () => void;
}
