import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import { getCharacterDetail } from "@/app/_libs/microcms";

type Props = {
  params: {
    id: string;
  };
};

export default async function CharacterDetailPage({ params }: Props) {
  const { id } = params;

  const character = await getCharacterDetail(id).catch(() => null);

  if (!character) {
    notFound();
  }

  return (
    <main className={styles.wrapper}>
      {/* 左：キャラ画像 */}
      <div className={styles.imageArea}>
        <div className={styles.imageWrapper}>
          <Image
            src={character.image?.url || "/no-image.png"}
            alt={`${character.name} の立ち絵`}
            width={360}
            height={640}
            priority
            className={styles.image}
          />
        </div>
      </div>

      {/* 右：情報 */}
      <div className={styles.infoCard}>
        <h1 className={styles.name}>{character.name}</h1>

        <ul className={styles.meta}>
          <li>
            <span>声優</span>
            {character.voice || "不明"}
          </li>
          <li>
            <span>学園</span>
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
            <span>趣味</span>
            {character.hobby || "不明"}
          </li>
        </ul>

        <div
          className={styles.profile}
          dangerouslySetInnerHTML={{
            __html: character.profile || "",
          }}
        />
      </div>
    </main>
  );
}
