open Js.Typed_array;

let _getFloat1 =
  (. typeArray, index) => Float32Array.unsafe_get(typeArray, index);

let _getUint16_1 =
  (. typeArray, index) => Uint16Array.unsafe_get(typeArray, index);

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

  (dataView, offset^);
};

let buildBuffer = (totalByteLength, meshPointDataMap) => {
  let buffer = ArrayBuffer.make(totalByteLength);

  let dataView = DataViewCommon.create(buffer);

  let (dataView, offset) =
    meshPointDataMap
    |> SparseMapService.reduceiValid(
         (.
           (dataView, offset),
           (vertices, normals, texCoords, indices),
           meshIndex,
         ) => {
           let verticesLength = vertices |> Float32Array.length;
           let normalsLength = normals |> Float32Array.length;
           let texCoordsLength =
             switch (texCoords) {
             | None => 0
             | Some(texCoords) => texCoords |> Float32Array.length
             };
           let indicesLength = indices |> Uint16Array.length;

           let (dataView, offset) =
             _fillBuffer(
               (dataView, vertices, verticesLength, offset),
               (DataViewCommon.writeFloat, _getFloat1),
             );

           let (dataView, offset) =
             _fillBuffer(
               (dataView, normals, normalsLength, offset),
               (DataViewCommon.writeFloat, _getFloat1),
             );

           let (dataView, offset) =
             switch (texCoords) {
             | Some(texCoords) =>
               _fillBuffer(
                 (dataView, texCoords, texCoordsLength, offset),
                 (DataViewCommon.writeFloat, _getFloat1),
               )
             | None => (dataView, offset)
             };

           _fillBuffer(
             (dataView, indices, indicesLength, offset),
             (DataViewCommon.writeUint16_1, _getUint16_1),
           );
         },
         (dataView, 0),
       );
  buffer;
};