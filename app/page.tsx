import { getAllCharacters } from "@/app/_libs/microcms";
import CharacterList from "@/app/_components/CharacterList";

export default async function Home() {
  const characters = await getAllCharacters();

  return (
    <main>
      <CharacterList characters={characters} />
    </main>
  );
}
