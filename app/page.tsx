import { getAllCharacters, getClubList } from "@/app/_libs/microcms";
import CharacterList from "@/app/_components/CharacterList";

export default async function Home() {
  const characters = await getAllCharacters();
  let clubs: Awaited<ReturnType<typeof getClubList>> | undefined;

  try {
    clubs = await getClubList();
  } catch (error) {
    console.error("Failed to fetch clubs:", error);
  }

  return (
    <main>
      <CharacterList characters={characters} clubs={clubs} />
    </main>
  );
}
