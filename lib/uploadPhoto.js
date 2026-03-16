import { supabase } from "./supabase";

export async function uploadPhoto(blob,id){

const filePath = `anggota/${id}.jpg`;

const { error } = await supabase.storage
.from("foto-anggota")
.upload(filePath, blob, {
upsert:true
});

if(error){
console.error(error);
return null;
}

const { data } = supabase.storage
.from("foto-anggota")
.getPublicUrl(filePath);

return data.publicUrl;

}