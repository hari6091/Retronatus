import { screens } from "../../constants";
import { MainTabScreenProps } from "../../routes/types";

export type ProfileScreenProps = MainTabScreenProps<screens.PROFILE>;

export interface ProfileHeaderProps {
  user: Record<string, any>;
  isOwner?: boolean;
  onEditProfile?: () => void;
  isAdmin: boolean;
}
