open Js.Typed_array;

open RABType;

/* let _buildEmptyUint8Array = () => Uint8Array.make([||]); */

let _getUint8Array = (uint8Array, base64, editorState) =>
  /* switch (uint8Array) {
     | Some(uint8Array) => uint8Array
     | None =>
       switch (base64) {
       | Some(base64) => BufferUtils.convertBase64ToUint8Array(base64)
       | None =>
         ConsoleUtils.error(
           LogUtils.buildErrorMessage(
             ~description={j|image->base64 should exist|j},
             ~reason="",
             ~solution={j||j},
             ~params={j||j},
           ),
           editorState,
         );

         _buildEmptyUint8Array();
       }
     }; */
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

/* TODO test: only save texture used image data */
let _buildImageData = ({textures, imageDataMap}) => {
  let (imageIndexMap, imageArr, bufferViewArr, uint8ArrayArr, byteOffset) =
    textures
    |> Js.Array.map(({imageDataIndex}) => imageDataIndex)
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
         ) => {
           let {name, mimeType, uint8Array}: imageData =
             imageDataMap
             |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                  imageDataIndex,
                );

           /* let uint8Array = _getUint8Array(uint8Array, base64, editorState); */
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
         },
         (
           WonderCommonlib.ImmutableSparseMapService.createEmpty(),
           [||],
           [||],
           [||],
           0,
         ),
       );

  (
    imageIndexMap,
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

let _buildTextureData = (imageIndexMap, {textures}, state) =>
  textures
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (textureIndexMap, textureArr), {textureComponent, imageDataIndex}) => (
         /* let {textureComponent, imageDataIndex}: NodeAssetType.textureNodeData =
            TextureNodeAssetService.getNodeData(node); */
         _setTextureIndexMap(textureComponent, textureArr, textureIndexMap),
         textureArr
         |> ArrayService.push({
              /* name: NodeNameAssetLogicService.getNodeName(node, state), */
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

let _getLightMaterialMapTextureIndexFromMap =
    (textureComponent, textureIndexMap) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|lightMaterial->maps contain in resourceData->textures|j},
                ~actual={j|not|j},
              ),
              () =>
              textureIndexMap
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

  textureIndexMap
  |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(textureComponent);
};

let _getLightMaterialMapTextureIndex = (textureComponent, textureIndexMap) =>
  switch (textureComponent) {
  | None => None
  | Some(textureComponent) =>
    _getLightMaterialMapTextureIndexFromMap(textureComponent, textureIndexMap)
    ->Some
  };

let _buildMaterialData =
    (textureIndexMap, {basicMaterials, lightMaterials}, state) => {
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
                    textureIndexMap,
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

let _buildGeometryData =
    /* imageUint8ArrayMap, */
    (imageAlignedByteLength, imageBufferViewArr, {geometrys}, state) => {
  let imageBufferViewIndex = imageBufferViewArr |> Js.Array.length;

  let (state, geometryArr, uint8ArrayArr, bufferViewArr, byteOffset) =
    geometrys
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (state, geometryArr, uint8ArrayArr, bufferViewArr, byteOffset),
           geometryComponent,
         ) => {
           let (vertexBufferView, bufferViewArr, byteOffset, uint8ArrayArr) =
             _buildGeometryBufferData(
               geometryComponent,
               (bufferViewArr, byteOffset, uint8ArrayArr),
               (
                 VerticesGeometryMainService.hasVertices,
                 (geometryComponent, state) =>
                   VerticesGeometryMainService.getVertices(.
                     geometryComponent,
                     state,
                   )
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
                   NormalsGeometryMainService.getNormals(.
                     geometryComponent,
                     state,
                   )
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
                   IndicesGeometryMainService.hasIndices16(
                     geometryComponent,
                     state,
                   ) ?
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
             state,
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
         (state, [||], [||], [||], imageAlignedByteLength),
       );

  (
    state,
    geometryArr,
    uint8ArrayArr,
    bufferViewArr,
    bufferViewArr |> Js.Array.length === 0 ?
      imageAlignedByteLength :
      RABUtils.computeBufferViewDataByteLength(bufferViewArr),
  );
};

/* TODO refactor: editor->BuildJsonDataUtils should use this code */
let _convertEventFunctionToStr = eventFunction =>
  SerializeService.serializeFunction(eventFunction);

let _convertEventFunctionDataToStr =
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

let _buildScriptEventFunctionData = ({scriptEventFunctionDataArr}) =>
  scriptEventFunctionDataArr
  |> Js.Array.map(({name, eventFunctionData}) =>
       {
         name,
         eventFunctionDataStr:
           _convertEventFunctionDataToStr(eventFunctionData),
       }
     );

let _convertAttributeToStr = attribute =>
  attribute |> Obj.magic |> Js.Json.stringify;

let _buildScriptAttributeData = ({scriptAttributeDataArr}) =>
  scriptAttributeDataArr
  |> Js.Array.map(({name, attribute}) =>
       {name, attributeStr: _convertAttributeToStr(attribute)}
     );

let buildJsonData = (resourceData, state) => {
  let (
    imageIndexMap,
    imageArr,
    imageBufferViewArr,
    imageUint8ArrayArr,
    imageAlignedByteLength,
  ) =
    _buildImageData(resourceData);

  let (textureIndexMap, textureArr) =
    _buildTextureData(imageIndexMap, resourceData, state);
  let (basicMaterialArr, lightMaterialArr) =
    _buildMaterialData(textureIndexMap, resourceData, state);
  let (
    state,
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
  );
};

let buildJsonUint8Array =
    /* (
         bufferViewArr,
         imageArr,
         textureArr,
         basicMaterialArr,
         lightMaterialArr,
         geometryArr,
         scriptEventFunctionArr,
         scriptAttributeArr,
       ), */
    resourceAssetBundleContent =>
  GenerateABUtils.buildJsonUint8Array(resourceAssetBundleContent);