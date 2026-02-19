"use client";

import { useState } from "react";
import CharacterCard from "@/app/_components/CharacterCard";
import SchoolSection from "@/app/_components/SchoolSection";
import styles from "./index.module.css";
import type { Character } from "@/app/_libs/microcms";

const SCHOOL_ORDER = [
  "アビドス高等学校",
  "ゲヘナ学園",
  "ミレニアムサイエンススクール",
  "トリニティ総合学園",
  "無所属",
];

type Props = {
  characters: Character[];
};

export default function CharacterList({ characters }: Props) {
  // 入力中の文字
  const [input, setInput] = useState("");
  // 確定した検索ワード
  const [keyword, setKeyword] = useState("");

  // 🔍 検索結果
  const filtered = characters.filter((c) =>
    [c.name, c.school].some((v) =>
      String(v ?? "")
        .toLowerCase()
        .includes(keyword.toLowerCase()),
    ),
  );

  // 決定ボタン or Enter
  const handleSearch = () => {
    setKeyword(input);
  };

  /* 学園 → 所属 */
  const grouped = filtered.reduce<Record<string, Record<string, Character[]>>>(
    (acc, character) => {
      const school = character.school || "無所属";
      const role = character.role || "未所属";

      acc[school] ??= {};
      acc[school][role] ??= [];
      acc[school][role].push(character);
      return acc;
    },
    {},
  );

  return (
    <>
      {/* 🔍 検索ボックス */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="キャラ名・学園で検索"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.button}>
          決定
        </button>
      </div>

      {/* 一覧 */}
      {SCHOOL_ORDER.map((school) => {
        const roles = grouped[school];
        if (!roles) return null;

        return (
          <section key={school}>
            <SchoolSection school={school} />

            {Object.entries(roles).map(([role, chars]) => (
              <div key={role} style={{ marginBottom: "32px" }}>
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    margin: "24px 0 16px",
                  }}
                >
                  {role}
                </h3>

                <ul
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {chars.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                  ))}
                </ul>
              </div>
            ))}
          </section>
        );
      })}
    </>
  );
}
