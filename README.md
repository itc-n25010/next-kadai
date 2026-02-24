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

---

app/
├── \_components/
│ ├── CharacterCard/
│ │ ├── index.tsx # キャラクターカード（1体分）
│ │ └── index.module.css # スタイル
│ ├── CharacterList/
│ │ ├── index.tsx # 一覧・検索・グループ化・ソート
│ │ └── index.module.css # スタイル
│ └── SchoolSection/
│ ├── index.tsx # 学園ヘッダー（ロゴ付き）
│ └── index.module.css # スタイル
├── \_libs/
│ └── microcms.ts # microCMS API 連携・型定義
├── \_types/
│ └── character.ts # Character 型定義
├── characters/
│ └── [id]/
│ └── page.tsx # キャラクター詳細ページ
├── page.tsx # トップ（一覧ページ）
├── layout.tsx # ルートレイアウト
└── globals.css # グローバルスタイル

---

---

## 📄 各ファイルの説明

### **app/page.tsx**

- メインページ（SSR）
- microCMS から全キャラクターデータを取得
- `<CharacterList />` にデータを Props で渡す

### **app/\_libs/microcms.ts**

- microCMS API クライアント設定
- **`Character` 型**: キャラクターのデータ構造
  - `name`: キャラ名
  - `school`: 所属学園（アビドス高等学校、ゲヘナ学園など）
  - `grade`: 学年（１年、２年、３年）
  - `role`: 職種/所属（生徒会、先生など）
  - `image`: キャラクター画像
  - その他プロフィール情報

- **`getAllCharacters()` 関数**
  - microCMS から全キャラクター取得
  - ページネーション対応（100件単位で自動取得）
  - キャッシュ対象外

### **app/\_components/CharacterList/index.tsx**

キャラクター一覧を表示するメインコンポーネント。

**主な機能**:

1. **検索機能**
   - キャラ名、学園、職種でフィルタリング
   - 「検索」ボタンで絞り込み実行

2. **グループ化**
   - 学園 → 職種 → キャラクター の3階層構造
   - `SCHOOL_ORDER` 配列で学園表示順序を固定

3. **学年順ソート**
   - `GRADE_MAP` で学年を数値に変換（１年→1、２年→2、３年→3）
   - グループ内のキャラクターを自動で学年順にソート

**状態管理**:

- `keyword`: 検索キーワード
- `input`: 検索入力フィールドの値

**useMemo で計算最適化**:

- `filtered`: キーワードでフィルタリング
- `grouped`: 学園・職種でグループ化し、学年順ソート

### **app/\_components/CharacterCard/index.tsx**

1体のキャラクターをカード状に表示。

**表示内容**:

- キャラクター画像（9:16 アスペクト比）
- キャラ名
- 学園別の色付き枠線

**機能**:

- `/characters/{id}` へのリンク（詳細ページに遷移）
- `schoolClassMap` で学園ごとに異なる CSS クラスを適用

### **app/\_components/SchoolSection/index.tsx**

学園セクションのヘッダーを表示。

**表示要素**:

- 学園ロゴ画像（`/public/logo/` から取得）
- 学園名タイトル
- 区切り線

**ロゴマッピング**:

---

アビドス高等学校 → /logo/abydos.png
ゲヘナ学園 → /logo/gehenna.png
ミレニアムサイエンススクール → /logo/millennium.png
トリニティ総合学園 → /logo/trinity.png

---

### **CSS モジュール**

#### **CharacterList/index.module.css**

一覧全体のスタイル。

- `.searchBox`: 検索ボックスコンテナ
- `.schoolTitle`: 学園タイトル
- `.roleTitle`: 職種タイトル
- `.list`: キャラクターグリッド（自動レイアウト、レスポンシブ）
- `.button`: 検索ボタン
- 学園カラー: `.abydos`、`.gehenna`、`.millennium`、`.trinity`

#### **CharacterCard/index.module.css**

キャラクターカード個別のスタイル。

- `.card`: カード全体（グラデーション、ホバー時上下移動）
- `.imageWrapper`: 画像領域（9:16 アスペクト比維持）
- `.name`: キャラ名

#### **SchoolSection/index.module.css**

学園ロゴセクションのスタイル。

- `.logo`: ロゴ画像領域
- `.title`: 学園名
- `.divider`: 区切り線

---

## 🔄 データフロー

---

microCMS
↓
getAllCharacters() (SSR)
↓
page.tsx
↓
CharacterList
├─ 検索キーワードでフィルタリング
├─ 学園・職種でグループ化
└─ 各グループを学年順ソート
↓
学園ごとに表示
├─ SchoolSection（学園ロゴ・名前）
└─ 職種ごとに CharacterCard を グリッド表示
↓
ブラウザで表示

---

---

## 🎯 主なロジック

### 検索フィルタリング

キャラ名、学園名、職種のいずれかに検索キーワードが含まれるか（大文字小文字問わず）で判定。

### グループ化構造

学園 → 職種 の2階層で自動グループ化し、各グループを独立したセクションで表示。

---

## 🔧 環境変数

`.env.local` に以下を設定：

---

MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key

---

---

## 🚀 起動方法

---bash
npm install
npm run dev

---

[http://localhost:3000](http://localhost:3000) でアクセス
