import { NextResponse } from "next/server"

export async function POST(req){

  const body = await req.json()

  console.log("DATA MASUK:",body)

  return NextResponse.json({
    message:"Data berhasil diterima server"
  })

}