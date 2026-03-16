"use client";

import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";

export default function PhotoCropper({ image, onComplete }) {

const [crop,setCrop]=useState({x:0,y:0});
const [zoom,setZoom]=useState(1);
const [croppedAreaPixels,setCroppedAreaPixels]=useState(null);

const onCropComplete = useCallback((_,croppedAreaPixels)=>{
setCroppedAreaPixels(croppedAreaPixels);
},[]);

const handleSave = ()=>{
onComplete(croppedAreaPixels);
};

return(

<div className="fixed inset-0 bg-black/70 flex items-center justify-center">

<div className="bg-white p-4 rounded w-[400px]">

<div className="relative h-[300px]">

<Cropper
image={image}
crop={crop}
zoom={zoom}
aspect={1}
onCropChange={setCrop}
onZoomChange={setZoom}
onCropComplete={onCropComplete}
/>

</div>

<input
type="range"
min={1}
max={3}
step={0.1}
value={zoom}
onChange={(e)=>setZoom(e.target.value)}
className="w-full mt-4"
/>

<button
type="button"
onClick={handleSave}
className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
>
Simpan Foto
</button>

</div>

</div>

);

}
