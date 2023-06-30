import { screens } from "../../constants";
import { RootStackScreenProps } from "../../routes/types";

export type CreateCategoryScreenProps =
  RootStackScreenProps<screens.CREATE_CATEGORY>;

export type CategoryType = {
  name: string;
};
