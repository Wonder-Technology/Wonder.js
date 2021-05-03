open Js.Typed_array;

open RABType;

let _getUint8Array = (uint8Array, base64, editorState) =>
  uint8Array |> OptionService.unsafeGet;

let _setImageIndexMap = (imageDataIndex, imageArr, imageIndexMap) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|imageIndexMap not has imageDataIndex|j},
                ~actual={j|has|j},
              ),
              () =>
              imageIndexMap
              |> WonderCommonlib.ImmutableSparseMapService.has(
                   imageDataIndex,
                 )
              |> assertFalse
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  imageIndexMap
  |> WonderCommonlib.ImmutableSparseMapService.set(
       imageDataIndex,
       imageArr |> Js.Array.length,
     );
};

let _addImageData =
    (
      imageDataIndex,
      {name, mimeType, uint8Array}: ResourceData.imageData,
      (imageIndexMap, imageArr, bufferViewArr, uint8ArrayArr, byteOffset),
    ) => {
  let byteLength = uint8Array |> Uint8Array.length;
  let alignedByteLength = BufferUtils.alignedLength(byteLength);

  (
    _setImageIndexMap(imageDataIndex, imageArr, imageIndexMap),
    imageArr
    |> ArrayService.push({
         name,
         mimeType,
         bufferView: bufferViewArr |> Js.Array.length,
       }),
    bufferViewArr |> ArrayService.push({byteOffset, byteLength}),
    uint8ArrayArr |> ArrayService.push(uint8Array),
    byteOffset + alignedByteLength,
  );
};

let _addCubemapFaceImageData =
    (
      imageDataIndex,
      /* {name, mimeType, uint8Array}: ResourceData.imageData, */
      faceImageData,
      (imageIndexMap, imageArr, bufferViewArr, uint8ArrayArr, byteOffset),
    ) =>
  switch (faceImageData) {
  | None => (
      imageIndexMap,
      imageArr,
      bufferViewArr,
      uint8ArrayArr,
      byteOffset,
    )
  | Some(({name, mimeType, uint8Array}: ResourceData.imageData)) =>
    let byteLength = uint8Array |> Uint8Array.length;
    let alignedByteLength = BufferUtils.alignedLength(byteLength);

    (
      _setImageIndexMap(imageDataIndex, imageArr, imageIndexMap),
      imageArr
      |> ArrayService.push({
           name,
           mimeType,
           bufferView: bufferViewArr |> Js.Array.length,
         }),
      bufferViewArr |> ArrayService.push({byteOffset, byteLength}),
      uint8ArrayArr |> ArrayService.push(uint8Array),
      byteOffset + alignedByteLength,
    );
  };

let _buildImageData =
    (
      {
        basicSourceTextures,
        cubemapTextures,
        basicSourceTextureImageDataMap,
        cubemapTextureImageDataMap,
      }: ResourceData.resourceData,
    ) => {
  let (
    basicSourceTextureImageIndexMap,
    imageArr,
    bufferViewArr,
    uint8ArrayArr,
    byteOffset,
  ) =
    basicSourceTextures
    |> Js.Array.map(({imageDataIndex}: ResourceData.basicSourceTextureData) =>
         imageDataIndex
       )
    |> WonderCommonlib.ArrayService.removeDuplicateItems
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (
             imageIndexMap,
             imageArr,
             bufferViewArr,
             uint8ArrayArr,
             byteOffset,
           ),
           imageDataIndex,
         ) =>
           _addImageData(
             imageDataIndex,
             basicSourceTextureImageDataMap
             |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                  imageDataIndex,
                ),
             (
               imageIndexMap,
               imageArr,
               bufferViewArr,
               uint8ArrayArr,
               byteOffset,
             ),
           ),
         (
           WonderCommonlib.ImmutableSparseMapService.createEmpty(),
           [||],
           [||],
           [||],
           0,
         ),
       );

  let (
    (
      pxImageIndexMap,
      nxImageIndexMap,
      pyImageIndexMap,
      nyImageIndexMap,
      pzImageIndexMap,
      nzImageIndexMap,
    ),
    imageArr,
    bufferViewArr,
    uint8ArrayArr,
    byteOffset,
  ) =
    cubemapTextures
    |> Js.Array.map(({imageDataIndex}: ResourceData.cubemapTextureData) =>
         imageDataIndex
       )
    |> WonderCommonlib.ArrayService.removeDuplicateItems
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (
             (
               pxImageIndexMap,
               nxImageIndexMap,
               pyImageIndexMap,
               nyImageIndexMap,
               pzImageIndexMap,
               nzImageIndexMap,
             ),
             imageArr,
             bufferViewArr,
             uint8ArrayArr,
             byteOffset,
           ),
           imageDataIndex,
         ) => {
           let {
             pxImageData,
             nxImageData,
             pyImageData,
             nyImageData,
             pzImageData,
             nzImageData,
           }: ResourceData.cubemapTextureImageData =
             cubemapTextureImageDataMap
             |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                  imageDataIndex,
                );

           let (
             pxImageIndexMap,
             imageArr,
             bufferViewArr,
             uint8ArrayArr,
             byteOffset,
           ) =
             _addCubemapFaceImageData(
               imageDataIndex,
               pxImageData,
               (
                 pxImageIndexMap,
                 imageArr,
                 bufferViewArr,
                 uint8ArrayArr,
                 byteOffset,
               ),
             );

           let (
             nxImageIndexMap,
             imageArr,
             bufferViewArr,
             uint8ArrayArr,
             byteOffset,
           ) =
             _addCubemapFaceImageData(
               imageDataIndex,
               nxImageData,
               (
                 nxImageIndexMap,
                 imageArr,
                 bufferViewArr,
                 uint8ArrayArr,
                 byteOffset,
               ),
             );

           let (
             pyImageIndexMap,
             imageArr,
             bufferViewArr,
             uint8ArrayArr,
             byteOffset,
           ) =
             _addCubemapFaceImageData(
               imageDataIndex,
               pyImageData,
               (
                 pyImageIndexMap,
                 imageArr,
                 bufferViewArr,
                 uint8ArrayArr,
                 byteOffset,
               ),
             );

           let (
             nyImageIndexMap,
             imageArr,
             bufferViewArr,
             uint8ArrayArr,
             byteOffset,
           ) =
             _addCubemapFaceImageData(
               imageDataIndex,
               nyImageData,
               (
                 nyImageIndexMap,
                 imageArr,
                 bufferViewArr,
                 uint8ArrayArr,
                 byteOffset,
               ),
             );

           let (
             pzImageIndexMap,
             imageArr,
             bufferViewArr,
             uint8ArrayArr,
             byteOffset,
           ) =
             _addCubemapFaceImageData(
               imageDataIndex,
               pzImageData,
               (
                 pzImageIndexMap,
                 imageArr,
                 bufferViewArr,
                 uint8ArrayArr,
                 byteOffset,
               ),
             );

           let (
             nzImageIndexMap,
             imageArr,
             bufferViewArr,
             uint8ArrayArr,
             byteOffset,
           ) =
             _addCubemapFaceImageData(
               imageDataIndex,
               nzImageData,
               (
                 nzImageIndexMap,
                 imageArr,
                 bufferViewArr,
                 uint8ArrayArr,
                 byteOffset,
               ),
             );

           (
             (
               pxImageIndexMap,
               nxImageIndexMap,
               pyImageIndexMap,
               nyImageIndexMap,
               pzImageIndexMap,
               nzImageIndexMap,
             ),
             imageArr,
             bufferViewArr,
             uint8ArrayArr,
             byteOffset,
           );
         },
         (
           (
             WonderCommonlib.ImmutableSparseMapService.createEmpty(),
             WonderCommonlib.ImmutableSparseMapService.createEmpty(),
             WonderCommonlib.ImmutableSparseMapService.createEmpty(),
             WonderCommonlib.ImmutableSparseMapService.createEmpty(),
             WonderCommonlib.ImmutableSparseMapService.createEmpty(),
             WonderCommonlib.ImmutableSparseMapService.createEmpty(),
           ),
           imageArr,
           bufferViewArr,
           uint8ArrayArr,
           byteOffset,
         ),
       );

  (
    (
      basicSourceTextureImageIndexMap,
      (
        pxImageIndexMap,
        nxImageIndexMap,
        pyImageIndexMap,
        nyImageIndexMap,
        pzImageIndexMap,
        nzImageIndexMap,
      ),
    ),
    imageArr,
    bufferViewArr,
    uint8ArrayArr,
    RABUtils.computeBufferViewDataByteLength(bufferViewArr),
  );
};

let _setTextureIndexMap = (textureComponent, textureArr, textureIndexMap) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|textureIndexMap not has textureComponent|j},
                ~actual={j|has|j},
              ),
              () =>
              textureIndexMap
              |> WonderCommonlib.ImmutableSparseMapService.has(
                   textureComponent,
                 )
              |> assertFalse
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  textureIndexMap
  |> WonderCommonlib.ImmutableSparseMapService.set(
       textureComponent,
       textureArr |> Js.Array.length,
     );
};

let _buildBasicSourceTextureData =
    (imageIndexMap, {basicSourceTextures}: ResourceData.resourceData, state) =>
  basicSourceTextures
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         (basicSourceTextureIndexMap, basicSourceTextureArr),
         {textureComponent, imageDataIndex}: ResourceData.basicSourceTextureData,
       ) => (
         _setTextureIndexMap(
           textureComponent,
           basicSourceTextureArr,
           basicSourceTextureIndexMap,
         ),
         basicSourceTextureArr
         |> ArrayService.push({
              name:
                NameBasicSourceTextureMainService.unsafeGetName(
                  textureComponent,
                  state,
                ),
              source:
                imageIndexMap
                |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                     imageDataIndex,
                   ),
              wrapS:
                OperateBasicSourceTextureMainService.getWrapS(
                  textureComponent,
                  state,
                ),
              wrapT:
                OperateBasicSourceTextureMainService.getWrapT(
                  textureComponent,
                  state,
                ),
              minFilter:
                OperateBasicSourceTextureMainService.getMinFilter(
                  textureComponent,
                  state,
                ),
              magFilter:
                OperateBasicSourceTextureMainService.getMagFilter(
                  textureComponent,
                  state,
                ),
              format:
                OperateBasicSourceTextureMainService.getFormat(
                  textureComponent,
                  state,
                ),
              type_:
                OperateBasicSourceTextureMainService.getType(
                  textureComponent,
                  state,
                ),
              flipY:
                OperateBasicSourceTextureMainService.getFlipY(
                  textureComponent,
                  state,
                ),
            }),
       ),
       (WonderCommonlib.ImmutableSparseMapService.createEmpty(), [||]),
     );

let _buildCubemapTextureFaceSource = (faceSourceImageIndexMap, imageDataIndex) =>
  faceSourceImageIndexMap
  |> WonderCommonlib.ImmutableSparseMapService.get(imageDataIndex);

let _buildCubemapTextureData =
    (
      (
        pxImageIndexMap,
        nxImageIndexMap,
        pyImageIndexMap,
        nyImageIndexMap,
        pzImageIndexMap,
        nzImageIndexMap,
      ),
      {cubemapTextures}: ResourceData.resourceData,
      state,
    ) =>
  cubemapTextures
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         cubemapTextureArr,
         {textureComponent, imageDataIndex}: ResourceData.cubemapTextureData,
       ) =>
         cubemapTextureArr
         |> ArrayService.push({
              name:
                NameCubemapTextureMainService.unsafeGetName(
                  textureComponent,
                  state,
                ),
              pxSource:
                _buildCubemapTextureFaceSource(
                  pxImageIndexMap,
                  imageDataIndex,
                ),
              nxSource:
                _buildCubemapTextureFaceSource(
                  nxImageIndexMap,
                  imageDataIndex,
                ),
              pySource:
                _buildCubemapTextureFaceSource(
                  pyImageIndexMap,
                  imageDataIndex,
                ),
              nySource:
                _buildCubemapTextureFaceSource(
                  nyImageIndexMap,
                  imageDataIndex,
                ),
              pzSource:
                _buildCubemapTextureFaceSource(
                  pzImageIndexMap,
                  imageDataIndex,
                ),
              nzSource:
                _buildCubemapTextureFaceSource(
                  nzImageIndexMap,
                  imageDataIndex,
                ),
              wrapS:
                OperateCubemapTextureMainService.getWrapS(
                  textureComponent,
                  state,
                ),
              wrapT:
                OperateCubemapTextureMainService.getWrapT(
                  textureComponent,
                  state,
                ),
              minFilter:
                OperateCubemapTextureMainService.getMinFilter(
                  textureComponent,
                  state,
                ),
              magFilter:
                OperateCubemapTextureMainService.getMagFilter(
                  textureComponent,
                  state,
                ),
              pxFormat:
                OperateCubemapTextureMainService.getPXFormat(
                  textureComponent,
                  state,
                ),
              nxFormat:
                OperateCubemapTextureMainService.getNXFormat(
                  textureComponent,
                  state,
                ),
              pyFormat:
                OperateCubemapTextureMainService.getPYFormat(
                  textureComponent,
                  state,
                ),
              nyFormat:
                OperateCubemapTextureMainService.getNYFormat(
                  textureComponent,
                  state,
                ),
              pzFormat:
                OperateCubemapTextureMainService.getPZFormat(
                  textureComponent,
                  state,
                ),
              nzFormat:
                OperateCubemapTextureMainService.getNZFormat(
                  textureComponent,
                  state,
                ),
              pxType:
                OperateCubemapTextureMainService.getPXType(
                  textureComponent,
                  state,
                ),
              nxType:
                OperateCubemapTextureMainService.getNXType(
                  textureComponent,
                  state,
                ),
              pyType:
                OperateCubemapTextureMainService.getPYType(
                  textureComponent,
                  state,
                ),
              nyType:
                OperateCubemapTextureMainService.getNYType(
                  textureComponent,
                  state,
                ),
              pzType:
                OperateCubemapTextureMainService.getPZType(
                  textureComponent,
                  state,
                ),
              nzType:
                OperateCubemapTextureMainService.getNZType(
                  textureComponent,
                  state,
                ),
              flipY:
                OperateCubemapTextureMainService.getFlipY(
                  textureComponent,
                  state,
                ),
            }),
       [||],
     );

let _getLightMaterialMapTextureIndexFromMap =
    (textureComponent, basicSourceTextureIndexMap) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|lightMaterial->maps contain in resourceData->basicSourceTextures|j},
                ~actual={j|not|j},
              ),
              () =>
              basicSourceTextureIndexMap
              |> WonderCommonlib.ImmutableSparseMapService.has(
                   textureComponent,
                 )
              |> assertTrue
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  basicSourceTextureIndexMap
  |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(textureComponent);
};

let _getLightMaterialMapTextureIndex =
    (textureComponent, basicSourceTextureIndexMap) =>
  switch (textureComponent) {
  | None => None
  | Some(textureComponent) =>
    _getLightMaterialMapTextureIndexFromMap(
      textureComponent,
      basicSourceTextureIndexMap,
    )
    ->Some
  };

let _buildMaterialData =
    (
      basicSourceTextureIndexMap,
      {basicMaterials, lightMaterials}: ResourceData.resourceData,
      state,
    ) => {
  let basicMaterialArr =
    basicMaterials
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. basicMaterialArr, materialComponent) => {
           let name =
             NameBasicMaterialMainService.unsafeGetName(
               materialComponent,
               state,
             );

           basicMaterialArr
           |> ArrayService.push({
                name,
                color:
                  OperateBasicMaterialMainService.getColor(
                    materialComponent,
                    state,
                  ),
              });
         },
         [||],
       );

  let lightMaterialArr =
    lightMaterials
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. lightMaterialArr, materialComponent) => {
           let name =
             NameLightMaterialMainService.unsafeGetName(
               materialComponent,
               state,
             );

           lightMaterialArr
           |> ArrayService.push({
                name,
                diffuseColor:
                  OperateLightMaterialMainService.getDiffuseColor(
                    materialComponent,
                    state,
                  ),
                diffuseMap:
                  _getLightMaterialMapTextureIndex(
                    OperateLightMaterialMainService.getDiffuseMap(
                      materialComponent,
                      state,
                    ),
                    basicSourceTextureIndexMap,
                  ),
                shininess:
                  OperateLightMaterialMainService.getShininess(
                    materialComponent,
                    state,
                  ),
              });
         },
         [||],
       );

  (basicMaterialArr, lightMaterialArr);
};

let _buildGeometryBufferData =
    (
      geometryComponent,
      (bufferViewArr, byteOffset, uint8ArrayArr),
      (hasGeometryPointsFunc, getPointsUint8ArrayFunc),
      state,
    ) =>
  hasGeometryPointsFunc(geometryComponent, state) ?
    {
      let uint8Array = getPointsUint8ArrayFunc(geometryComponent, state);

      let byteLength = uint8Array |> Uint8Array.byteLength;

      let alignedByteLength = BufferUtils.alignedLength(byteLength);

      (
        bufferViewArr |> Js.Array.length,
        bufferViewArr |> ArrayService.push({byteOffset, byteLength}),
        byteOffset + alignedByteLength,
        uint8ArrayArr |> ArrayService.push(uint8Array),
      );
    } :
    (
      ABBufferViewUtils.buildNoneBufferViewIndex(),
      bufferViewArr,
      byteOffset,
      uint8ArrayArr,
    );

let _buildGeometryAllPointData =
    (geometryComponent, (bufferViewArr, byteOffset, uint8ArrayArr), state) => {
  let (vertexBufferView, bufferViewArr, byteOffset, uint8ArrayArr) =
    _buildGeometryBufferData(
      geometryComponent,
      (bufferViewArr, byteOffset, uint8ArrayArr),
      (
        VerticesGeometryMainService.hasVertices,
        (geometryComponent, state) =>
          VerticesGeometryMainService.getVertices(. geometryComponent, state)
          |> TypeArrayUtils.convertFloat32ToUint8,
      ),
      state,
    );

  let (normalBufferView, bufferViewArr, byteOffset, uint8ArrayArr) =
    _buildGeometryBufferData(
      geometryComponent,
      (bufferViewArr, byteOffset, uint8ArrayArr),
      (
        NormalsGeometryMainService.hasNormals,
        (geometryComponent, state) =>
          NormalsGeometryMainService.getNormals(. geometryComponent, state)
          |> TypeArrayUtils.convertFloat32ToUint8,
      ),
      state,
    );

  let (texCoordBufferView, bufferViewArr, byteOffset, uint8ArrayArr) =
    _buildGeometryBufferData(
      geometryComponent,
      (bufferViewArr, byteOffset, uint8ArrayArr),
      (
        TexCoordsGeometryMainService.hasTexCoords,
        (geometryComponent, state) =>
          TexCoordsGeometryMainService.getTexCoords(.
            geometryComponent,
            state,
          )
          |> TypeArrayUtils.convertFloat32ToUint8,
      ),
      state,
    );

  let (indexBufferView, bufferViewArr, byteOffset, uint8ArrayArr) =
    _buildGeometryBufferData(
      geometryComponent,
      (bufferViewArr, byteOffset, uint8ArrayArr),
      (
        IndicesGeometryMainService.hasIndices,
        (geometryComponent, state) =>
          IndicesGeometryMainService.hasIndices16(geometryComponent, state) ?
            IndicesGeometryMainService.getIndices16(.
              geometryComponent,
              state,
            )
            |> TypeArrayUtils.convertUint16ToUint8 :
            IndicesGeometryMainService.getIndices32(.
              geometryComponent,
              state,
            )
            |> TypeArrayUtils.convertUint32ToUint8,
      ),
      state,
    );

  (
    (vertexBufferView, normalBufferView, texCoordBufferView, indexBufferView),
    bufferViewArr,
    byteOffset,
    uint8ArrayArr,
  );
};

let _buildGeometryData =
    (
      imageAlignedByteLength,
      imageBufferViewArr,
      {geometrys}: ResourceData.resourceData,
      state,
    ) => {
  let imageBufferViewIndex = imageBufferViewArr |> Js.Array.length;

  let (geometryArr, uint8ArrayArr, bufferViewArr, byteOffset) =
    geometrys
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (geometryArr, uint8ArrayArr, bufferViewArr, byteOffset),
           geometryComponent,
         ) => {
           let (
             (
               vertexBufferView,
               normalBufferView,
               texCoordBufferView,
               indexBufferView,
             ),
             bufferViewArr,
             byteOffset,
             uint8ArrayArr,
           ) =
             _buildGeometryAllPointData(
               geometryComponent,
               (bufferViewArr, byteOffset, uint8ArrayArr),
               state,
             );

           (
             geometryArr
             |> ArrayService.push({
                  name:
                    NameGeometryMainService.unsafeGetName(
                      geometryComponent,
                      state,
                    ),
                  indexDataType:
                    IndicesGeometryMainService.hasIndices16(
                      geometryComponent,
                      state,
                    ) ?
                      RABType.Index16 : RABType.Index32,
                  vertexBufferView: imageBufferViewIndex + vertexBufferView,
                  normalBufferView: imageBufferViewIndex + normalBufferView,
                  texCoordBufferView:
                    imageBufferViewIndex + texCoordBufferView,
                  indexBufferView: imageBufferViewIndex + indexBufferView,
                }),
             uint8ArrayArr,
             bufferViewArr,
             byteOffset,
           );
         },
         ([||], [||], [||], imageAlignedByteLength),
       );

  (
    geometryArr,
    uint8ArrayArr,
    bufferViewArr,
    bufferViewArr |> Js.Array.length === 0 ?
      imageAlignedByteLength :
      RABUtils.computeBufferViewDataByteLength(bufferViewArr),
  );
};

let _convertEventFunctionToStr = eventFunction =>
  SerializeService.serializeFunction(eventFunction);

let convertEventFunctionDataToStr =
    ({init, update, dispose}: Wonderjs.StateDataMainType.eventFunctionData) =>
  (
    {
      init:
        init
        |> Js.Option.andThen((. init) => _convertEventFunctionToStr(init)),
      update:
        update
        |> Js.Option.andThen((. update) =>
             _convertEventFunctionToStr(update)
           ),
      dispose:
        dispose
        |> Js.Option.andThen((. dispose) =>
             _convertEventFunctionToStr(dispose)
           ),
    }: Wonderjs.StateDataMainType.eventFunctionData
  )
  |> Obj.magic
  |> Js.Json.stringify;

let _buildScriptEventFunctionData =
    ({scriptEventFunctionDataArr}: ResourceData.resourceData) =>
  scriptEventFunctionDataArr
  |> Js.Array.map(
       ({name, eventFunctionData}: ResourceData.scriptEventFunctionData) =>
       {
         name,
         eventFunctionDataStr:
           convertEventFunctionDataToStr(eventFunctionData),
       }
     );

let convertAttributeToStr = attribute =>
  attribute |> Obj.magic |> Js.Json.stringify;

let _buildScriptAttributeData =
    ({scriptAttributeDataArr}: ResourceData.resourceData) =>
  scriptAttributeDataArr
  |> Js.Array.map(({name, attribute}: ResourceData.scriptAttributeData) =>
       {name, attributeStr: convertAttributeToStr(attribute)}
     );

let buildJsonData = (resourceData, state) => {
  let (
    (basicSourceTextureImageIndexMap, cubemapTextureFaceImageIndexMapTuple),
    imageArr,
    imageBufferViewArr,
    imageUint8ArrayArr,
    imageAlignedByteLength,
  ) =
    _buildImageData(resourceData);

  let (basicSourceTextureIndexMap, basicSourceTextureArr) =
    _buildBasicSourceTextureData(
      basicSourceTextureImageIndexMap,
      resourceData,
      state,
    );

  let cubemapTextureArr =
    _buildCubemapTextureData(
      cubemapTextureFaceImageIndexMapTuple,
      resourceData,
      state,
    );

  let (basicMaterialArr, lightMaterialArr) =
    _buildMaterialData(basicSourceTextureIndexMap, resourceData, state);

  let (
    geometryArr,
    geometryArrayBufferArr,
    geometryBufferViewArr,
    bufferTotalAlignedByteLength,
  ) =
    _buildGeometryData(
      imageAlignedByteLength,
      imageBufferViewArr,
      resourceData,
      state,
    );

  let scriptEventFunctionArr = _buildScriptEventFunctionData(resourceData);

  let scriptAttributeArr = _buildScriptAttributeData(resourceData);

  (
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
    (imageUint8ArrayArr, geometryArrayBufferArr),
    bufferTotalAlignedByteLength,
  );
};

let buildJsonUint8Array = resourceAssetBundleContent =>
  GenerateABUtils.buildJsonUint8Array(resourceAssetBundleContent);