import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";

type Character = {
  id: string;
  name: string;
  school: string;
  image?: {
    url: string;
  };
};

type Props = {
  characters: Character[];
};

const schoolClassMap: Record<string, string> = {
  アビドス高等学校: styles.abydos,
  ゲヘナ学園: styles.gehenna,
  ミレニアムサイエンススクール: styles.millennium,
  トリニティ総合学園: styles.trinity,
  無所属: styles.defaultSchool,
};

export default function CharacterList({ characters }: Props) {
  const grouped = characters.reduce<Record<string, Character[]>>(
    (acc, character) => {
      const school = character.school ?? "未分類";
      acc[school] ||= [];
      acc[school].push(character);
      return acc;
    },
    {},
  );

  return (
    <div className={styles.wrapper}>
      {Object.entries(grouped).map(([school, chars]) => (
        <section key={school} className={styles.section}>
          <h2 className={styles.schoolTitle}>{school}</h2>

          <ul className={styles.list}>
            {chars.map((character) => (
              <li
                key={character.id}
                className={`${styles.item} ${
                  schoolClassMap[school] ?? styles.defaultSchool
                }`}
              >
                <Link href={`/characters/${character.id}`}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={character.image?.url || "/no-image.png"}
                      alt={character.name}
                      fill
                      className={styles.image}
                    />
                  </div>
                  <p className={styles.name}>{character.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
