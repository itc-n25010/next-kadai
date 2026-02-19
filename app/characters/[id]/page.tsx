import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import { getCharacterDetail } from "@/app/_libs/microcms";

type Props = {
  params: {
    id: string;
  };
};

// 学園 → CSS クラス
const schoolClassMap: Record<string, string> = {
  アビドス高等学校: styles.abydos,
  ゲヘナ学園: styles.gehenna,
  ミレニアムサイエンススクール: styles.millennium,
  トリニティ総合学園: styles.trinity,
};

export default async function CharacterCardPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const character = await getCharacterDetail(id).catch(() => null);
  console.log(id);
  if (!character) notFound();

  const schoolClass = schoolClassMap[character.school] ?? styles.defaultSchool;

  return (
    <main className={styles.wrapper}>
      {/* 左：立ち絵 */}
      <div className={`${styles.imageArea} ${schoolClass}`}>
        <div className={styles.imageWrapper}>
          <Image
            src={character.image?.url || "/no-image.png"}
            alt={`${character.name} の立ち絵`}
            fill
            priority
            className={styles.image}
            sizes="360px"
          />
        </div>
      </div>

      {/* 右：情報カード */}
      <section className={styles.infoCard}>
        <h1 className={styles.name}>{character.name}</h1>

        <ul className={styles.meta}>
          <li>
            <span>声優</span>
            {character.voice}
          </li>
          <li>
            <span>学校</span>
            {character.school}
          </li>
          <li>
            <span>学年</span>
            {character.grade}
          </li>
          <li>
            <span>所属</span>
            {character.role}
          </li>
          <li>
            <span>身長</span>
            {character.stature}
          </li>
          <li>
            <span>趣味</span>
            {character.hobby}
          </li>
        </ul>

        <div
          className={styles.profile}
          dangerouslySetInnerHTML={{
            __html: character.profile || "",
          }}
        />
      </section>
    </main>
  );
}
