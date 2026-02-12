import { createClient } from "microcms-js-sdk";

/* =========================
   microCMS クライアント
========================= */
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

/* =========================
   型定義
========================= */

// キャラクター型
export type Character = {
  id: string;
  name: string; // 名前
  school: string; // 学校
  grade: string; // 学年
  role: string; // 所属
  profile: string; // プロフィール（リッチテキスト）
  image?: {
    url: string;
    height?: number;
    width?: number;
  };
};

/* =========================
   キャラクター一覧取得
========================= */
export const getCharacterList = async () => {
  const data = await client.getList<Character>({
    endpoint: "characters",
  });

  return data;
};

/* =========================
   キャラクター詳細取得
========================= */
export const getCharacterDetail = async (id: string) => {
  const data = await client.get<Character>({
    endpoint: "characters",
    contentId: id,
  });

  return data;
};
