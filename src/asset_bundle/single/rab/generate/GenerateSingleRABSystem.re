open RABType;

open Js.Typed_array;

let generateRAB =
    (
      (
        (imageBufferViewArr, geometryBufferViewArr),
        imageUint8ArrayArr,
        geometryUint8ArrayArr,
      ),
      bufferTotalAlignedByteLength,
      jsonUint8Array,
    ) =>
  GenerateSingleABUtils.generateAB(
    (
      (
        imageBufferViewArr
        |> Js.Array.map(({byteOffset, byteLength}) =>
             (byteOffset, byteLength)
           ),
        geometryBufferViewArr
        |> Js.Array.map(({byteOffset, byteLength}) =>
             (byteOffset, byteLength)
           ),
      ),
      imageUint8ArrayArr,
      geometryUint8ArrayArr,
    ),
    bufferTotalAlignedByteLength,
    jsonUint8Array,
  );

let generateSingleRAB = (resourceData, state) => {
  let (
    (
      imageArr,
      basicSourceTextureArr,
      cubemapTextureArr,
      basicMaterialArr,
      lightMaterialArr,
      geometryArr,
      scriptEventFunctionArr,
      scriptAttributeArr,
    ),
    (imageBufferViewArr, geometryBufferViewArr),
    (imageUint8ArrayArr, geometryUint8ArrayArr),
    bufferTotalAlignedByteLength,
  ) =
    BuildSingleRABJsonDataSystem.buildJsonData(resourceData, state);

    WonderLog.Log.print((
      "generate:",

      /* basicSourceTextureArr,
      cubemapTextureArr, */
      imageArr
    )) |> ignore;

  let jsonUint8Array =
    BuildSingleRABJsonDataSystem.buildJsonUint8Array({
      images: imageArr,
      basicSourceTextures: basicSourceTextureArr,
      cubemapTextures: cubemapTextureArr,
      basicMaterials: basicMaterialArr,
      lightMaterials: lightMaterialArr,
      scriptEventFunctions: scriptEventFunctionArr,
      scriptAttributes: scriptAttributeArr,
      geometrys: geometryArr,
      bufferViews: Js.Array.concat(geometryBufferViewArr, imageBufferViewArr),
    });

  generateRAB(
    (
      (imageBufferViewArr, geometryBufferViewArr),
      imageUint8ArrayArr,
      geometryUint8ArrayArr,
    ),
    bufferTotalAlignedByteLength,
    jsonUint8Array,
  );
};