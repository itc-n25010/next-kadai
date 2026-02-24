# 🎮 キャラクター図鑑サイト

（Next.js × microCMS）

microCMS で管理したキャラクター情報を  
Next.js（App Router）で表示するキャラクター図鑑サイトです。

学園 → 所属（部活）→ キャラクター の三段構成で一覧表示し、  
キャラクター詳細ページや検索機能を備えています。

---

## 🛠 使用技術

- Next.js（App Router）
- TypeScript
- microCMS
- CSS Modules
- next/image

---

## 📂 ディレクトリ構成

<p>
app/</br>
├─ \_components/</br>
│ ├─ CharacterCard/ # キャラカード</br>
│ ├─ CharacterList/ # 一覧・検索・グルーピング</br>
│ └─ SchoolSection/ # 学園ヘッダー</br>
│</br>
├─ \_libs/</br>
│ └─ microcms.ts # microCMS API 通信</br>
│</br>
├─ \_types/</br>
│ └─ character.ts # Character 型定義</br>
│</br>
├─ characters/</br>
│ └─ [id]/</br>
│ └─ page.tsx # キャラクター詳細ページ</br>
│</br>
├─ page.tsx # トップ（一覧ページ）</br>
├─ globals.css</br>
└─ layout.tsx</br>
</p>
