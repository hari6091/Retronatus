import { screens } from "../../constants";
import { RootStackScreenProps } from "../../routes/types";

export type SignupScreenProps = RootStackScreenProps<screens.SIGNUP>;

export type SignupType = {
  name: string;
  email: string;
  password: string;
  confPassword: string;
};
