import { IStackProps } from "native-base";
import { CommentType } from "../types";
import { ICommentFormProps } from "../../CommentForm/types";

export interface ICommentHeaderProps extends Omit<IStackProps, "children"> {
  author: {
    name: string;
    profilePicThumb?: string;
  };
  publishedAt: string;
}

export interface ICommentBodyProps extends Omit<IStackProps, "children"> {
  content: {
    text?: string;
  };
}

export interface ICommentActionsProps extends Omit<IStackProps, "children"> {
  replyAmount?: number;
  commentId: number;
  comments?: { items: CommentType[]; total: number };
  onComment?: ICommentFormProps["onSubmit"];
  data?: Omit<CommentType, "totalReplies" | "replies">;
  isReply?: boolean;
  onPressReply?: () => void;
  readOnly?: boolean;
}
