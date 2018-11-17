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
      BufferUtils.alignedLength(bufferViewByteLength);

    (
      accessorDataArr |> Js.Array.length |. Some,
      accessorDataArr
      |> ArrayService.push({
           bufferView: bufferViewDataArr |> Js.Array.length,
           /* byteOffset:  0, */
           count: pointsCount,
           componentType:
             switch (pointType) {
             | Vertex
             | Normal
             | TexCoord => 5126
             | Index => 5123
             | Index32 => 5125
             },
           type_:
             switch (pointType) {
             | Vertex
             | Normal => "VEC3"
             | TexCoord => "VEC2"
             | Index
             | Index32 => "SCALAR"
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
      (
        (vertices, normals, texCoords, indices, indices32),
        (verticesSize, normalsSize, texCoordsSize, indicesSize),
        (verticesLength, normalsLength, texCoordsLength),
      ),
      (bufferViewOffset, (bufferViewDataArr, accessorDataArr)),
      (totalByteLength, (vertexDataArr, indexDataArr, index32DataArr)),
    ) => {
  open Js.Typed_array;

  let verticesCount = verticesLength / verticesSize;
  let normalsCount = normalsLength / normalsSize;
  let texCoordsCount = texCoordsLength / texCoordsSize;

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
        Vertex,
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
      (normalsLength, normalsCount, Float32Array._BYTES_PER_ELEMENT, Normal),
      (bufferViewOffset, bufferViewDataArr, accessorDataArr),
      totalByteLength,
    );

  let vertexDataArr =
    _addVertexData((bufferViewOffset, texCoords), vertexDataArr);

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
        TexCoord,
      ),
      (bufferViewOffset, bufferViewDataArr, accessorDataArr),
      totalByteLength,
    );

  let (
    indexDataArr,
    index32DataArr,
    (
      indexIndex,
      accessorDataArr,
      bufferViewDataArr,
      bufferViewOffset,
      totalByteLength,
    ),
  ) =
    switch (indices) {
    | None =>
      switch (indices32) {
      | None =>
        WonderLog.Log.fatal(
          WonderLog.Log.buildFatalMessage(
            ~title="_addAllPointData",
            ~description={j|should has indices data|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j},
          ),
        )
      | Some(indices32) =>
        let indices32Length = Uint32Array.length(indices32);
        let indices32Count = indices32Length / indicesSize;

        (
          indexDataArr,
          _addIndexData((bufferViewOffset, indices32), index32DataArr),
          _addBufferViewData(
            (
              indices32Length,
              indices32Count,
              Uint32Array._BYTES_PER_ELEMENT,
              Index32,
            ),
            (bufferViewOffset, bufferViewDataArr, accessorDataArr),
            totalByteLength,
          ),
        );
      }
    | Some(indices) =>
      let indicesLength = Uint16Array.length(indices);
      let indicesCount = indicesLength / indicesSize;

      (
        _addIndexData((bufferViewOffset, indices), indexDataArr),
        index32DataArr,
        _addBufferViewData(
          (
            indicesLength,
            indicesCount,
            Uint16Array._BYTES_PER_ELEMENT,
            Index,
          ),
          (bufferViewOffset, bufferViewDataArr, accessorDataArr),
          totalByteLength,
        ),
      );
    };

  (
    (vertexIndex, normalIndex, texCoordIndex, indexIndex),
    accessorDataArr,
    bufferViewDataArr,
    bufferViewOffset,
    (totalByteLength, (vertexDataArr, indexDataArr, index32DataArr)),
  );
};

let _addMeshData =
    (
      (vertexIndex, normalIndex, texCoordIndex, indexIndex),
      texCoords,
      name,
      meshDataArr,
    ) =>
  meshDataArr
  |> ArrayService.push(
       {
         primitives: {
           attributes: {
             position: vertexIndex |> OptionService.unsafeGet,
             normal: normalIndex,
             texCoord_0: texCoordIndex,
           },
           indices: indexIndex |> OptionService.unsafeGet,
           material: None,
         },
         name,
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

let build = meshPointAndNameDataMap => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            GenerateCommon.checkShouldHasNoSlot(meshPointAndNameDataMap)
          )
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
    (vertexDataArr, indexDataArr, index32DataArr),
  ) =
    meshPointAndNameDataMap
    |> SparseMapService.reduceiValid(
         (.
           (
             (totalByteLength, bufferViewOffset),
             (bufferViewDataArr, accessorDataArr, meshDataArr),
             (vertexDataArr, indexDataArr, index32DataArr),
           ),
           ((vertices, normals, texCoords, indices, indices32), name),
           meshIndex,
         ) => {
           let verticesLength = vertices |> Float32Array.length;
           let normalsLength = normals |> Float32Array.length;
           let texCoordsLength = texCoords |> Float32Array.length;

           let (
             (vertexIndex, normalIndex, texCoordIndex, indexIndex),
             accessorDataArr,
             bufferViewDataArr,
             bufferViewOffset,
             (
               totalByteLength,
               (vertexDataArr, indexDataArr, index32DataArr),
             ),
           ) =
             _addAllPointData(
               (
                 (vertices, normals, texCoords, indices, indices32),
                 (verticesSize, normalsSize, texCoordsSize, indicesSize),
                 (verticesLength, normalsLength, texCoordsLength),
               ),
               (bufferViewOffset, (bufferViewDataArr, accessorDataArr)),
               (
                 totalByteLength,
                 (vertexDataArr, indexDataArr, index32DataArr),
               ),
             );

           (
             (totalByteLength, bufferViewOffset),
             (
               bufferViewDataArr,
               accessorDataArr,
               _addMeshData(
                 (vertexIndex, normalIndex, texCoordIndex, indexIndex),
                 texCoords,
                 name,
                 meshDataArr,
               ),
             ),
             (vertexDataArr, indexDataArr, index32DataArr),
           );
         },
         ((0, 0), ([||], [||], [||]), ([||], [||], [||])),
       );

  (
    totalByteLength,
    (bufferViewDataArr, accessorDataArr, meshDataArr),
    (vertexDataArr, indexDataArr, index32DataArr),
  );
};