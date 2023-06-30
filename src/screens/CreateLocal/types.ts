import { screens } from "../../constants";
import { RootStackScreenProps } from "../../routes/types";

export type CreateLocalScreenProps = RootStackScreenProps<screens.CREATE_LOCAL>;

export type LocalType = {
  name: string;
  address: string;
};
