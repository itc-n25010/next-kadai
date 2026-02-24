# 🎮 キャラクター図鑑サイト

（Next.js × microCMS）

microCMS で管理したキャラクター情報を  
Next.js（App Router）で表示するキャラクター図鑑サイトです。

学園 → 所属（部活）→ キャラクター の三段構成で一覧表示し、  
キャラクター詳細ページや検索機能を備えています。

---

## 🔗 デモ

※ デモURLがある場合はここに記載  
（例）https://example.vercel.app

---

## 🛠 使用技術

- Next.js（App Router）
- TypeScript
- microCMS
- CSS Modules
- next/image

---

## 📂 ディレクトリ構成

app/
├─ \_components/
│ ├─ CharacterCard/ # キャラカード
│ ├─ CharacterList/ # 一覧・検索・グルーピング
│ └─ SchoolSection/ # 学園ヘッダー
│
├─ \_libs/
│ └─ microcms.ts # microCMS API 通信
│
├─ \_types/
│ └─ character.ts # Character 型定義
│
├─ characters/
│ └─ [id]/
│ └─ page.tsx # キャラクター詳細ページ
│
├─ page.tsx # トップ（一覧ページ）
├─ globals.css
└─ layout.tsx
