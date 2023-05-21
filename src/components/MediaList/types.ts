import { ICenterProps } from "native-base";

export enum MediaTypes {
  IMAGE = "image",
  VIDEO = "video",
}

export type MediaItemType = {
  id: number | string;
  type: MediaTypes.IMAGE | MediaTypes.VIDEO;
  source: string;
};

export interface IMediaItemProps extends ICenterProps {
  data: MediaItemType;
}

export interface IMediaListProps {
  items: MediaItemType[];
  onRemove: (id: number | string) => void;
}
