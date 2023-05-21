import { IStackProps } from "native-base";

export interface IMediaToolbarProps extends Omit<IStackProps, "children"> {
  isDisabled?: boolean;
  onPressImage: () => void;
}
