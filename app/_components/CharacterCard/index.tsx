import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import { Character } from "@/app/_types/character";

type Props = {
  character: Character;
};

export default function CharacterCard({ character }: Props) {
  return (
    <Link href={`/characters/${character.id}`} className={styles.card}>
      <Image
        src={character.image.url}
        alt={character.name}
        width={300}
        height={300}
        className={styles.image}
      />
      <h2 className={styles.name}>{character.name}</h2>
      <p className={styles.school}>{character.school}</p>
    </Link>
  );
}
