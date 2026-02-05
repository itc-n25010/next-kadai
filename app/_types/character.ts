import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

export type Character = {
  name: string;
  school: string;
  role: string;
  rarity: number;
  image: MicroCMSImage;
  profile: string;
} & MicroCMSListContent;
