import { IBoxProps } from "native-base";
import { CommentType } from "../CommentItem/types";

export interface ICommentItemWithRepliesProps
  extends Omit<IBoxProps, "children"> {
  id?: string;
  data: CommentType;
}
