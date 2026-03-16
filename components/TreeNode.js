"use client";

import Link from "next/link";

export default function TreeNode({ person, pasangan, childrenNodes }) {

  return (
    <div className="flex flex-col items-center">

      <div className="flex items-center gap-3 bg-white shadow rounded-lg p-3">

        <Link href={`/anggota/${person.id}`}>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto"></div>
            <p className="text-sm font-semibold">{person.nama}</p>
          </div>
        </Link>

        {pasangan && (
          <>
            <span>─</span>
            <Link href={`/anggota/${pasangan.id}`}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto"></div>
                <p className="text-sm font-semibold">{pasangan.nama}</p>
              </div>
            </Link>
          </>
        )}

      </div>

      {childrenNodes.length > 0 && (
        <div className="h-6 border-l border-gray-400"></div>
      )}

      <div className="flex gap-10 mt-4">
        {childrenNodes}
      </div>

    </div>
  );
}