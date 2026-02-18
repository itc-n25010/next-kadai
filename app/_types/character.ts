import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

export type Character = {
  name: string;
  voice?: string;
  school: string;
  grade: string;
  role: string;
  stature?: string;
  hobby?: string;
  rarity?: number;
  image?: MicroCMSImage;
  profile?: string;
} & MicroCMSListContent;
