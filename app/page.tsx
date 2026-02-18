import { getCharacterList } from "@/app/_libs/microcms";
import CharacterCard from "@/app/_components/CharacterCard";
import SchoolSection from "@/app/_components/SchoolSection";

export default async function Home() {
  const characters = await getCharacterList();

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
      {Object.entries(groupedBySchool).map(([school, chars]) => (
        <section key={school} style={{ marginBottom: "48px" }}>
          <SchoolSection school={school} />

          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "20px",
            }}
          >
            {chars.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
