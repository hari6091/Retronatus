import { screens } from "../../constants";
import { RootStackScreenProps } from "../../routes/types";

export type UserProfileScreenProps = RootStackScreenProps<screens.USER_PROFILE>;

export interface UserProfileHeaderProps {
  user: Record<string, any>;
  isOwner?: boolean;
  onEditProfile?: () => void;
  isAdmin: boolean;
}
