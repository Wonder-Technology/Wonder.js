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

let _checkBufferViewOffsetAligned = bufferViewOffset => {
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
  bufferViewOffset;
};

let _addVertexData = ((bufferViewOffset, points), vertexDataArr) => {
  _checkBufferViewOffsetAligned(bufferViewOffset);

  vertexDataArr |> ArrayService.push((bufferViewOffset, points));
};

let _addIndexData = ((bufferViewOffset, points), indexDataArr) => {
  _checkBufferViewOffsetAligned(bufferViewOffset);

  indexDataArr |> ArrayService.push((bufferViewOffset, points));
};

let _addAllPointData =
    (
      (verticesSize, normalsSize, texCoordsSize, indicesSize),
      (verticesLength, normalsLength, texCoordsLength, indicesLength),
      (bufferViewOffset, (bufferViewDataArr, accessorDataArr)),
      (vertices, normals, texCoords, indices),
      (totalByteLength, (vertexDataArr, indexDataArr)),
    ) => {
  open Js.Typed_array;

  let verticesCount = verticesLength / verticesSize;
  let normalsCount = normalsLength / normalsSize;
  let texCoordsCount = texCoordsLength / texCoordsSize;
  let indicesCount = indicesLength / indicesSize;

  let vertexDataArr =
    _addVertexData((bufferViewOffset, vertices), vertexDataArr);

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

  let vertexDataArr =
    _addVertexData((bufferViewOffset, normals), vertexDataArr);

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

  let vertexDataArr =
    switch (texCoords) {
    | None => vertexDataArr
    | Some(texCoords) =>
      _addVertexData((bufferViewOffset, texCoords), vertexDataArr)
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

  let indexDataArr =
    _addIndexData((bufferViewOffset, indices), indexDataArr);

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
    (totalByteLength, (vertexDataArr, indexDataArr)),
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
    (vertexDataArr, indexDataArr),
  ) =
    meshPointDataMap
    |> SparseMapService.reduceiValid(
         (.
           (
             (totalByteLength, bufferViewOffset),
             (bufferViewDataArr, accessorDataArr, meshDataArr),
             (vertexDataArr, indexDataArr),
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
             (totalByteLength, (vertexDataArr, indexDataArr)),
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
               (totalByteLength, (vertexDataArr, indexDataArr)),
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
             (vertexDataArr, indexDataArr),
           );
         },
         ((0, 0), ([||], [||], [||]), ([||], [||])),
       );

  (
    totalByteLength,
    (bufferViewDataArr, accessorDataArr, meshDataArr),
    (vertexDataArr, indexDataArr),
  );
};