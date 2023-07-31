import { IBoxProps } from "native-base";
import { IComentario } from "../../hooks";

export interface ICommentItemWithRepliesProps
  extends Omit<IBoxProps, "children"> {
  id?: string;
  data: IComentario;
  onAddReply?: () => void;
}
