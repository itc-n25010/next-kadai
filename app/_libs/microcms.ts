import { createClient } from "microcms-js-sdk";
import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

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

/* =========================
   キャラクター一覧（制限なし・正解）
========================= */
export async function getAllCharacters(): Promise<Character[]> {
  const limit = 100;
  let offset = 0;
  let allCharacters: Character[] = [];

  while (true) {
    const res = await client.getList<Character>({
      endpoint: "characters",
      queries: {
        limit,
        offset,
      },
    });

    allCharacters = allCharacters.concat(res.contents);

    if (allCharacters.length >= res.totalCount) {
      break;
    }

    offset += limit;
  }

  return allCharacters;
}

/* =========================
   キャラクター一覧（制限あり）
========================= */
export async function getCharacterList(limit = 100): Promise<Character[]> {
  const res = await client.getList<Character>({
    endpoint: "characters",
    queries: { limit },
  });

  return res.contents;
}

/* =========================
   キャラクター詳細
========================= */
export async function getCharacterDetail(id: string): Promise<Character> {
  return await client.getListDetail<Character>({
    endpoint: "characters",
    contentId: id,
  });
}

/* =========================
   所属（部活）一覧
========================= */
export type Club = {
  name: string;
  school: string;
  logo?: MicroCMSImage;
};

export async function getClubList(): Promise<Club[]> {
  try {
    const res = await client.getList<Club>({
      endpoint: "clubs",
      queries: {
        limit: 100,
      },
    });

    return res.contents;
  } catch (error) {
    console.error("microcms.getClubList failed:", error);
    throw error;
  }
}
