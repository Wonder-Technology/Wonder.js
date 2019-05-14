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
      textureArr,
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

  let jsonUint8Array =
    BuildSingleRABJsonDataSystem.buildJsonUint8Array({
      images: imageArr,
      textures: textureArr,
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