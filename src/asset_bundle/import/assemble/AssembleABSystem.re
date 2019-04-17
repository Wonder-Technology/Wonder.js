open Js.Typed_array;

open WonderBsMost;

/* TODO finish */
module SAB = {
  let isSAB = abRelativePath => abRelativePath |> Js.String.includes(".sab");

  let assemble = (sabRelativePath, sab, wholeDependencyRelationMap) =>
    Most.empty()
    |> Most.tap(() => {
         let state =
           StateDataMainService.unsafeGetState(StateDataMain.stateData);

         state
         |> OperateSABAssetBundleMainService.markAssembled(sabRelativePath)
         |> StateDataMainService.setState(StateDataMain.stateData)
         |> ignore;
       });
};

module RAB = {
  let isRAB = abRelativePath => abRelativePath |> Js.String.includes(".rab");

  let _getContentData = rab => {
    let dataView = DataViewCommon.create(rab);

    let (byteOffset, manifestJsonByteLength, contentBufferByteLength) =
      GenerateManifestABUtils.RAB.readHeader(dataView);

    let contentArrayBuffer =
      GenerateManifestABUtils.RAB.getContentBuffer(
        manifestJsonByteLength,
        rab,
      );

    let contentDataView = DataViewCommon.create(contentArrayBuffer);

    let (byteOffset, jsonByteLength, bufferByteLength) =
      DependencyDataUtils.RAB.readHeader(contentDataView);

    let jsonStr =
      DependencyDataUtils.RAB.getJsonStr(jsonByteLength, contentArrayBuffer);
    let buffer =
      DependencyDataUtils.RAB.getBuffer(jsonByteLength, contentArrayBuffer);

    let resourceAssetBundleContent: RABType.resourceAssetBundleContent =
      jsonStr |> Js.Json.parseExn |> Obj.magic;

    (resourceAssetBundleContent, buffer);
  };

  let _buildLoadImageStream = (arrayBuffer, mimeType, errorMsg) => {
    let blob = Blob.newBlobFromArrayBuffer(arrayBuffer, mimeType);

    LoadImageSystem.loadBlobImage(blob |> Blob.createObjectURL, errorMsg)
    |> Most.tap(image => Blob.revokeObjectURL(blob));
  };

  let _isImageBufferDataDependencyAndRemoved =
      ({name, bufferView, mimeType}: RABType.image) =>
    ABBufferViewUtils.isNoneBufferViewIndex(bufferView);

  let _buildImageData =
      (
        {images, bufferViews}: RABType.resourceAssetBundleContent,
        buffer,
        allDependencyAbRelativePath,
        state,
      ) =>
    images
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           streamArr,
           ({name, bufferView, mimeType}: RABType.image) as imageData,
           imageIndex,
         ) =>
           streamArr
           |> ArrayService.push(
                _isImageBufferDataDependencyAndRemoved(imageData) ?
                  OperateRABAssetBundleMainService.unsafeFindDataInAllDependencyAbByName(
                    allDependencyAbRelativePath,
                    name,
                    state,
                    OperateRABAssetBundleMainService.findImageByName,
                  )
                  |> Most.just :
                  {
                    let arrayBuffer =
                      ABArrayBufferUtils.RAB.getArrayBufferFromBufferViews(
                        buffer,
                        bufferView,
                        bufferViews,
                      );

                    _buildLoadImageStream(
                      arrayBuffer,
                      mimeType,
                      {j|load image error. imageName: $name|j},
                    );
                  }
                  |> Most.map(image => {
                       ImageUtils.setImageName(image, name);

                       image;
                     })
                  |> Most.map(image =>
                       (
                         image |> ImageType.imageToDomExtendImageElement,
                         /* Uint8Array.fromBuffer(arrayBuffer), */
                         imageIndex,
                         name,
                         /* mimeType, */
                       )
                     ),
              ),
         [||],
       )
    |> Most.mergeArray
    |> Most.reduce(
         ((imageMapByName, imageMapByIndex), (image, imageIndex, name)) => (
           imageMapByName
           |> WonderCommonlib.ImmutableHashMapService.set(name, image),
           imageMapByIndex
           |> WonderCommonlib.ImmutableSparseMapService.set(imageIndex, image),
         ),
         (
           WonderCommonlib.ImmutableHashMapService.createEmpty(),
           WonderCommonlib.ImmutableSparseMapService.createEmpty(),
         ),
       );

  let _buildTextureData =
      (
        {textures}: RABType.resourceAssetBundleContent,
        imageMapByIndex,
        state,
      ) =>
    textures
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (textureMapByName, textureMapByIndex, state),
           {
             source,
             name,
             magFilter,
             minFilter,
             wrapS,
             wrapT,
             format,
             type_,
             flipY,
           }: RABType.texture,
           textureIndex,
         ) => {
           let (state, texture) =
             CreateBasicSourceTextureMainService.create(. state);

           let state =
             state
             |> OperateBasicSourceTextureMainService.setWrapS(texture, wrapS)
             |> OperateBasicSourceTextureMainService.setWrapT(texture, wrapT)
             |> OperateBasicSourceTextureMainService.setMagFilter(
                  texture,
                  magFilter,
                )
             |> OperateBasicSourceTextureMainService.setMinFilter(
                  texture,
                  minFilter,
                )
             |> OperateBasicSourceTextureMainService.setFormat(
                  texture,
                  format,
                )
             |> OperateBasicSourceTextureMainService.setType(texture, type_)
             |> OperateBasicSourceTextureMainService.setFlipY(texture, flipY)
             |> NameBasicMaterialMainService.setName(texture, name)
             |> OperateBasicSourceTextureMainService.setSource(
                  texture,
                  imageMapByIndex
                  |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                       source,
                     ),
                );

           (
             textureMapByName
             |> WonderCommonlib.ImmutableHashMapService.set(name, texture),
             textureMapByIndex
             |> WonderCommonlib.ImmutableSparseMapService.set(
                  textureIndex,
                  texture,
                ),
             state,
           );
         },
         (
           WonderCommonlib.ImmutableHashMapService.createEmpty(),
           WonderCommonlib.ImmutableSparseMapService.createEmpty(),
           state,
         ),
       );

  let _buildBasicMaterialData = (basicMaterials, state) =>
    basicMaterials
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (basicMaterialMap, state), {name, color}: RABType.basicMaterial) => {
           /* materialIndex, */

           let (state, material) =
             CreateBasicMaterialMainService.create(. state);

           let state =
             state
             |> NameBasicMaterialMainService.setName(material, name)
             |> OperateBasicMaterialMainService.setColor(material, color);

           (
             basicMaterialMap
             |> WonderCommonlib.ImmutableHashMapService.set(name, material),
             state,
           );
         },
         (WonderCommonlib.ImmutableHashMapService.createEmpty(), state),
       );

  let _buildLightMaterialData = (lightMaterials, textureMapByIndex, state) =>
    lightMaterials
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (lightMaterialMap, state),
           {name, diffuseColor, diffuseMap, shininess}: RABType.lightMaterial,
         ) => {
           let (state, material) =
             CreateLightMaterialMainService.create(. state);

           let state =
             state
             |> NameLightMaterialMainService.setName(material, name)
             |> OperateLightMaterialMainService.setDiffuseColor(
                  material,
                  diffuseColor,
                )
             |> OperateLightMaterialMainService.setShininess(
                  material,
                  shininess,
                );

           let state =
             OptionService.isJsonSerializedValueNone(diffuseMap) ?
               state :
               {
                 let diffuseMap =
                   diffuseMap |> OptionService.unsafeGetJsonSerializedValue;

                 state
                 |> OperateLightMaterialMainService.setDiffuseMap(
                      material,
                      textureMapByIndex
                      |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                           diffuseMap,
                         ),
                    );
               };

           (
             lightMaterialMap
             |> WonderCommonlib.ImmutableHashMapService.set(name, material),
             state,
           );
         },
         (WonderCommonlib.ImmutableHashMapService.createEmpty(), state),
       );

  let _buildMaterialData =
      (
        {basicMaterials, lightMaterials}: RABType.resourceAssetBundleContent,
        textureMapByIndex,
        state,
      ) => {
    let (basicMaterialMap, state) =
      _buildBasicMaterialData(basicMaterials, state);
    let (lightMaterialMap, state) =
      _buildLightMaterialData(lightMaterials, textureMapByIndex, state);

    (basicMaterialMap, lightMaterialMap, state);
  };

  let _isGeometryBufferDataDependencyAndRemoved =
      (
        {
          name,
          vertexBufferView,
          normalBufferView,
          texCoordBufferView,
          indexBufferView,
        }: RABType.geometry,
      ) =>
    ABBufferViewUtils.isNoneAccessorIndex(vertexBufferView)
    && OptionService.isJsonSerializedValueNone(normalBufferView)
    && OptionService.isJsonSerializedValueNone(texCoordBufferView)
    && ABBufferViewUtils.isNoneAccessorIndex(indexBufferView);

  let _setGeometryDataFromBuffer =
      (
        geometry,
        (buffer, bufferView, bufferViews),
        (convertArrayBufferToPointsFunc, setPointsFunc),
        state,
      ) =>
    ABBufferViewUtils.isNoneBufferViewIndex(bufferView) ?
      state :
      {
        let arrayBuffer =
          ABArrayBufferUtils.RAB.getArrayBufferFromBufferViews(
            buffer,
            bufferView,
            bufferViews,
          );

        setPointsFunc(
          geometry,
          convertArrayBufferToPointsFunc(arrayBuffer),
          state,
        );
      };

  let _buildGeometryData =
      (
        {geometrys, bufferViews}: RABType.resourceAssetBundleContent,
        allDependencyAbRelativePath,
        buffer,
        state,
      ) =>
    geometrys
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (geometryMap, state),
           (
             {
               name,
               indexDataType,
               vertexBufferView,
               normalBufferView,
               texCoordBufferView,
               indexBufferView,
             }: RABType.geometry
           ) as geometryData,
         ) => {
           let (state, geometry) =
             _isGeometryBufferDataDependencyAndRemoved(geometryData) ?
               (
                 state,
                 OperateRABAssetBundleMainService.unsafeFindDataInAllDependencyAbByName(
                   allDependencyAbRelativePath,
                   name,
                   state,
                   OperateRABAssetBundleMainService.findGeometryByName,
                 ),
               ) :
               {
                 let (state, geometry) =
                   CreateGeometryMainService.create(. state);

                 let state =
                   state |> NameGeometryMainService.setName(geometry, name);

                 let state =
                   _setGeometryDataFromBuffer(
                     geometry,
                     (buffer, vertexBufferView, bufferViews),
                     (
                       Float32Array.fromBuffer,
                       VerticesGeometryMainService.setVerticesByTypeArray,
                     ),
                     state,
                   );

                 let state =
                   _setGeometryDataFromBuffer(
                     geometry,
                     (buffer, normalBufferView, bufferViews),
                     (
                       Float32Array.fromBuffer,
                       NormalsGeometryMainService.setNormalsByTypeArray,
                     ),
                     state,
                   );

                 let state =
                   _setGeometryDataFromBuffer(
                     geometry,
                     (buffer, texCoordBufferView, bufferViews),
                     (
                       Float32Array.fromBuffer,
                       TexCoordsGeometryMainService.setTexCoordsByTypeArray,
                     ),
                     state,
                   );

                 let state =
                   _setGeometryDataFromBuffer(
                     geometry,
                     (buffer, indexBufferView, bufferViews),
                     switch (indexDataType) {
                     | RABType.Index16 => (
                         Uint16Array.fromBuffer,
                         IndicesGeometryMainService.setIndicesByUint16Array,
                       )
                     | RABType.Index32 =>
                       (
                         Uint32Array.fromBuffer,
                         IndicesGeometryMainService.setIndicesByUint32Array,
                       )
                       |> Obj.magic
                     },
                     state,
                   );

                 (state, geometry);
                 /* let state =
                    ABBufferViewUtils.isNoneBufferViewIndex(vertexBufferView) ?
                      state :
                      VerticesGeometryMainService.setVerticesByTypeArray(
                        geometry,
                        VerticesGeometryMainService.getVertices(.
                          geometry,
                          state,
                        ),
                        state,
                      );
                       */
               };

           (
             geometryMap
             |> WonderCommonlib.ImmutableHashMapService.set(name, geometry),
             state,
           );
         },
         (WonderCommonlib.ImmutableHashMapService.createEmpty(), state),
       );

  /* TODO refactor: editor use this */
  let _convertEventFunctionDataStrToRecord =
      (eventFunctionDataStr: string): StateDataMainType.eventFunctionData => {
    open StateDataMainType;

    let {init, update, dispose} =
      eventFunctionDataStr |> Js.Json.parseExn |> Obj.magic;

    let initJsonData = init |> Obj.magic;
    let updateJsonData = update |> Obj.magic;
    let disposeJsonData = dispose |> Obj.magic;

    {
      init:
        OptionService.isJsonSerializedValueNone(initJsonData) ?
          None : Some(initJsonData |> SerializeService.deserializeFunction),
      update:
        OptionService.isJsonSerializedValueNone(updateJsonData) ?
          None : Some(updateJsonData |> SerializeService.deserializeFunction),
      dispose:
        OptionService.isJsonSerializedValueNone(disposeJsonData) ?
          None : Some(disposeJsonData |> SerializeService.deserializeFunction),
    };
  };

  let _buildScriptEventFunctionData =
      ({scriptEventFunctions}: RABType.resourceAssetBundleContent, state) =>
    scriptEventFunctions
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (scriptEventFunctionDataMap, state),
           {name, eventFunctionDataStr}: RABType.scriptEventFunction,
         ) => {
           let eventFunctionData =
             _convertEventFunctionDataStrToRecord(eventFunctionDataStr);

           (
             scriptEventFunctionDataMap
             |> WonderCommonlib.ImmutableHashMapService.set(
                  name,
                  eventFunctionData,
                ),
             state,
           );
         },
         (WonderCommonlib.ImmutableHashMapService.createEmpty(), state),
       );

  /* TODO refactor: editor use this */
  let _convertAttributeStrToRecord =
      attributeMapStr: ScriptAttributeType.scriptAttribute =>
    attributeMapStr |> Js.Json.parseExn |> Obj.magic;

  let _buildScriptAttributeData =
      ({scriptAttributes}: RABType.resourceAssetBundleContent, state) =>
    scriptAttributes
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (scriptAttributeMap, state),
           {name, attributeStr}: RABType.scriptAttribute,
         ) => {
           let attribute = _convertAttributeStrToRecord(attributeStr);

           (
             scriptAttributeMap
             |> WonderCommonlib.ImmutableHashMapService.set(name, attribute),
             state,
           );
         },
         (WonderCommonlib.ImmutableHashMapService.createEmpty(), state),
       );

  let assemble = (rabRelativePath, rab, wholeDependencyRelationMap) => {
    let allDependencyAbRelativePath =
      FindDependencyDataSystem.findAllDependencyAbRelativePath(
        rabRelativePath,
        wholeDependencyRelationMap,
      );

    let (resourceAssetBundleContent, buffer) = _getContentData(rab);

    let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);

    _buildImageData(
      resourceAssetBundleContent,
      buffer,
      allDependencyAbRelativePath,
      state,
    )
    |> Most.fromPromise
    |> Most.map(((imageMapByName, imageMapByIndex)) => {
         let state =
           StateDataMainService.unsafeGetState(StateDataMain.stateData);

         let (textureMapByName, textureMapByIndex, state) =
           _buildTextureData(
             resourceAssetBundleContent,
             imageMapByIndex,
             state,
           );

         let (basicMaterialMap, lightMaterialMap, state) =
           _buildMaterialData(
             resourceAssetBundleContent,
             textureMapByIndex,
             state,
           );

         let (geometryMap, state) =
           _buildGeometryData(
             resourceAssetBundleContent,
             allDependencyAbRelativePath,
             buffer,
             state,
           );

         let (scriptEventFunctionDataMap, state) =
           _buildScriptEventFunctionData(resourceAssetBundleContent, state);

         let (scriptAttributeMap, state) =
           _buildScriptAttributeData(resourceAssetBundleContent, state);

         let state =
           OperateRABAssetBundleMainService.setAssembleRABData(
             rabRelativePath,
             (
               imageMapByName,
               textureMapByName,
               basicMaterialMap,
               lightMaterialMap,
               geometryMap,
               scriptEventFunctionDataMap,
               scriptAttributeMap,
             ),
             state,
           );

         state
         |> OperateRABAssetBundleMainService.markAssembled(rabRelativePath)
         |> StateDataMainService.setState(StateDataMain.stateData)
         |> ignore;
       });
  };
};

let assemble = (abRelativePath, ab, wholeDependencyRelationMap) =>
  RAB.isRAB(abRelativePath) ?
    RAB.assemble(abRelativePath, ab, wholeDependencyRelationMap) :
    SAB.isSAB(abRelativePath) ?
      SAB.assemble(abRelativePath, ab, wholeDependencyRelationMap) :
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="assemble",
          ~description={j|unknown abRelativePath: $abRelativePath|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      );

let isAssembled = (abRelativePath, state) =>
  RAB.isRAB(abRelativePath) ?
    OperateRABAssetBundleMainService.isAssembled(abRelativePath, state) :
    SAB.isSAB(abRelativePath) ?
      OperateSABAssetBundleMainService.isAssembled(abRelativePath, state) :
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="isAssembled",
          ~description={j|unknown abRelativePath: $abRelativePath|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      );