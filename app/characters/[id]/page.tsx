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
  const character = await getCharacterDetail(params.id);

  if (!character) {
    notFound();
  }

  return (
    <main className={styles.container}>
      {/* 立ち絵 */}
      <div className={styles.imageWrapper}>
        <Image
          src={character.image?.url || "/no-image.png"}
          alt={character.name || "キャラクター画像"}
          width={360}
          height={640}
          priority
        />
      </div>
      {/* 情報 */}
      <div className={styles.content}>
        <h1 className={styles.name}>{character.name}</h1>

        <ul className={styles.meta}>
          <li>学校：{character.school}</li>
          <li>学年：{character.grade}</li>
          <li>所属：{character.role}</li>
        </ul>

        {character.profile && (
          <div
            className={styles.profile}
            dangerouslySetInnerHTML={{ __html: character.profile }}
          />
        )}
      </div>
    </main>
  );
}
