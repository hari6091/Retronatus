import { CommentType } from "../../components/CommentItem/types";
import { screens } from "../../constants";
import { RootStackScreenProps } from "../../routes/types";

export type NewsfeedScreenProps = RootStackScreenProps<screens.NEWSFEED>;

export type FeedType = {
  id_publi: number;
  name: string;
  profilePic: string;
  descricao: string;
  data_cadastro: string;
  status: "achado" | "perdido" | "devolvido";
  comments?: {
    items: CommentType[];
  };
};
