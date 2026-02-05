export type Character = {
  id: string;
  name: string;
  school: string;
  role: "STRIKER" | "SPECIAL";
  image: string;
  description: string;
};

export const characters: Character[] = [
  {
    id: "arona",
    name: "アロナ",
    school: "連邦生徒会",
    role: "SPECIAL",
    image: "/images/arona.png",
    description: "先生をサポートするAIアシスタント。",
  },
  {
    id: "shiroko",
    name: "砂狼シロコ",
    school: "アビドス",
    role: "STRIKER",
    image: "/images/shiroko.png",
    description: "冷静沈着なアタッカー。",
  },
];
