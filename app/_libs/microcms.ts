import { createClient } from "microcms-js-sdk";
import type { Character } from "@/app/_types/character";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

/* =========================
   キャラクター一覧（制限なし）
========================= */
export async function getAllCharacters(): Promise<Character[]> {
  const res = await client.getList<Character>({
    endpoint: "characters",
    queries: {
      limit: 1000, // microCMSの最大値
    },
  });

  return res.contents;
}

/* =========================
   キャラクター一覧（制限あり）
========================= */
export async function getCharacterList(limit = 20): Promise<Character[]> {
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
