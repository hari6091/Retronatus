import { IVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";

export type CommentType = {
  id: number;
  author: {
    id: number;
    name: string;
    profilePicThumb?: string;
  };
  createdAt: string;
  totalReplies?: number;
  replies?: CommentType[];
  descricao?: string;
};

export interface ICommentItemProps extends Omit<IVStackProps, "children"> {
  id?: string;
  readOnly?: boolean;
  data: CommentType;
  isReply?: boolean;
  onPressReply?: () => void;
}
