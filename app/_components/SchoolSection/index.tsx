import Image from "next/image";
import styles from "./index.module.css";

type Props = {
  school: string;
};

const logoMap: Record<string, string> = {
  アビドス高等学校: "/images/abydos.png",
  ゲヘナ学園: "/images/gehenna.png",
  ミレニアムサイエンススクール: "/images/millennium.png",
  トリニティ総合学園: "/images/trinity.png",
};

export default function SchoolSection({ school }: Props) {
  const logo = logoMap[school];

  return (
    <div className={styles.wrapper}>
      {logo && (
        <div className={styles.logo}>
          <Image
            src={logo}
            alt={`${school} ロゴ`}
            width={120}
            height={120}
            priority
          />
        </div>
      )}

      <h2 className={styles.title}>{school}</h2>
      <div className={styles.divider} />
    </div>
  );
}
