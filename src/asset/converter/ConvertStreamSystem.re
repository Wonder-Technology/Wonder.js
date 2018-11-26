open Js.Typed_array;

let _getImageComponentType = () => 0;

let _addAccessorData =
    (
      oldAccessorIndex,
      accessorBufferArr,
      bufferViewDataArr,
      newBufferViewOffset,
      {accessors, bufferViews}: GLTFType.gltf,
    ) => {
  /* ////TODO check accessorBufferArr not has duplicate oldAccessorIndex data */

  let oldAccessor = Array.unsafe_get(accessors, oldAccessorIndex);

  let oldBufferView =
    Array.unsafe_get(
      bufferViews,
      oldAccessor.bufferView |> OptionService.unsafeGet,
    );

  let byteLength =
    BufferUtils.computeByteLengthByAccessorData(
      oldAccessor.count,
      oldAccessor.componentType,
      oldAccessor.type_ |> BufferUtils.convertType,
    );

  (
    byteLength,
    oldAccessor.componentType,
    Some(accessorBufferArr |> Js.Array.length),
    accessorBufferArr
    |> ArrayService.push({
         ...oldAccessor,
         bufferView: bufferViewDataArr |> Js.Array.length |. Some,
         byteOffset: Some(0),
       }),
    bufferViewDataArr
    |> ArrayService.push((
         {
           ...oldBufferView,
           buffer: 0,
           /* buffer: oldAccessorIndex, */
           byteOffset:
             Some(
               BufferUtils.unsafeGetAccessorByteOffset(oldAccessor)
               + BufferUtils.unsafeGetBufferViewByteOffset(oldBufferView),
             ),
           byteLength,
         },
         {
           ...oldBufferView,
           buffer: 0,
           byteOffset: Some(newBufferViewOffset),
           byteLength,
         },
         byteLength |> BufferUtils.alignedLength,
       )),
    newBufferViewOffset + (byteLength |> BufferUtils.alignedLength),
  );
};

let _addBufferViewData =
    (
      oldBufferViewIndex,
      bufferViewDataArr,
      newBufferViewOffset,
      {bufferViews}: GLTFType.gltf,
    ) => {
  let oldBufferView = Array.unsafe_get(bufferViews, oldBufferViewIndex);

  let byteLength = oldBufferView.byteLength;

  (
    byteLength,
    bufferViewDataArr |> Js.Array.length,
    bufferViewDataArr
    |> ArrayService.push((
         oldBufferView,
         {
           ...oldBufferView,
           buffer: 0,
           byteOffset: Some(newBufferViewOffset),
           byteLength,
         },
         byteLength |> BufferUtils.alignedLength,
       )),
    newBufferViewOffset + (byteLength |> BufferUtils.alignedLength),
  );
};

let _computeDistance = ((x1, y1, z1), (x2, y2, z2)) =>
  Js.Math.sqrt((x1 -. x2) ** 2. +. (y1 -. y2) ** 2. +. (z1 -. z2) ** 2.);

let _sortNodesByActiveCameraNodeWorldPosition =
    (
      activeCameraNodeIndex,
      transforms,
      ({scenes, scene, nodes}: GLTFType.gltf) as gltf,
    ) =>
  switch (activeCameraNodeIndex) {
  | Some(activeCameraNodeIndex) =>
    let worldPositionTransformArr =
      ConvertTransformsSystem.computeWorldPositionTransforms(
        transforms,
        gltf,
      );

    let activeCameraNodeWorldPosition =
      Array.unsafe_get(worldPositionTransformArr, activeCameraNodeIndex);

    nodes
    |> Js.Array.mapi((node, i) => (node, i))
    |> Js.Array.sortInPlaceWith(((node1, index1), (node2, index2)) =>
         _computeDistance(
           worldPositionTransformArr[index1],
           activeCameraNodeWorldPosition,
         )
         < _computeDistance(
             worldPositionTransformArr[index2],
             activeCameraNodeWorldPosition,
           ) ?
           (-1) : 1
       )
    |> Js.Array.map(((node, i)) => node);

  | None => nodes
  };

let _addPrimitiveData =
    (
      mesh,
      ({attributes, indices}: GLTFType.primitive) as primitive,
      accessorBufferArr,
      bufferViewDataArr,
      streamChunkArr,
      newBufferViewOffset,
      gltf,
    ) => {
  let {position, normal, texCoord_0}: GLTFType.attributes = attributes;

  let (
    byteLength,
    componentType,
    newPositionAccessorBufferIndex,
    accessorBufferArr,
    bufferViewDataArr,
    newBufferViewOffset,
  ) =
    _addAccessorData(
      position,
      accessorBufferArr,
      bufferViewDataArr,
      newBufferViewOffset,
      gltf,
    );

  let streamChunkArr =
    streamChunkArr
    |> ArrayService.push(
         {byteLength, componentType, index: mesh, type_: Vertex}: StreamType.streamUnitData,
       );

  let (
    byteLength,
    newNormalAccessorBufferIndex,
    accessorBufferArr,
    bufferViewDataArr,
    newBufferViewOffset,
    streamChunkArr,
  ) =
    switch (normal) {
    | Some(normal) =>
      let (
        byteLength,
        componentType,
        newNormalAccessorBufferIndex,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
      ) =
        _addAccessorData(
          normal,
          accessorBufferArr,
          bufferViewDataArr,
          newBufferViewOffset,
          gltf,
        );

      (
        byteLength,
        newNormalAccessorBufferIndex,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
        streamChunkArr
        |> ArrayService.push(
             {byteLength, componentType, index: mesh, type_: Normal}: StreamType.streamUnitData,
           ),
      );
    | None => (
        0,
        None,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
        streamChunkArr,
      )
    };

  let (
    byteLength,
    newTexCoord0AccessorBufferIndex,
    accessorBufferArr,
    bufferViewDataArr,
    newBufferViewOffset,
    streamChunkArr,
  ) =
    switch (texCoord_0) {
    | Some(texCoord_0) =>
      let (
        byteLength,
        componentType,
        newTexCoord0AccessorBufferIndex,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
      ) =
        _addAccessorData(
          texCoord_0,
          accessorBufferArr,
          bufferViewDataArr,
          newBufferViewOffset,
          gltf,
        );

      (
        byteLength,
        newTexCoord0AccessorBufferIndex,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
        streamChunkArr
        |> ArrayService.push(
             {byteLength, componentType, index: mesh, type_: TexCoord}: StreamType.streamUnitData,
           ),
      );

    | None => (
        0,
        None,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
        streamChunkArr,
      )
    };

  let (
    byteLength,
    newIndicesAccessorBufferIndex,
    accessorBufferArr,
    bufferViewDataArr,
    newBufferViewOffset,
    streamChunkArr,
  ) =
    switch (indices) {
    | Some(indices) =>
      let (
        byteLength,
        componentType,
        newIndicesAccessorBufferIndex,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
      ) =
        _addAccessorData(
          indices,
          accessorBufferArr,
          bufferViewDataArr,
          newBufferViewOffset,
          gltf,
        );

      (
        byteLength,
        newIndicesAccessorBufferIndex,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
        streamChunkArr
        |> ArrayService.push(
             {byteLength, componentType, index: mesh, type_: Index}: StreamType.streamUnitData,
           ),
      );

    | None => (
        0,
        None,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
        streamChunkArr,
      )
    };

  (
    newBufferViewOffset,
    accessorBufferArr,
    bufferViewDataArr,
    streamChunkArr,
    (
      newPositionAccessorBufferIndex,
      newNormalAccessorBufferIndex,
      newTexCoord0AccessorBufferIndex,
      newIndicesAccessorBufferIndex,
    ),
  );
};

let _hasAddDataBefore = (hasAddBeforeMap, key) =>
  hasAddBeforeMap
  |> WonderCommonlib.SparseMapService.has(key)
  && hasAddBeforeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(key) === true;

let _addPBRImageData =
    (
      diffuseTextureIndex,
      (
        gltf,
        bufferViewDataArr,
        streamChunkArr,
        newBufferViewOffset,
        hasImageAddBeforeMap,
      ),
      (lightMaterial, materials, textures, images),
      noneData,
    ) => {
  let {source}: GLTFType.texture =
    Array.unsafe_get(textures, diffuseTextureIndex);

  let imageIndex = source |> OptionService.unsafeGet;

  _hasAddDataBefore(hasImageAddBeforeMap, imageIndex) ?
    (
      bufferViewDataArr,
      streamChunkArr
      |> ArrayService.push(
           {
             byteLength: 0,
             componentType: _getImageComponentType(),
             index: imageIndex,
             type_: Image,
           }: StreamType.streamUnitData,
         ),
      None,
      newBufferViewOffset,
      None,
      hasImageAddBeforeMap,
    ) :
    {
      let ({bufferView}: GLTFType.image) as image =
        Array.unsafe_get(images, imageIndex);

      let (
        byteLength,
        newImageBufferViewIndex,
        bufferViewDataArr,
        newBufferViewOffset,
      ) =
        _addBufferViewData(
          bufferView |> OptionService.unsafeGet,
          bufferViewDataArr,
          newBufferViewOffset,
          gltf,
        );

      (
        bufferViewDataArr,
        streamChunkArr
        |> ArrayService.push(
             {
               byteLength,
               componentType: _getImageComponentType(),
               index: imageIndex,
               type_: Image,
             }: StreamType.streamUnitData,
           ),
        newImageBufferViewIndex |. Some,
        newBufferViewOffset,
        Some((imageIndex, image)),
        hasImageAddBeforeMap
        |> WonderCommonlib.SparseMapService.set(imageIndex, true),
      );
    };
};

let _addMetallicRoughnessImageData =
    (
      pbrMetallicRoughness: option(GLTFType.pbrMetallicRoughness),
      (
        gltf,
        bufferViewDataArr,
        streamChunkArr,
        newBufferViewOffset,
        hasImageAddBeforeMap,
      ),
      (lightMaterial, materials, textures, images),
      noneData,
    ) =>
  switch (pbrMetallicRoughness) {
  | None => noneData
  | Some({baseColorTexture}) =>
    switch (baseColorTexture) {
    | None => noneData
    | Some({index}) =>
      _addPBRImageData(
        index,
        (
          gltf,
          bufferViewDataArr,
          streamChunkArr,
          newBufferViewOffset,
          hasImageAddBeforeMap,
        ),
        (lightMaterial, materials, textures, images),
        noneData,
      )
    }
  };

let _addSpecularGlossinessImageData =
    (
      pbrSpecularGlossiness: GLTFType.khrMaterialsPBRSpecularGlossiness,
      (
        gltf,
        bufferViewDataArr,
        streamChunkArr,
        newBufferViewOffset,
        hasImageAddBeforeMap,
      ),
      (lightMaterial, materials, textures, images),
      noneData,
    ) =>
  switch (pbrSpecularGlossiness.diffuseTexture) {
  | None => noneData
  | Some({index}) =>
    _addPBRImageData(
      index,
      (
        gltf,
        bufferViewDataArr,
        streamChunkArr,
        newBufferViewOffset,
        hasImageAddBeforeMap,
      ),
      (lightMaterial, materials, textures, images),
      noneData,
    )
  };

let _addImageData =
    (
      lightMaterial,
      bufferViewDataArr,
      streamChunkArr,
      newBufferViewOffset,
      hasImageAddBeforeMap,
      ({materials, textures, images, bufferViews}: GLTFType.gltf) as gltf,
    ) => {
  let noneData = (
    bufferViewDataArr,
    streamChunkArr,
    None,
    newBufferViewOffset,
    None,
    hasImageAddBeforeMap,
  );

  switch (lightMaterial, materials, textures, images) {
  | (Some(lightMaterial), Some(materials), Some(textures), Some(images)) =>
    let {extensions, pbrMetallicRoughness}: GLTFType.material =
      Array.unsafe_get(materials, lightMaterial);

    switch (extensions) {
    | None =>
      _addMetallicRoughnessImageData(
        pbrMetallicRoughness,
        (
          gltf,
          bufferViewDataArr,
          streamChunkArr,
          newBufferViewOffset,
          hasImageAddBeforeMap,
        ),
        (lightMaterial, materials, textures, images),
        noneData,
      )
    | Some({khr_materials_pbrSpecularGlossiness}) =>
      switch (khr_materials_pbrSpecularGlossiness) {
      | None =>
        _addMetallicRoughnessImageData(
          pbrMetallicRoughness,
          (
            gltf,
            bufferViewDataArr,
            streamChunkArr,
            newBufferViewOffset,
            hasImageAddBeforeMap,
          ),
          (lightMaterial, materials, textures, images),
          noneData,
        )
      | Some(pbrSpecularGlossiness) =>
        _addSpecularGlossinessImageData(
          pbrSpecularGlossiness,
          (
            gltf,
            bufferViewDataArr,
            streamChunkArr,
            newBufferViewOffset,
            hasImageAddBeforeMap,
          ),
          (lightMaterial, materials, textures, images),
          noneData,
        )
      }
    };

  | _ => noneData
  };
};

let _buildNewGLTF =
    (accessorBufferArr, bufferViewArr, newMeshes, newImages, gltf)
    : GLTFType.gltf => {
  ...gltf,
  accessors: accessorBufferArr,
  bufferViews: bufferViewArr,
  meshes: newMeshes,
  images: newImages,
};

let _checkMeshPointDataHasUniqueAccessorIndex = meshes => {
  open WonderLog;
  open Contract;

  let _checkPointData = (accessorIndex, (isDuplicate, hasAccessorIndexMap)) =>
    switch (
      hasAccessorIndexMap
      |> WonderCommonlib.SparseMapService.get(accessorIndex)
    ) {
    | None => (
        isDuplicate,
        hasAccessorIndexMap
        |> WonderCommonlib.SparseMapService.set(accessorIndex, true),
      )

    | Some(hasAccessorIndex) => (true, hasAccessorIndexMap)
    };

  test(
    Log.buildAssertMessage(
      ~expect={j|mesh -> point data has unique accessorIndex|j},
      ~actual={j|not|j},
    ),
    () => {
      let hasAccessorIndexMap = WonderCommonlib.SparseMapService.createEmpty();

      let (isDuplicate, _hasAccessorIndexMap) =
        meshes
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (.
               (isDuplicate, hasAccessorIndexMap),
               {primitives}: GLTFType.mesh,
             ) =>
               ConvertMultiPrimitivesSystem.isMultiPrimitives(primitives) ?
                 (isDuplicate, hasAccessorIndexMap) :
                 {
                   let ({attributes, indices, material}: GLTFType.primitive) as primitive =
                     ConvertCommon.getPrimitiveData(primitives);

                   let (isDuplicate, hasAccessorIndexMap) =
                     switch (indices) {
                     | Some(accessorIndex) =>
                       _checkPointData(
                         accessorIndex,
                         (isDuplicate, hasAccessorIndexMap),
                       )
                     | _ => (isDuplicate, hasAccessorIndexMap)
                     };

                   let (isDuplicate, hasAccessorIndexMap) =
                     _checkPointData(
                       attributes.position,
                       (isDuplicate, hasAccessorIndexMap),
                     );

                   let (isDuplicate, hasAccessorIndexMap) =
                     switch (attributes.normal) {
                     | Some(accessorIndex) =>
                       _checkPointData(
                         accessorIndex,
                         (isDuplicate, hasAccessorIndexMap),
                       )
                     | _ => (isDuplicate, hasAccessorIndexMap)
                     };

                   let (isDuplicate, hasAccessorIndexMap) =
                     switch (attributes.texCoord_0) {
                     | Some(accessorIndex) =>
                       _checkPointData(
                         accessorIndex,
                         (isDuplicate, hasAccessorIndexMap),
                       )
                     | _ => (isDuplicate, hasAccessorIndexMap)
                     };

                   (isDuplicate, hasAccessorIndexMap);
                 },
             (false, hasAccessorIndexMap),
           );

      isDuplicate |> assertFalse;
    },
  );
};

let buildJsonData =
    (transforms, ({nodes, meshes, images}: GLTFType.gltf) as gltf) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(_checkMeshPointDataHasUniqueAccessorIndex(meshes))
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let activeCameraNodeIndex =
    ConvertCamerasSystem.getActiveCameraNodeIndex(gltf);

  let (
    _,
    accessorBufferArr,
    bufferViewDataArr,
    streamChunkArr,
    _,
    newMeshes,
    newImages,
  ) =
    _sortNodesByActiveCameraNodeWorldPosition(
      activeCameraNodeIndex,
      transforms,
      gltf,
    )
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (
             (hasMeshAddBeforeMap, hasImageAddBeforeMap),
             accessorBufferArr,
             bufferViewDataArr,
             streamChunkArr,
             newBufferViewOffset,
             newMeshes,
             newImages,
           ),
           ({mesh, extras}: GLTFType.node) as node,
         ) => {
           let noneData = (
             (hasMeshAddBeforeMap, hasImageAddBeforeMap),
             accessorBufferArr,
             bufferViewDataArr,
             streamChunkArr,
             newBufferViewOffset,
             newMeshes,
             newImages,
           );

           switch (mesh) {
           | Some(mesh) =>
             let ({primitives}: GLTFType.mesh) as meshData =
               Array.unsafe_get(meshes, mesh);

             ConvertMultiPrimitivesSystem.isMultiPrimitives(primitives) ?
               noneData :
               {
                 let ({attributes, indices}: GLTFType.primitive) as primitive =
                   ConvertCommon.getPrimitiveData(primitives);

                 let (
                   newBufferViewOffset,
                   accessorBufferArr,
                   bufferViewDataArr,
                   streamChunkArr,
                   newMeshes,
                   hasMeshAddBeforeMap,
                 ) =
                   _hasAddDataBefore(hasMeshAddBeforeMap, mesh) ?
                     (
                       newBufferViewOffset,
                       accessorBufferArr,
                       bufferViewDataArr,
                       streamChunkArr,
                       newMeshes,
                       hasMeshAddBeforeMap,
                     ) :
                     {
                       let (
                         newBufferViewOffset,
                         accessorBufferArr,
                         bufferViewDataArr,
                         streamChunkArr,
                         (
                           newPositionAccessorBufferIndex,
                           newNormalAccessorBufferIndex,
                           newTexCoord0AccessorBufferIndex,
                           newIndicesAccessorBufferIndex,
                         ),
                       ) =
                         _addPrimitiveData(
                           mesh,
                           primitive,
                           accessorBufferArr,
                           bufferViewDataArr,
                           streamChunkArr,
                           newBufferViewOffset,
                           gltf,
                         );

                       Array.unsafe_set(
                         newMeshes,
                         mesh,
                         {
                           ...meshData,
                           primitives: [|
                             {
                               ...primitive,
                               attributes: {
                                 position:
                                   newPositionAccessorBufferIndex
                                   |> OptionService.unsafeGet,
                                 normal: newNormalAccessorBufferIndex,
                                 texCoord_0: newTexCoord0AccessorBufferIndex,
                                 texCoord_1: None,
                               },
                               indices: newIndicesAccessorBufferIndex,
                             },
                           |],
                         },
                       );

                       (
                         newBufferViewOffset,
                         accessorBufferArr,
                         bufferViewDataArr,
                         streamChunkArr,
                         newMeshes,
                         hasMeshAddBeforeMap
                         |> WonderCommonlib.SparseMapService.set(mesh, true),
                       );
                     };

                 let (
                   bufferViewDataArr,
                   streamChunkArr,
                   newBufferViewIndex,
                   newBufferViewOffset,
                   imageData,
                   hasImageAddBeforeMap,
                 ) =
                   _addImageData(
                     ConvertMaterialsSystem.getLightMaterialOfNode(
                       node,
                       meshes,
                     ),
                     bufferViewDataArr,
                     streamChunkArr,
                     newBufferViewOffset,
                     hasImageAddBeforeMap,
                     gltf,
                   );

                 let newImages =
                   switch (newImages) {
                   | None => newImages
                   | Some(newImages) =>
                     (
                       switch (newBufferViewIndex, imageData) {
                       | (
                           Some(newBufferViewIndex),
                           Some((imageIndex, image)),
                         ) =>
                         Array.unsafe_set(
                           newImages,
                           imageIndex,
                           {...image, bufferView: Some(newBufferViewIndex)}: GLTFType.image,
                         );

                         newImages;
                       | _ => newImages
                       }
                     )
                     |. Some
                   };

                 (
                   (hasMeshAddBeforeMap, hasImageAddBeforeMap),
                   accessorBufferArr,
                   bufferViewDataArr,
                   streamChunkArr,
                   newBufferViewOffset,
                   newMeshes,
                   newImages,
                 );
               };

           | None => noneData
           };
         },
         (
           (
             WonderCommonlib.SparseMapService.createEmpty(),
             WonderCommonlib.SparseMapService.createEmpty(),
           ),
           [||],
           [||],
           [||],
           0,
           /* meshes, */
           [||],
           /* images, */
           Some([||]),
         ),
       );

  (
    bufferViewDataArr,
    streamChunkArr,
    _buildNewGLTF(
      accessorBufferArr,
      bufferViewDataArr
      |> Js.Array.map(((oldBufferView, newBufferView, _)) => newBufferView),
      newMeshes,
      newImages,
      gltf,
    ),
  );
};

let getDefault11ImageUint8ArrayData = () => (
  Uint8Array.make([|
    137,
    80,
    78,
    71,
    13,
    10,
    26,
    10,
    0,
    0,
    0,
    13,
    73,
    72,
    68,
    82,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    1,
    8,
    6,
    0,
    0,
    0,
    31,
    21,
    196,
    137,
    0,
    0,
    0,
    13,
    73,
    68,
    65,
    84,
    24,
    87,
    99,
    248,
    255,
    255,
    255,
    25,
    0,
    9,
    200,
    3,
    202,
    69,
    126,
    87,
    75,
    0,
    0,
    0,
    0,
    73,
    69,
    78,
    68,
    174,
    66,
    96,
    130,
  |]),
  "image/png",
  {|load default11 image error|},
);

/* let _getDefault11ImageUint8ArrayAlignedByteLength = () =>
   70 |> BufferUtils.alignedLength; */

let getStreamChunkArr = ((jsonChunkLength, streamChunkLength), dataView) => {
  let rec _get = (currentByteOffset, endByteOffset, dataView, streamChunkArr) =>
    currentByteOffset >= endByteOffset ?
      (currentByteOffset, endByteOffset, streamChunkArr) :
      {
        let (byteLength, currentByteOffset) =
          DataViewCommon.getUint32_1(. currentByteOffset, dataView);

        let (componentType, currentByteOffset) =
          DataViewCommon.getUint16_1(. currentByteOffset, dataView);

        let (index, currentByteOffset) =
          DataViewCommon.getUint32_1(. currentByteOffset, dataView);

        let (type_, currentByteOffset) =
          DataViewCommon.getUint8_1(currentByteOffset, dataView);

        _get(
          currentByteOffset,
          endByteOffset,
          dataView,
          streamChunkArr
          |> ArrayService.push(
               {
                 byteLength,
                 componentType,
                 index,
                 type_: type_ |> StreamType.uint8ToChunk,
               }: StreamType.streamUnitData,
             ),
        );
      }
      |> WonderLog.Contract.ensureCheck(
           ((currentByteOffset, endByteOffset, streamChunkArr)) =>
             WonderLog.(
               Contract.(
                 Operators.(
                   test(
                     Log.buildAssertMessage(
                       ~expect={j|currentByteOffset === endByteOffset|j},
                       ~actual={j|not|j},
                     ),
                     () =>
                     currentByteOffset == endByteOffset
                   )
                 )
               )
             ),
           IsDebugMainService.getIsDebug(StateDataMain.stateData),
         );

  let currentByteOffset =
    BufferUtils.getWDBHeaderTotalByteLength()
    + (jsonChunkLength |> BufferUtils.alignedLength);

  let endByteOffset = currentByteOffset + streamChunkLength;

  let (currentByteOffset, endByteOffset, streamChunkArr) =
    _get(currentByteOffset, endByteOffset, dataView, [||]);

  streamChunkArr;
};

let _writeStreamChunk = (streamChunkArr, byteOffset, dataView) => {
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               BufferUtils.checkByteLengthShouldBeAligned(
                 streamChunkArrAlignedByteLength,
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     ); */

  let byteOffset =
    streamChunkArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           byteOffset,
           {byteLength, componentType, index, type_}: StreamType.streamUnitData,
         ) => {
           let byteOffset =
             DataViewCommon.writeUint32_1(byteLength, byteOffset, dataView);

           let byteOffset =
             DataViewCommon.writeUint16_1(
               componentType,
               byteOffset,
               dataView,
             );

           let byteOffset =
             DataViewCommon.writeUint32_1(index, byteOffset, dataView);

           let byteOffset =
             DataViewCommon.writeUint8_1(.
               type_ |> StreamType.chunkToUint8,
               byteOffset,
               dataView,
             );

           byteOffset;
         },
         byteOffset,
       )
    |> BufferUtils.alignedLength;

  (byteOffset, dataView);
};

let _getStreamChunkArrByteLength = streamChunkArr =>
  (
    Uint32Array._BYTES_PER_ELEMENT
    * 2
    + Uint16Array._BYTES_PER_ELEMENT
    + Uint8Array._BYTES_PER_ELEMENT
  )
  * Js.Array.length(streamChunkArr);

let getStreamChunkTotalByteLength = streamChunkArr =>
  _getStreamChunkArrByteLength(streamChunkArr);

let buildStreamChunk = (byteOffset, streamChunkArr, dataView) =>
  _writeStreamChunk(streamChunkArr, byteOffset, dataView);

let _getBinBufferAlignedByteLength = bufferViewDataArr =>
  bufferViewDataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. byteLength, (_, _, alignedByteLength)) =>
         byteLength + alignedByteLength,
       0,
     );

let _writeBinBufferByBufferViewData =
    (
      totalByteOffset,
      (
        oldBufferView: GLTFType.bufferView,
        newBufferView: GLTFType.bufferView,
        alignedByteLength,
      ),
      binBufferDataView,
      totalDataView,
    ) => {
  let bufferViewByteOffsetRef =
    ref(BufferUtils.unsafeGetBufferViewByteOffset(oldBufferView));
  let totalByteOffsetRef = ref(totalByteOffset);

  let binBuffer = binBufferDataView |> DataView.buffer;
  let totalBuffer = totalDataView |> DataView.buffer;

  BufferUtils.mergeUint8Array(
    Uint8Array.fromBuffer(totalBuffer),
    Uint8Array.fromBuffer(binBuffer)
    |> Uint8Array.subarray(
         ~start=bufferViewByteOffsetRef^,
         ~end_=bufferViewByteOffsetRef^ + oldBufferView.byteLength,
       ),
    totalByteOffsetRef^,
  );

  (totalByteOffset + alignedByteLength, binBufferDataView, totalDataView);
};

let getBinBufferChunkTotalAlignedByteLength = bufferViewDataArr =>
  _getBinBufferAlignedByteLength(bufferViewDataArr);

let buildBinBufferChunk = (byteOffset, bufferViewDataArr, binBuffer, dataView) => {
  let binBufferDataView = DataViewCommon.create(binBuffer);

  let (byteOffset, binBufferDataView, dataView) =
    bufferViewDataArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (totalByteOffset, binBufferDataView, dataView), bufferViewData) =>
           _writeBinBufferByBufferViewData(
             totalByteOffset,
             bufferViewData,
             binBufferDataView,
             dataView,
           ),
         (byteOffset, binBufferDataView, dataView),
       );

  (byteOffset, dataView);
};