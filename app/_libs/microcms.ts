import { createClient } from "microcms-js-sdk";

/**
 * microCMS クライアント設定
 */
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

/**
 * キャラクター型定義
 */
export type Character = {
  id: string;
  name: string;
  school: string;
  grade: string;
  role: string;
  profile: string;
  image?: {
    url: string;
  };
};

/**
 * キャラクター一覧取得
 */
export const getCharacterList = async () => {
  return await client.getList<Character>({
    endpoint: "characters",
  });
};

/**
 * キャラクター詳細取得
 */
export const getCharacterDetail = async (id: string) => {
  return await client.get<Character>({
    endpoint: "characters",
    contentId: id,
  });
};
