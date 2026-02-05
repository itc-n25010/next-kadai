import "./globals.css";

export const metadata = {
  title: "Blue Archive Characters",
  description: "ブルーアーカイブのキャラクター紹介サイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
