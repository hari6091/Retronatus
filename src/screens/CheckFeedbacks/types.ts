import { screens } from "../../constants";
import { RootStackScreenProps } from "../../routes/types";

export type CheckFeedbacksScreenProps = RootStackScreenProps<screens.CHECK_FEEDBACKS>;

export type LocalType = {
  name: string;
  address: string;
};
