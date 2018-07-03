open Js.Typed_array;

/* let _getFloat1 =
     (. typeArray, index) => Float32Array.unsafe_get(typeArray, index);

   let _getUint16_1 =
     (. typeArray, index) => Uint16Array.unsafe_get(typeArray, index); */

let _getUint8_1 =
  (. typeArray, index) => Uint8Array.unsafe_get(typeArray, index);

let _fillBuffer =
    (
      (dataView, points, pointsLength, offset),
      (writeDataViewFunc, getValueFunc),
    ) => {
  let offset = ref(offset);

  for (i in 0 to pointsLength - 1) {
    offset :=
      writeDataViewFunc(. getValueFunc(. points, i), offset^, dataView);
  };

  dataView;
};

let build =
    (
      totalByteLength,
      (geometryEndByteOffset, geometryDataArr),
      imageUint8DataArr,
    ) => {
  let buffer = ArrayBuffer.make(totalByteLength);
  let dataView = DataViewCommon.create(buffer);

  let dataView =
    geometryDataArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           dataView,
           (
             bufferViewOffset,
             points,
             pointsLengths,
             writeDataViewFunc,
             getValueFunc,
           ),
         ) =>
           _fillBuffer(
             (dataView, points, pointsLengths, bufferViewOffset),
             (writeDataViewFunc, getValueFunc),
           ),
         dataView,
       );

  let _ =
    imageUint8DataArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           dataView,
           {uint8Array, byteOffset}: GenerateSceneGraphType.imageData,
         ) =>
           _fillBuffer(
             (
               dataView,
               uint8Array,
               uint8Array |> Uint8Array.length,
               byteOffset,
             ),
             (DataViewCommon.writeUint8_1, _getUint8_1),
           ),
         dataView,
       );

  buffer;
};