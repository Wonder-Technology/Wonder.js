open RABType;

open Js.Typed_array;

/* let _writeHeader = (jsonByteLength, bufferAlignedByteLength, dataView) =>
     dataView
     |> DataViewCommon.writeUint32_1(jsonByteLength, 0)
     |> DataViewCommon.writeUint32_1(bufferAlignedByteLength, _, dataView);

   let _getEmptyEncodedUint8Data = () => {
     let encoder = TextEncoder.newTextEncoder();
     let emptyUint8DataArr = encoder |> TextEncoder.encodeUint8Array(" ");

     Uint8Array.unsafe_get(emptyUint8DataArr, 0);
   };

   let _writeUint8ArrayToArrayBufferWithEmptyData =
       (
         byteOffset,
         (emptyUint8Data, uint8ArrayAlignedByteLength, uint8Array),
         dataView,
       ) => {
     let resultByteOffset = byteOffset + uint8ArrayAlignedByteLength;
     let byteOffset = ref(byteOffset);
     let uint8ArrayByteLength = uint8Array |> Uint8Array.length;

     for (i in 0 to uint8ArrayAlignedByteLength - 1) {
       let value =
         if (i >= uint8ArrayByteLength) {
           emptyUint8Data;
         } else {
           Uint8Array.unsafe_get(uint8Array, i);
         };

       byteOffset := DataViewCommon.writeUint8_1(. value, byteOffset^, dataView);
     };

     (resultByteOffset, uint8Array, dataView);
   };

   let _writeJson =
       (
         byteOffset,
         (emptyEncodedUint8Data, jsonAlignedByteLength, jsonUint8Array),
         dataView,
       ) =>
     _writeUint8ArrayToArrayBufferWithEmptyData(
       byteOffset,
       (emptyEncodedUint8Data, jsonAlignedByteLength, jsonUint8Array),
       dataView,
     );

   let _writeBuffer =
       (
         headerAndJsonAlignedByteOffset,
         (
           (imageBufferViewArr, geometryBufferViewArr),
           imageUint8ArrayArr,
           geometryArrayBufferArr,
         ),
         arrayBuffer,
       ) => {
     let uint8Array = Uint8Array.fromBuffer(arrayBuffer);
     let uint8Array =
       imageBufferViewArr
       |> WonderCommonlib.ArrayService.reduceOneParami(
            (. uint8Array, {byteOffset, byteLength}, index) => {
              let imageUint8Array = Array.unsafe_get(imageUint8ArrayArr, index);

              BufferUtils.mergeUint8Array(
                uint8Array,
                imageUint8Array,
                headerAndJsonAlignedByteOffset + byteOffset,
              );
            },
            uint8Array,
          );

     let uint8Array =
       geometryBufferViewArr
       |> WonderCommonlib.ArrayService.reduceOneParami(
            (. uint8Array, {byteOffset, byteLength}, index) => {
              let geometryArrayBuffer =
                Array.unsafe_get(geometryArrayBufferArr, index);

              BufferUtils.mergeArrayBuffer(
                uint8Array,
                geometryArrayBuffer,
                headerAndJsonAlignedByteOffset + byteOffset,
              );
            },
            uint8Array,
          );

     uint8Array |> Uint8Array.buffer;
   };

   let _computeByteLength = (bufferTotalAlignedByteLength, jsonUint8Array) => {
     let jsonByteLength = jsonUint8Array |> Uint8Array.byteLength;

     let jsonAlignedByteLength = jsonByteLength |> BufferUtils.alignedLength;

     let totalByteLength =
       RABUtils.getHeaderTotalByteLength()
       + jsonAlignedByteLength
       + bufferTotalAlignedByteLength;

     (jsonByteLength, jsonAlignedByteLength, totalByteLength);
   }; */

let generateRAB =
    (
      (
        (imageBufferViewArr, geometryBufferViewArr),
        imageUint8ArrayArr,
        geometryArrayBufferArr,
      ),
      bufferTotalAlignedByteLength,
      jsonUint8Array,
    ) =>
  GenerateABUtils.generateAB(
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
      geometryArrayBufferArr,
    ),
    bufferTotalAlignedByteLength,
    jsonUint8Array,
  );

let generate = (resourceData, state) => {
  let (
    state,
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
    (imageUint8ArrayArr, geometryArrayBufferArr),
    bufferTotalAlignedByteLength,
  ) =
    BuildRABJsonDataSystem.buildJsonData(resourceData, state);

  let jsonUint8Array =
    BuildRABJsonDataSystem.buildJsonUint8Array({
      images: imageArr,
      textures: textureArr,
      basicMaterials: basicMaterialArr,
      lightMaterials: lightMaterialArr,
      scriptEventFunctions: scriptEventFunctionArr,
      scriptAttributes: scriptAttributeArr,
      geometrys: geometryArr,
      bufferViews: Js.Array.concat(geometryBufferViewArr, imageBufferViewArr),
    });

  /* (

       Js.Array.concat(geometryBufferViewArr, imageBufferViewArr),
       imageArr,
       textureArr,
       basicMaterialArr,
       lightMaterialArr,
       geometryArr,
       scriptEventFunctionArr,
       scriptAttributeArr,
     )); */

  let rab =
    generateRAB(
      (
        (imageBufferViewArr, geometryBufferViewArr),
        imageUint8ArrayArr,
        geometryArrayBufferArr,
      ),
      bufferTotalAlignedByteLength,
      jsonUint8Array,
    );

  (state, rab);
};