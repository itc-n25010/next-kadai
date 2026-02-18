import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import type { Character } from "@/app/_types/character"; // ★これ

type Props = {
  character: Character;
};

// 学園 → CSSクラス
const schoolClassMap: Record<string, string> = {
  アビドス高等学校: styles.abydos,
  ゲヘナ学園: styles.gehenna,
  ミレニアムサイエンススクール: styles.millennium,
  トリニティ総合学園: styles.trinity,
};

export default function CharacterCard({ character }: Props) {
  const schoolClass = schoolClassMap[character.school] ?? styles.defaultSchool;

  return (
    <li className={`${styles.card} ${schoolClass}`}>
      <Link href={`/characters/${character.id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image
            src={character.image?.url || "/no-image.png"}
            alt={`${character.name} の立ち絵`}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>

        <p className={styles.name}>{character.name}</p>
      </Link>
    </li>
  );
}
