import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import { getCharacterDetail } from "@/app/_libs/microcms";

type Props = {
  params: {
    id: string;
  };
};

export default async function CharacterCardPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  console.log(id);

  let character;
  try {
    character = await getCharacterDetail(id);
    console.log(character);
  } catch {
    notFound();
  }

  if (!character) {
    notFound();
  }

  return (
    <main className={styles.wrapper}>
      {/* 左：立ち絵 */}
      <div className={`${styles.imageArea} ${styles[character.school]}`}>
        <Image
          src={character.image?.url || "/no-image.png"}
          alt={`${character.name} の立ち絵`}
          width={360}
          height={640}
          priority
        />
      </div>

      {/* 右：情報カード */}
      <section className={styles.infoCard}>
        <ul className={styles.meta}>
          <li className={styles.name}>{character.name}</li>
          <li>学校：{character.school}</li>
          <li>学年：{character.grade}</li>
          <li>所属：{character.role}</li>
          <li
            className={styles.profile}
            dangerouslySetInnerHTML={{ __html: character.profile ?? "" }}
          ></li>
        </ul>
      </section>
    </main>
  );
}
