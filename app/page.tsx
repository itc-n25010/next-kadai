import { getCharacterList } from "@/app/_libs/microcms";
import CharacterCard from "@/app/_components/CharacterCard";
import SchoolSection from "@/app/_components/SchoolSection";

export default async function Home() {
  const { contents: characters } = await getCharacterList();

  const groupedBySchool = characters.reduce<Record<string, typeof characters>>(
    (acc, character) => {
      const school = character.school || "無所属";
      acc[school] ??= [];
      acc[school].push(character);
      return acc;
    },
    {},
  );

  return (
    <main>
      {Object.entries(groupedBySchool).map(([school, characters]) => (
        <section key={school} style={{ marginBottom: "48px" }}>
          {/* 学園ロゴ＋学園名 */}
          <SchoolSection school={school} />

          {/* キャラクター一覧 */}
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "20px",
            }}
          >
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
