import { screens } from "../../constants";
import { RootStackScreenProps } from "../../routes/types";

export type RequestLocalFeedbackProps =
  RootStackScreenProps<screens.FEEDBACK_LOCAL>;

export type LocalType = {
  name: string;
  address: string;
};
