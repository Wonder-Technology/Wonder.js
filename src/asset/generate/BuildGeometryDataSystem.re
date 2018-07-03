open Js.Typed_array;

open GenerateSceneGraphType;

let _addBufferViewData =
    (
      (pointsLength, pointsCount, bytes_per_element, pointType),
      (bufferViewOffset, bufferViewDataArr, accessorDataArr),
      totalByteLength,
    ) =>
  switch (pointsLength) {
  | 0 => (
      None,
      accessorDataArr,
      bufferViewDataArr,
      bufferViewOffset,
      totalByteLength,
    )
  | _ =>
    let bufferViewByteLength = pointsLength * bytes_per_element;
    let bufferViewAlignedByteLength =
      BinaryUtils.alignedLength(bufferViewByteLength);

    (
      accessorDataArr |> Js.Array.length |. Some,
      accessorDataArr
      |> ArrayService.push({
           bufferView: bufferViewDataArr |> Js.Array.length,
           /* byteOffset:  0, */
           count: pointsCount,
           componentType:
             switch (pointType) {
             | VERTEX
             | NORMAL
             | TEXCOORD => 5126
             | INDEX => 5123
             },
           type_:
             switch (pointType) {
             | VERTEX
             | NORMAL => "VEC3"
             | TEXCOORD => "VEC2"
             | INDEX => "SCALAR"
             },
         }),
      bufferViewDataArr
      |> ArrayService.push({
           buffer: 0,
           byteOffset: bufferViewOffset,
           byteLength: bufferViewByteLength,
         }),
      bufferViewOffset + bufferViewAlignedByteLength,
      totalByteLength + bufferViewAlignedByteLength,
    );
  };

let _getFloat1 =
  (. typeArray, index) => Float32Array.unsafe_get(typeArray, index);

let _getUint16_1 =
  (. typeArray, index) => Uint16Array.unsafe_get(typeArray, index);

let _addGeometryData =
    (
      (bufferViewOffset, points, pointsLengths),
      geometryDataArr,
      writeDataViewFunc,
      getValueFunc,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|bufferViewOffset aligned with multiple of 4|j},
                ~actual={j|not|j},
              ),
              () =>
              bufferViewOffset mod 4 == 0
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  geometryDataArr
  |> ArrayService.push((
       bufferViewOffset,
       points,
       pointsLengths,
       writeDataViewFunc,
       getValueFunc,
     ));
};

let _addAllPointData =
    (
      (verticesSize, normalsSize, texCoordsSize, indicesSize),
      (verticesLength, normalsLength, texCoordsLength, indicesLength),
      (bufferViewOffset, (bufferViewDataArr, accessorDataArr)),
      (vertices, normals, texCoords, indices),
      (totalByteLength, geometryDataArr),
    ) => {
  open Js.Typed_array;

  let verticesCount = verticesLength / verticesSize;
  let normalsCount = normalsLength / normalsSize;
  let texCoordsCount = texCoordsLength / texCoordsSize;
  let indicesCount = indicesLength / indicesSize;

  let geometryDataArr =
    _addGeometryData(
      (bufferViewOffset, vertices, verticesLength),
      geometryDataArr,
      DataViewCommon.writeFloat,
      _getFloat1,
    );

  let (
    vertexIndex,
    accessorDataArr,
    bufferViewDataArr,
    bufferViewOffset,
    totalByteLength,
  ) =
    _addBufferViewData(
      (
        verticesLength,
        verticesCount,
        Float32Array._BYTES_PER_ELEMENT,
        VERTEX,
      ),
      (bufferViewOffset, bufferViewDataArr, accessorDataArr),
      totalByteLength,
    );

  let geometryDataArr =
     _addGeometryData(
       (bufferViewOffset, normals, normalsLength),
       geometryDataArr,
       DataViewCommon.writeFloat,
       _getFloat1,
     );

  let (
    normalIndex,
    accessorDataArr,
    bufferViewDataArr,
    bufferViewOffset,
    totalByteLength,
  ) =
    _addBufferViewData(
      (normalsLength, normalsCount, Float32Array._BYTES_PER_ELEMENT, NORMAL),
      (bufferViewOffset, bufferViewDataArr, accessorDataArr),
      totalByteLength,
    );

  let geometryDataArr =
     switch (texCoords) {
     | None => geometryDataArr
     | Some(texCoords) =>
       _addGeometryData(
         (bufferViewOffset, texCoords, texCoordsLength),
         geometryDataArr,
         DataViewCommon.writeFloat,
         _getFloat1,
       )
     };

  let (
    texCoordIndex,
    accessorDataArr,
    bufferViewDataArr,
    bufferViewOffset,
    totalByteLength,
  ) =
    _addBufferViewData(
      (
        texCoordsLength,
        texCoordsCount,
        Float32Array._BYTES_PER_ELEMENT,
        TEXCOORD,
      ),
      (bufferViewOffset, bufferViewDataArr, accessorDataArr),
      totalByteLength,
    );

  /* TODO remove Obj.magic? */
  let geometryDataArr =
    _addGeometryData(
      (bufferViewOffset, indices |> Obj.magic, indicesLength),
      geometryDataArr,
      DataViewCommon.writeUint16_1 |> Obj.magic,
      _getUint16_1 |> Obj.magic,
    );

  let (
    indexIndex,
    accessorDataArr,
    bufferViewDataArr,
    bufferViewOffset,
    totalByteLength,
  ) =
    _addBufferViewData(
      (indicesLength, indicesCount, Uint16Array._BYTES_PER_ELEMENT, INDEX),
      (bufferViewOffset, bufferViewDataArr, accessorDataArr),
      totalByteLength,
    );
  (
    (vertexIndex, normalIndex, texCoordIndex, indexIndex),
    accessorDataArr,
    bufferViewDataArr,
    bufferViewOffset,
    (totalByteLength, geometryDataArr),
  );
};

let _addMeshData =
    (
      (vertexIndex, normalIndex, texCoordIndex, indexIndex),
      texCoords,
      meshDataArr,
    ) =>
  meshDataArr
  |> ArrayService.push(
       {
         primitives: {
           attributes: {
             position: vertexIndex |> OptionService.unsafeGet,
             normal: normalIndex,
             texCoord_0:
               switch (texCoords) {
               | None => None
               | Some(_) => texCoordIndex
               },
           },
           indices: indexIndex |> OptionService.unsafeGet,
           material: None,
         },
         name: None,
       }: meshData,
     );

/* let _setTotalByteLength =
       (
         (verticesLength, normalsLength, texCoordsLength, indicesLength),
         bufferViewOffset,
         totalByteLength,
       ) => (
     totalByteLength
     + (
       Float32Array._BYTES_PER_ELEMENT
       * (verticesLength + normalsLength + texCoordsLength)
       + Uint16Array._BYTES_PER_ELEMENT
       * indicesLength
     ),
     bufferViewOffset,
   ); */

let build = meshPointDataMap => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(GenerateCommon.checkShouldHasNoSlot(meshPointDataMap))
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let verticesSize = 3;
  let normalsSize = 3;
  let texCoordsSize = 2;
  let indicesSize = 1;

  let (
    (totalByteLength, bufferViewOffset),
    (bufferViewDataArr, accessorDataArr, meshDataArr),
    geometryDataArr,
  ) =
    meshPointDataMap
    |> SparseMapService.reduceiValid(
         (.
           (
             (totalByteLength, bufferViewOffset),
             (bufferViewDataArr, accessorDataArr, meshDataArr),
             geometryDataArr,
           ),
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

           let (
             (vertexIndex, normalIndex, texCoordIndex, indexIndex),
             accessorDataArr,
             bufferViewDataArr,
             bufferViewOffset,
             (totalByteLength, geometryDataArr),
           ) =
             _addAllPointData(
               (verticesSize, normalsSize, texCoordsSize, indicesSize),
               (
                 verticesLength,
                 normalsLength,
                 texCoordsLength,
                 indicesLength,
               ),
               (bufferViewOffset, (bufferViewDataArr, accessorDataArr)),
               (vertices, normals, texCoords, indices),
               (totalByteLength, geometryDataArr),
             );

           (
             (totalByteLength, bufferViewOffset),
             (
               bufferViewDataArr,
               accessorDataArr,
               _addMeshData(
                 (vertexIndex, normalIndex, texCoordIndex, indexIndex),
                 texCoords,
                 meshDataArr,
               ),
             ),
             geometryDataArr,
           );
         },
         ((0, 0), ([||], [||], [||]), [||]),
       );

  (
    totalByteLength,
    (bufferViewDataArr, accessorDataArr, meshDataArr),
    geometryDataArr,
  );
};