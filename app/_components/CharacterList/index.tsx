"use client";

import { useState, useMemo } from "react";
import CharacterCard from "@/app/_components/CharacterCard";
import SchoolSection from "@/app/_components/SchoolSection";
import styles from "./index.module.css";
import type { Character } from "@/app/_libs/microcms";

/* =====================
   Props
===================== */
type Props = {
  characters: Character[];
};

/* =====================
   学年を数値に変換
===================== */
const GRADE_MAP: Record<string, number> = {
  "１年": 1,
  "２年": 2,
  "３年": 3,
};

function gradeToNumber(grade?: string | null): number {
  if (!grade || typeof grade !== "string") return 0;
  return GRADE_MAP[grade] ?? 0;
}

/* =====================
   学園表示順（固定）
===================== */
const SCHOOL_ORDER = [
  "アビドス高等学校",
  "ゲヘナ学園",
  "ミレニアムサイエンススクール",
  "トリニティ総合学園",
  "無所属",
] as const;

/* =====================
   Component
===================== */
export default function CharacterList({ characters }: Props) {
  const [keyword, setKeyword] = useState("");
  const [input, setInput] = useState("");

  /* =====================
     検索 + ソート
  ===================== */
  const filtered = useMemo(() => {
    const result = characters.filter((c) =>
      [c.name, c.school, c.role]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(keyword.toLowerCase())),
    );

    return result;
  }, [characters, keyword]);

  /* =====================
     学園 → 所属 → キャラ
  ===================== */
  const grouped = useMemo(() => {
    const map: Record<string, Record<string, Character[]>> = {};

    filtered.forEach((c) => {
      const school = c.school || "無所属";
      const role = c.role || "未分類";

      map[school] ??= {};
      map[school][role] ??= [];
      map[school][role].push(c);
    });

    // グループ内でソート（常に学年順）
    Object.keys(map).forEach((school) => {
      Object.keys(map[school]).forEach((role) => {
        map[school][role].sort(
          (a, b) => gradeToNumber(a.grade) - gradeToNumber(b.grade),
        );
      });
    });

    return map;
  }, [filtered]);

  /* =====================
    Render
  ===================== */
  const roleTitleStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    fontSize: "1.2rem",
    fontWeight: 700,
    margin: "24px 0 16px",
  } as const;

  const listGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "20px",
  } as const;
  return (
    <>
      {/* 🔍 検索ボックス */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="キャラ名・学園・所属で検索"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
        />
        <button onClick={() => setKeyword(input)} className={styles.button}>
          検索
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
              <div
                key={role}
                className={styles.roleBlock}
                style={{ marginBottom: "32px" }}
              >
                <h3 className={styles.roleTitle} style={roleTitleStyle}>
                  {role}
                </h3>

                <ul className={styles.list} style={listGridStyle}>
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
