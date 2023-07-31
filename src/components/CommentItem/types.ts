import { IVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";
import { IComentario } from "../../hooks";

export interface ICommentItemProps extends Omit<IVStackProps, "children"> {
  id?: string;
  readOnly?: boolean;
  data: IComentario;
  isReply?: boolean;
  onPressReply?: () => void;
  onAddReply?: () => void;
}
