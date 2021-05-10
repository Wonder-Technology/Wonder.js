let _getImageComponentType = () => 0;

let _addAccessorData =
    (
      oldAccessorIndex,
      (accessorBufferArr, bufferViewDataArr, newBufferViewOffset),
      {accessors, bufferViews}: GLTFType.gltf,
    ) => {
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
         bufferView: (bufferViewDataArr |> Js.Array.length)->Some,
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
      bufferViews: array(GLTFType.bufferView),
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

let _addPrimitivePointData =
    (
      (pointData, mesh, type_),
      (
        streamChunkArr,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
      ),
      gltf,
    ) => {
  let (
    byteLength,
    componentType,
    newPointDataAccessorBufferIndex,
    accessorBufferArr,
    bufferViewDataArr,
    newBufferViewOffset,
  ) =
    _addAccessorData(
      pointData,
      (accessorBufferArr, bufferViewDataArr, newBufferViewOffset),
      gltf,
    );

  (
    byteLength,
    newPointDataAccessorBufferIndex,
    accessorBufferArr,
    bufferViewDataArr,
    newBufferViewOffset,
    streamChunkArr
    |> ArrayService.push(
         {byteLength, componentType, index: mesh, type_}: StreamType.streamUnitData,
       ),
  );
};

let _addPrimitiveOptionPointData =
    (
      (pointData, mesh, type_),
      (
        streamChunkArr,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
      ),
      gltf,
    ) =>
  switch (pointData) {
  | Some(pointData) =>
    _addPrimitivePointData(
      (pointData, mesh, type_),
      (
        streamChunkArr,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
      ),
      gltf,
    )
  | None => (
      0,
      None,
      accessorBufferArr,
      bufferViewDataArr,
      newBufferViewOffset,
      streamChunkArr,
    )
  };

let _addPrimitiveData =
    (
      mesh,
      ({attributes, indices}: GLTFType.primitive) as primitive,
      (
        accessorBufferArr,
        bufferViewDataArr,
        streamChunkArr,
        newBufferViewOffset,
      ),
      gltf,
    ) => {
  let {position, normal, texCoord_0}: GLTFType.attributes = attributes;

  let (
    byteLength,
    newPositionAccessorBufferIndex,
    accessorBufferArr,
    bufferViewDataArr,
    newBufferViewOffset,
    streamChunkArr,
  ) =
    _addPrimitivePointData(
      (position, mesh, Vertex),
      (
        streamChunkArr,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
      ),
      gltf,
    );

  let (
    byteLength,
    newNormalAccessorBufferIndex,
    accessorBufferArr,
    bufferViewDataArr,
    newBufferViewOffset,
    streamChunkArr,
  ) =
    _addPrimitiveOptionPointData(
      (normal, mesh, Normal),
      (
        streamChunkArr,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
      ),
      gltf,
    );

  let (
    byteLength,
    newTexCoord0AccessorBufferIndex,
    accessorBufferArr,
    bufferViewDataArr,
    newBufferViewOffset,
    streamChunkArr,
  ) =
    _addPrimitiveOptionPointData(
      (texCoord_0, mesh, TexCoord),
      (
        streamChunkArr,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
      ),
      gltf,
    );

  let (
    byteLength,
    newIndicesAccessorBufferIndex,
    accessorBufferArr,
    bufferViewDataArr,
    newBufferViewOffset,
    streamChunkArr,
  ) =
    _addPrimitiveOptionPointData(
      (indices, mesh, Index),
      (
        streamChunkArr,
        accessorBufferArr,
        bufferViewDataArr,
        newBufferViewOffset,
      ),
      gltf,
    );

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
  |> WonderCommonlib.MutableSparseMapService.has(key)
  && hasAddBeforeMap
  |> WonderCommonlib.MutableSparseMapService.unsafeGet(key) === true;

let _addPBRImageData =
    (
      diffuseTextureIndex,
      (
        {bufferViews}: GLTFType.gltf,
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
          bufferViews,
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
        newImageBufferViewIndex->Some,
        newBufferViewOffset,
        Some((imageIndex, image)),
        hasImageAddBeforeMap
        |> WonderCommonlib.MutableSparseMapService.set(imageIndex, true),
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

let _addNewImage = (newBufferViewIndex, imageData, newImages) =>
  switch (newImages) {
  | None => newImages
  | Some(newImages) =>
    (
      switch (newBufferViewIndex, imageData) {
      | (Some(newBufferViewIndex), Some((imageIndex, image))) =>
        Array.unsafe_set(
          newImages,
          imageIndex,
          {...image, bufferView: Some(newBufferViewIndex)}: GLTFType.image,
        );

        newImages;
      | _ => newImages
      }
    )
    ->Some
  };

let _addImageData =
    (
      lightMaterial,
      (
        bufferViewDataArr,
        streamChunkArr,
        newBufferViewOffset,
        hasImageAddBeforeMap,
      ),
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

let _addCubemapOneFaceTextureImageData =
    (
      source,
      (images, bufferViews),
      (
        bufferViewDataArr,
        streamChunkArr,
        newBufferViewOffset,
        newImages,
        hasImageAddBeforeMap,
      ),
    ) => {
  let imageIndex = source;

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
      newBufferViewOffset,
      newImages,
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
          bufferViews,
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
        newBufferViewOffset,
        _addNewImage(
          newImageBufferViewIndex->Some,
          Some((imageIndex, image)),
          newImages,
        ),
        hasImageAddBeforeMap
        |> WonderCommonlib.MutableSparseMapService.set(imageIndex, true),
      );
    };
};

let _addCubemapTextureImageData =
    (
      cubemapTextures,
      (images, bufferViews),
      (bufferViewDataArr, streamChunkArr, newBufferViewOffset, newImages),
      noneData,
    ) => {
  let (bufferViewDataArr, streamChunkArr, newBufferViewOffset, newImages, _) =
    cubemapTextures
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (
             bufferViewDataArr,
             streamChunkArr,
             newBufferViewOffset,
             newImages,
             hasImageAddBeforeMap,
           ),
           {pxSource, nxSource, pySource, nySource, pzSource, nzSource}: GLTFType.cubemapTexture,
         ) => {
           let (
             bufferViewDataArr,
             streamChunkArr,
             newBufferViewOffset,
             newImages,
             hasImageAddBeforeMap,
           ) =
             _addCubemapOneFaceTextureImageData(
               pxSource,
               (images, bufferViews),
               (
                 bufferViewDataArr,
                 streamChunkArr,
                 newBufferViewOffset,
                 newImages,
                 hasImageAddBeforeMap,
               ),
             );

           let (
             bufferViewDataArr,
             streamChunkArr,
             newBufferViewOffset,
             newImages,
             hasImageAddBeforeMap,
           ) =
             _addCubemapOneFaceTextureImageData(
               nxSource,
               (images, bufferViews),
               (
                 bufferViewDataArr,
                 streamChunkArr,
                 newBufferViewOffset,
                 newImages,
                 hasImageAddBeforeMap,
               ),
             );

           let (
             bufferViewDataArr,
             streamChunkArr,
             newBufferViewOffset,
             newImages,
             hasImageAddBeforeMap,
           ) =
             _addCubemapOneFaceTextureImageData(
               pySource,
               (images, bufferViews),
               (
                 bufferViewDataArr,
                 streamChunkArr,
                 newBufferViewOffset,
                 newImages,
                 hasImageAddBeforeMap,
               ),
             );

           let (
             bufferViewDataArr,
             streamChunkArr,
             newBufferViewOffset,
             newImages,
             hasImageAddBeforeMap,
           ) =
             _addCubemapOneFaceTextureImageData(
               nySource,
               (images, bufferViews),
               (
                 bufferViewDataArr,
                 streamChunkArr,
                 newBufferViewOffset,
                 newImages,
                 hasImageAddBeforeMap,
               ),
             );

           let (
             bufferViewDataArr,
             streamChunkArr,
             newBufferViewOffset,
             newImages,
             hasImageAddBeforeMap,
           ) =
             _addCubemapOneFaceTextureImageData(
               pzSource,
               (images, bufferViews),
               (
                 bufferViewDataArr,
                 streamChunkArr,
                 newBufferViewOffset,
                 newImages,
                 hasImageAddBeforeMap,
               ),
             );

           let (
             bufferViewDataArr,
             streamChunkArr,
             newBufferViewOffset,
             newImages,
             hasImageAddBeforeMap,
           ) =
             _addCubemapOneFaceTextureImageData(
               nzSource,
               (images, bufferViews),
               (
                 bufferViewDataArr,
                 streamChunkArr,
                 newBufferViewOffset,
                 newImages,
                 hasImageAddBeforeMap,
               ),
             );

           (
             bufferViewDataArr,
             streamChunkArr,
             newBufferViewOffset,
             newImages,
             hasImageAddBeforeMap,
           );
         },
         (
           bufferViewDataArr,
           streamChunkArr,
           newBufferViewOffset,
           newImages,
           WonderCommonlib.MutableSparseMapService.createEmpty(),
         ),
       );

  (bufferViewDataArr, streamChunkArr, newBufferViewOffset, newImages);
};

let _addImageDataForCubemapTexture =
    (
      (bufferViewDataArr, streamChunkArr, newBufferViewOffset, newImages),
      ({extras, images, bufferViews}: GLTFType.gltf) as gltf,
    ) => {
  let noneData = (
    bufferViewDataArr,
    streamChunkArr,
    newBufferViewOffset,
    newImages,
  );

  switch (extras, images) {
  | (Some({cubemapTextures}), Some(images)) =>
    switch (cubemapTextures) {
    | None => noneData
    | Some(cubemapTextures) =>
      _addCubemapTextureImageData(
        cubemapTextures,
        (images, bufferViews),
        (bufferViewDataArr, streamChunkArr, newBufferViewOffset, newImages),
        noneData,
      )
    }
  | _ => noneData
  };
};

let _buildNewGLTF =
    ((accessorBufferArr, bufferViewArr, newMeshes, newImages), gltf)
    : GLTFType.gltf => {
  ...gltf,
  accessors: accessorBufferArr,
  bufferViews: bufferViewArr,
  meshes: newMeshes,
  images: newImages,
};

let _checkPointData = (accessorIndex, (isDuplicate, hasAccessorIndexMap)) =>
  switch (
    hasAccessorIndexMap
    |> WonderCommonlib.MutableSparseMapService.get(accessorIndex)
  ) {
  | None => (
      isDuplicate,
      hasAccessorIndexMap
      |> WonderCommonlib.MutableSparseMapService.set(accessorIndex, true),
    )

  | Some(hasAccessorIndex) => (true, hasAccessorIndexMap)
  };

let _checkMeshPointDataHasUniqueAccessorIndex = meshes =>
  WonderLog.(
    Contract.(
      test(
        Log.buildAssertMessage(
          ~expect={j|mesh -> point data has unique accessorIndex|j},
          ~actual={j|not|j},
        ),
        () => {
          let hasAccessorIndexMap =
            WonderCommonlib.MutableSparseMapService.createEmpty();

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
                       let (
                             {attributes, indices, material}: GLTFType.primitive
                           ) as primitive =
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
      )
    )
  );

let _addMeshAndImageData =
    (
      gltf,
      (node, meshes, mesh),
      (
        (hasMeshAddBeforeMap, hasImageAddBeforeMap),
        accessorBufferArr,
        bufferViewDataArr,
        streamChunkArr,
        newBufferViewOffset,
        newMeshes,
        newImages,
      ),
      noneData,
    ) => {
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
                (
                  accessorBufferArr,
                  bufferViewDataArr,
                  streamChunkArr,
                  newBufferViewOffset,
                ),
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
              |> WonderCommonlib.MutableSparseMapService.set(mesh, true),
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
          ConvertMaterialsSystem.getLightMaterialOfNode(node, meshes),
          (
            bufferViewDataArr,
            streamChunkArr,
            newBufferViewOffset,
            hasImageAddBeforeMap,
          ),
          gltf,
        );

      let newImages = _addNewImage(newBufferViewIndex, imageData, newImages);

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
    newBufferViewOffset,
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
             _addMeshAndImageData(
               gltf,
               (node, meshes, mesh),
               (
                 (hasMeshAddBeforeMap, hasImageAddBeforeMap),
                 accessorBufferArr,
                 bufferViewDataArr,
                 streamChunkArr,
                 newBufferViewOffset,
                 newMeshes,
                 newImages,
               ),
               noneData,
             )
           | None => noneData
           };
         },
         (
           (
             WonderCommonlib.MutableSparseMapService.createEmpty(),
             WonderCommonlib.MutableSparseMapService.createEmpty(),
           ),
           [||],
           [||],
           [||],
           0,
           [||],
           Some([||]),
         ),
       );

  let (bufferViewDataArr, streamChunkArr, _newBufferViewOffset, newImages) =
    _addImageDataForCubemapTexture(
      (bufferViewDataArr, streamChunkArr, newBufferViewOffset, newImages),
      gltf,
    );

  (
    bufferViewDataArr,
    streamChunkArr,
    _buildNewGLTF(
      (
        accessorBufferArr,
        bufferViewDataArr
        |> Js.Array.map(((oldBufferView, newBufferView, _)) => newBufferView),
        newMeshes,
        newImages,
      ),
      gltf,
    ),
  );
};