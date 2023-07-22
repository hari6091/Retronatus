import { IStackProps } from "native-base";
import { ICommentFormProps } from "../../CommentForm/types";
import { IComentario } from "../../../hooks";

export interface ICommentHeaderProps extends Omit<IStackProps, "children"> {
  author: {
    name: string;
    profilePicThumb?: string;
  };
  publishedAt: string | undefined;
}

export interface ICommentBodyProps extends Omit<IStackProps, "children"> {
  content: {
    text?: string;
  };
}

export interface ICommentActionsProps extends Omit<IStackProps, "children"> {
  replyAmount?: number;
  onComment?: ICommentFormProps["onSubmit"];
  data?: IComentario;
  isReply?: boolean;
  onPressReply?: () => void;
  readOnly?: boolean;
}
