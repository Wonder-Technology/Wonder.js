open Js.Typed_array;

open SABType;

let buildJsonUint8Array = sceneAssetBundleContent => {
  let encoder = TextEncoder.newTextEncoder();

  encoder
  |> TextEncoder.encodeUint8Array(
       sceneAssetBundleContent |> Obj.magic |> Js.Json.stringify,
     );
};