import { screens } from "../../constants";
import { RootStackScreenProps } from "../../routes/types";

export type FeedbackScreenProps = RootStackScreenProps<screens.FEEDBACK>;

export type LocalType = {
  name: string;
  address: string;
};
