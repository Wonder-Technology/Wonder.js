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

let _computeBufferViewDataByteLength = bufferViewArr =>
  switch (bufferViewArr |> ArrayService.getLast) {
  | None => 0
  | Some({byteOffset, byteLength}) =>
    byteOffset + BufferUtils.alignedLength(byteLength)
  };

let _setImageIndexMap = (imageDataIndex, imageDataArr, imageIndexMap) => {
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
       imageDataArr |> Js.Array.length,
     );
};

/* TODO test: only save texture used image data */
let _buildImageData = ({textures, imageDataMap}) => {
  let (imageIndexMap, imageDataArr, bufferViewArr, uint8ArrayArr, byteOffset) =
    textures
    |> Js.Array.map(({imageDataIndex}) => imageDataIndex)
    |> WonderCommonlib.ArrayService.removeDuplicateItems
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (
             imageIndexMap,
             imageDataArr,
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
             _setImageIndexMap(imageDataIndex, imageDataArr, imageIndexMap),
             imageDataArr
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
    imageDataArr,
    bufferViewArr,
    uint8ArrayArr,
    _computeBufferViewDataByteLength(bufferViewArr),
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
                  BasicMaterialAPI.getBasicMaterialColor(
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
                  LightMaterialAPI.getLightMaterialDiffuseColor(
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
                  LightMaterialAPI.getLightMaterialShininess(
                    materialComponent,
                    state,
                  ),
              });
         },
         [||],
       );

  (basicMaterialArr, lightMaterialArr);
};

let _getGeometryData =
    (
      geometryComponent,
      (bufferViewArr, byteOffset, arrayBufferArr),
      (hasGeometryPointsFunc, getPointsArrayBufferFunc),
      state,
    ) =>
  hasGeometryPointsFunc(geometryComponent, state) ?
    {
      let arrayBuffer = getPointsArrayBufferFunc(geometryComponent, state);

      let byteLength = arrayBuffer |> ArrayBuffer.byteLength;

      let alignedByteLength = BufferUtils.alignedLength(byteLength);

      (
        bufferViewArr |> Js.Array.length,
        bufferViewArr |> ArrayService.push({byteOffset, byteLength}),
        byteOffset + alignedByteLength,
        arrayBufferArr |> ArrayService.push(arrayBuffer),
      );
    } :
    (
      ABBufferViewUtils.buildNoneBufferViewIndex(),
      bufferViewArr,
      byteOffset,
      arrayBufferArr,
    );

let _buildGeometryData =
    /* imageUint8ArrayMap, */
    (imageAlignedByteLength, imageBufferViewArr, {geometrys}, state) => {
  let imageBufferViewIndex = imageBufferViewArr |> Js.Array.length;

  let (state, geometryArr, arrayBufferArr, bufferViewArr, byteOffset) =
    geometrys
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (state, geometryArr, arrayBufferArr, bufferViewArr, byteOffset),
           geometryComponent,
         ) => {
           let (vertexBufferView, bufferViewArr, byteOffset, arrayBufferArr) =
             _getGeometryData(
               geometryComponent,
               (bufferViewArr, byteOffset, arrayBufferArr),
               (
                 GeometryAPI.hasGeometryVertices,
                 (geometryComponent, state) =>
                   GeometryAPI.getGeometryVertices(geometryComponent, state)
                   |> Float32Array.buffer,
               ),
               state,
             );

           let (normalBufferView, bufferViewArr, byteOffset, arrayBufferArr) =
             _getGeometryData(
               geometryComponent,
               (bufferViewArr, byteOffset, arrayBufferArr),
               (
                 GeometryAPI.hasGeometryNormals,
                 (geometryComponent, state) =>
                   GeometryAPI.getGeometryNormals(geometryComponent, state)
                   |> Float32Array.buffer,
               ),
               state,
             );

           let (texCoordBufferView, bufferViewArr, byteOffset, arrayBufferArr) =
             _getGeometryData(
               geometryComponent,
               (bufferViewArr, byteOffset, arrayBufferArr),
               (
                 GeometryAPI.hasGeometryTexCoords,
                 (geometryComponent, state) =>
                   GeometryAPI.getGeometryTexCoords(geometryComponent, state)
                   |> Float32Array.buffer,
               ),
               state,
             );

           let (indexBufferView, bufferViewArr, byteOffset, arrayBufferArr) =
             _getGeometryData(
               geometryComponent,
               (bufferViewArr, byteOffset, arrayBufferArr),
               (
                 GeometryAPI.hasGeometryIndices,
                 (geometryComponent, state) =>
                   GeometryAPI.hasGeometryIndices16(geometryComponent, state) ?
                     GeometryAPI.getGeometryIndices16(
                       geometryComponent,
                       state,
                     )
                     |> Uint16Array.buffer :
                     GeometryAPI.getGeometryIndices32(
                       geometryComponent,
                       state,
                     )
                     |> Uint32Array.buffer,
               ),
               state,
             );

           (
             state,
             geometryArr
             |> ArrayService.push({
                  name:
                    GeometryAPI.unsafeGetGeometryName(
                      geometryComponent,
                      state,
                    ),
                  vertexBufferView: imageBufferViewIndex + vertexBufferView,
                  normalBufferView: imageBufferViewIndex + normalBufferView,
                  texCoordBufferView:
                    imageBufferViewIndex + texCoordBufferView,
                  indexBufferView: imageBufferViewIndex + indexBufferView,
                }),
             arrayBufferArr,
             bufferViewArr,
             byteOffset,
           );
         },
         (state, [||], [||], [||], imageAlignedByteLength),
       );

  (
    state,
    geometryArr,
    arrayBufferArr,
    bufferViewArr,
    bufferViewArr |> Js.Array.length === 0 ?
      imageAlignedByteLength : _computeBufferViewDataByteLength(bufferViewArr),
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
    imageDataArr,
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
      imageDataArr,
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
    (
      bufferAlignedByteLength,
      (
        bufferViewArr,
        imageDataArr,
        textureArr,
        basicMaterialArr,
        lightMaterialArr,
        geometryArr,
        scriptEventFunctionArr,
        scriptAttributeArr,
      ),
    ) => {
  let encoder = TextEncoder.newTextEncoder();

  encoder
  |> TextEncoder.encodeUint8Array(
       {
         images: imageDataArr,
         textures: textureArr,
         basicMaterials: basicMaterialArr,
         lightMaterials: lightMaterialArr,
         scriptEventFunctions: scriptEventFunctionArr,
         scriptAttributes: scriptAttributeArr,
         geometrys: geometryArr,
         bufferViews: bufferViewArr,
       }
       |> Obj.magic
       |> Js.Json.stringify,
     );
};