import { getCharacterList } from "@/app/_libs/microcms";
import CharacterList from "@/app/_components/CharacterList";

export default async function Home() {
  const { contents } = await getCharacterList();

  return (
    <main>
      <h1 style={{ textAlign: "center", margin: "30px 10px" }}>
        キャラクター一覧
      </h1>
      <CharacterList characters={contents} />
    </main>
  );
}
