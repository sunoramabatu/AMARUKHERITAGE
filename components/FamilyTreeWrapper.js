"use client";

import dynamic from "next/dynamic";

export default function FamilyTreeWrapper({ keluarga, keyword }) {

  <FamilyTree keluarga={keluarga} keyword={keyword} /> }

const FamilyTree = dynamic(
  () => import("./FamilyTree"),
  { ssr: false }
);

export default function FamilyTreeWrapper({ keluarga }) {
  return <FamilyTree keluarga={keluarga} />;
}