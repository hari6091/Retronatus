import { MediaItemType } from "../../components";
import { screens } from "../../constants";
import { RootStackScreenProps } from "../../routes/types";

export type CreatePostScreenProps = RootStackScreenProps<screens.CREATE_POST>;

export type PostType = {
  text: string;
  medias: MediaItemType[];
};
