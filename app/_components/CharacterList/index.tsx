"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import CharacterCard from "@/app/_components/CharacterCard";
import SchoolSection from "@/app/_components/SchoolSection";
import styles from "./index.module.css";
import type { Character, Club } from "@/app/_libs/microcms";

/* =====================
   Props
===================== */
type Props = {
  characters: Character[];
  clubs?: Club[];
};

/* =====================
   学年を数値に変換
===================== */
function gradeToNumber(grade?: string | null): number {
  if (grade == null) return 999; // 学年不明は最後
  const s = String(grade);
  const match = s.match(/\d+/);
  return match ? Number(match[0]) : 999;
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
export default function CharacterList({ characters, clubs }: Props) {
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
          (a, b) => gradeToNumber(b.grade) - gradeToNumber(a.grade),
        );
      });
    });

    return map;
  }, [filtered]);

  /* =====================
     クラブロゴマップ
  ===================== */
  const clubLogoMap = useMemo(() => {
    const map: Record<string, string | undefined> = {};
    clubs?.forEach((club) => {
      map[club.name] = club.logo?.url;
    });
    console.log("clubLogoMap:", map);
    console.log("clubs from CMS:", clubs);
    return map;
  }, [clubs]);

  /* =====================
    Render
  ===================== */
  return (
    <>
      {/* 検索ボックス */}
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

      {/* キャラクター一覧 */}
      {SCHOOL_ORDER.map((school) => {
        const roles = grouped[school];
        if (!roles) return null;

        return (
          <section key={school}>
            <SchoolSection school={school} />

            {Object.entries(roles).map(([role, chars]) => (
              <div key={role} className={styles.roleBlock}>
                <h3 className={styles.roleTitle}>
                  {clubLogoMap[role] && (
                    <Image
                      src={clubLogoMap[role]}
                      alt={`${role} ロゴ`}
                      width={48}
                      height={48}
                      className={styles.roleLogo}
                    />
                  )}
                  <span>{role}</span>
                </h3>

                <ul className={styles.list}>
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
