import dynamic from "next/dynamic";

const FamilyTree = dynamic(
  () => import("./FamilyTree"),
  { ssr: false }
);

export default function FamilyTreeWrapper({ keluarga, keyword }) {
  return <FamilyTree keluarga={keluarga} keyword={keyword} />;
}