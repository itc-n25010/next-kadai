import { client } from "../_libs/microcms";
import type { Character } from "../_libs/microcms";

export async function getAllCharacters(): Promise<Character[]> {
  const limit = 100;
  let offset = 0;
  let allCharacters: Character[] = [];

  while (true) {
    const res = await client.get<{
      contents: Character[];
      totalCount: number;
    }>({
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
