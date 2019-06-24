open Js.Typed_array;

open WonderBsMost;

module All = {
  let getContentData = ab => {
    let dataView = DataViewCommon.create(ab);

    let (byteOffset, manifestJsonByteLength, contentBufferByteLength) =
      GenerateManifestABUtils.RABAndSAB.readHeader(dataView);

    let contentArrayBuffer =
      GenerateManifestABUtils.RABAndSAB.getContentBuffer(
        manifestJsonByteLength,
        ab,
      );

    let contentDataView = DataViewCommon.create(contentArrayBuffer);

    let (byteOffset, jsonByteLength, bufferByteLength) =
      GenerateABUtils.readHeader(contentDataView);

    let jsonStr =
      GenerateABUtils.getJsonStr(jsonByteLength, contentArrayBuffer);
    let buffer =
      GenerateABUtils.getBuffer(jsonByteLength, contentArrayBuffer);

    (jsonStr |> Js.Json.parseExn |> Obj.magic, buffer);
  };
};

module SAB = {
  open SABType;

  open WDType;

  open Js.Promise;

  let _isImageBufferDataDependencyAndRemoved = ({name, bufferView, mimeType}) =>
    ABBufferViewUtils.isNoneBufferViewIndex(bufferView);

  let _buildImageArray =
      ({images, bufferViews}, binBuffer, allDependencyRABRelativePath, state) => {
    let blobObjectUrlImageArr = [||];

    images |> OptionService.isJsonSerializedValueNone ?
      blobObjectUrlImageArr |> resolve :
      images
      |> OptionService.unsafeGetJsonSerializedValue
      |> ArrayService.reduceOneParamValidi(
           (.
             streamArr,
             ({name, bufferView, mimeType}: image) as imageData,
             imageIndex,
           ) =>
             streamArr
             |> ArrayService.push(
                  (
                    _isImageBufferDataDependencyAndRemoved(imageData) ?
                      OperateRABAssetBundleMainService.unsafeFindDataInAllDependencyRABByName(
                        allDependencyRABRelativePath,
                        name,
                        state,
                        OperateRABAssetBundleMainService.findImageByName,
                      )
                      |> Most.just :
                      {
                        let arrayBuffer =
                          ABArrayBufferUtils.SAB.getArrayBufferFromBufferViews(
                            binBuffer,
                            bufferView,
                            bufferViews,
                          );

                        AssembleUtils.buildLoadImageStream(
                          arrayBuffer,
                          mimeType,
                          {j|load image error. imageName: $name|j},
                        )
                        |> WonderBsMost.Most.tap(image =>
                             ImageUtils.setImageName(image, name)
                           )
                        |> Most.map(image =>
                             ImageType.imageToDomExtendImageElement(image)
                           );
                      }
                  )
                  |> WonderBsMost.Most.tap(image =>
                       Array.unsafe_set(
                         blobObjectUrlImageArr,
                         imageIndex,
                         image,
                       )
                     ),
                ),
           [||],
         )
      |> WonderBsMost.Most.mergeArray
      |> WonderBsMost.Most.drain
      |> then_(() => blobObjectUrlImageArr |> resolve);
  };

  let _isGeometryBufferDataDependencyAndRemoved =
      ({name, position, normal, texCoord, index}) =>
    ABBufferViewUtils.isNoneAccessorIndex(position)
    && OptionService.isJsonSerializedValueNone(normal)
    && OptionService.isJsonSerializedValueNone(texCoord)
    && ABBufferViewUtils.isNoneAccessorIndex(index);

  let _replaceCreatedGeometryToDependencyGeometry =
      (
        {geometrys, bufferViews, accessors},
        (binBuffer, allDependencyRABRelativePath),
        state,
        createdGeometryArr,
      ) =>
    geometrys
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (. geometryArr, geometryData, geometryIndex) => {
           let geometry =
             geometryData |> OptionService.isJsonSerializedValueNone ?
               Array.unsafe_get(createdGeometryArr, geometryIndex) :
               {
                 let {name, position, normal, texCoord, index} as geometryData =
                   geometryData |> OptionService.unsafeGetJsonSerializedValue;

                 _isGeometryBufferDataDependencyAndRemoved(geometryData) ?
                   OperateRABAssetBundleMainService.unsafeFindDataInAllDependencyRABByName(
                     allDependencyRABRelativePath,
                     name,
                     state,
                     OperateRABAssetBundleMainService.findGeometryByName,
                   ) :
                   Array.unsafe_get(createdGeometryArr, geometryIndex);
               };

           geometryArr |> ArrayService.push(geometry);
         },
         WonderCommonlib.ArrayService.createEmpty(),
       );

  let _checkDependencyGeometryShouldHasVertices =
      (geometryArr, geometryIndex, state) =>
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|dependency geometry has vertices|j},
                  ~actual={j|not|j},
                ),
                () => {
                  let geometry = Array.unsafe_get(geometryArr, geometryIndex);

                  VerticesGeometryMainService.hasVertices(geometry, state)
                  |> assertTrue;
                },
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );

  let _batchSetGeometryData =
      ({geometrys} as sceneAssetBundleContent, geometryArr, bufferArr, state) => {
    let dataViewArr =
      bufferArr |> Js.Array.map(buffer => DataViewCommon.create(buffer));

    geometrys
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (. state, geometryData, geometryIndex) =>
           geometryData |> OptionService.isJsonSerializedValueNone ?
             state :
             {
               let ({position, normal, texCoord, index}: WDType.geometry) as geometryData =
                 geometryData |> OptionService.unsafeGetJsonSerializedValue;

               _isGeometryBufferDataDependencyAndRemoved(geometryData) ?
                 {
                   _checkDependencyGeometryShouldHasVertices(
                     geometryArr,
                     geometryIndex,
                     state,
                   );

                   state;
                 } :
                 {
                   let geometry = Array.unsafe_get(geometryArr, geometryIndex);

                   BatchOperateWholeGeometrySystem.setGeometryData(
                     geometry,
                     sceneAssetBundleContent,
                     dataViewArr,
                     geometryData,
                     state,
                   );
                 };
             },
         state,
       );
  };

  let _batchOperate =
      (
        {geometrys, indices, gameObjects, basicSourceTextures, cubemapTextures} as sceneAssetBundleContent,
        blobObjectUrlImageArr,
        bufferArr,
        (
          state,
          gameObjectArr,
          (
            transformArr,
            geometryArr,
            meshRendererArr,
            basicCameraViewArr,
            perspectiveCameraProjectionArr,
            flyCameraControllerArr,
            arcballCameraControllerArr,
            basicMaterialArr,
            lightMaterialArr,
            directionLightArr,
            pointLightArr,
            scriptArr,
          ),
          (basicSourceTextureArr, cubemapTextureArr),
        ),
      ) => {
    let state =
      BatchOperateSystem.batchSetNamesAndGameObjectIsActiveAndIsRoot(
        sceneAssetBundleContent,
        (
          state,
          gameObjectArr,
          (transformArr, geometryArr),
          (basicSourceTextureArr, cubemapTextureArr),
        ),
      );

    let (
      (
        parentTransforms,
        childrenTransforms,
        transformGameObjects,
        gameObjectTransforms,
        geometryGameObjects,
        gameObjectGeometrys,
        basicCameraViewGameObjects,
        gameObjectBasicCameraViews,
        perspectiveCameraProjectionGameObjects,
        gameObjectPerspectiveCameraProjection,
        flyCameraControllerGameObjects,
        gameObjectFlyCameraController,
        arcballCameraControllerGameObjects,
        gameObjectArcballCameraController,
        basicMaterialGameObjects,
        gameObjectBasicMaterials,
        lightMaterialGameObjects,
        gameObjectLightMaterials,
        meshRendererGameObjects,
        gameObjectMeshRenderers,
        directionLightGameObjects,
        gameObjectDirectionLights,
        pointLightGameObjects,
        gameObjectPointLights,
        scriptGameObjects,
        gameObjectScripts,
      ),
      state,
    ) =
      BatchOperateSystem.getBatchComponentGameObjectData(
        (
          gameObjectArr,
          transformArr,
          geometryArr,
          meshRendererArr,
          basicCameraViewArr,
          perspectiveCameraProjectionArr,
          flyCameraControllerArr,
          arcballCameraControllerArr,
          basicMaterialArr,
          lightMaterialArr,
          directionLightArr,
          pointLightArr,
          scriptArr,
        ),
        indices,
        sceneAssetBundleContent,
        state,
      );

    let state =
      state
      |> BatchSetBasicSourceTextureAllDataSystem.batchSetFormatAndTypeAndFlipY(
           basicSourceTextureArr,
           basicSourceTextures,
         )
      |> BatchSetCubemapTextureAllDataSystem.batchSetFormatAndTypeAndFlipY(
           cubemapTextureArr,
           cubemapTextures,
         );

    let basicSourceTextureData =
      BatchOperateWholeSystem.getBatchAllTypeBasicSourceTextureData(
        lightMaterialArr,
        basicSourceTextureArr,
        blobObjectUrlImageArr,
        sceneAssetBundleContent,
      );

    let cubemapTextureData =
      BatchOperateWholeSystem.getBatchAllTypeCubemapTextureData(
        cubemapTextureArr,
        blobObjectUrlImageArr,
        sceneAssetBundleContent,
      );

    (
      state
      |> BatchOperateSystem.batchSetComponentData(
           sceneAssetBundleContent,
           (true, true),
           (
             transformArr,
             geometryArr,
             meshRendererArr,
             basicCameraViewArr,
             perspectiveCameraProjectionArr,
             flyCameraControllerArr,
             arcballCameraControllerArr,
             basicMaterialArr,
             lightMaterialArr,
             directionLightArr,
             pointLightArr,
             scriptArr,
           ),
           (parentTransforms, childrenTransforms, gameObjectTransforms),
         )
      |> _batchSetGeometryData(
           sceneAssetBundleContent,
           geometryArr,
           bufferArr,
         )
      |> BatchOperateSystem.batchAddComponent(
           sceneAssetBundleContent,
           (
             transformGameObjects,
             gameObjectTransforms,
             geometryGameObjects,
             gameObjectGeometrys,
             basicCameraViewGameObjects,
             gameObjectBasicCameraViews,
             perspectiveCameraProjectionGameObjects,
             gameObjectPerspectiveCameraProjection,
             flyCameraControllerGameObjects,
             gameObjectFlyCameraController,
             arcballCameraControllerGameObjects,
             gameObjectArcballCameraController,
             basicMaterialGameObjects,
             gameObjectBasicMaterials,
             lightMaterialGameObjects,
             gameObjectLightMaterials,
             meshRendererGameObjects,
             gameObjectMeshRenderers,
             directionLightGameObjects,
             gameObjectDirectionLights,
             pointLightGameObjects,
             gameObjectPointLights,
             scriptGameObjects,
             gameObjectScripts,
           ),
         )
      |> BatchAddGameObjectComponentMainService.batchAddGeometryComponentForCreate(
           geometryGameObjects,
           gameObjectGeometrys,
         )
      |> BatchSetWholeBasicSourceTextureAllDataSystem.batchSet(
           basicSourceTextureData,
         )
      |> BatchSetWholeCubemapTextureAllDataSystem.batchSet(cubemapTextureData),
      gameObjectArr,
    );
  };

  let _handleIMGUI = (sceneAssetBundleContent, state) => {
    let imguiData = sceneAssetBundleContent.scene.imgui;
    let hasIMGUIFunc = !OptionService.isJsonSerializedValueNone(imguiData);

    hasIMGUIFunc ?
      state |> SetIMGUIFuncSystem.setIMGUIFunc(sceneAssetBundleContent) :
      state;
  };

  let assemble = (sabRelativePath, sab, wholeDependencyRelationMap) => {
    let allDependencyRABRelativePath =
      FindDependencyDataSystem.findAllDependencyRABRelativePathByDepthSearch(
        sabRelativePath,
        wholeDependencyRelationMap,
      );

    let (sceneAssetBundleContent: SABType.sceneAssetBundleContent, binBuffer) =
      All.getContentData(sab);

    let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);

    _buildImageArray(
      sceneAssetBundleContent,
      binBuffer,
      allDependencyRABRelativePath,
      state,
    )
    |> then_(blobObjectUrlImageArr => {
         let state =
           StateDataMainService.unsafeGetState(StateDataMain.stateData);

         let state = _handleIMGUI(sceneAssetBundleContent, state);

         let (
           state,
           gameObjectArr,
           (
             transformArr,
             geometryArr,
             meshRendererArr,
             basicCameraViewArr,
             perspectiveCameraProjectionArr,
             flyCameraControllerArr,
             arcballCameraControllerArr,
             basicMaterialArr,
             lightMaterialArr,
             directionLightArr,
             pointLightArr,
             scriptArr,
           ),
           (basicSourceTextureArr, cubemapTextureArr),
         ) =
           state
           |> BatchCreateSystem.batchCreate(true, sceneAssetBundleContent);

         let geometryArr =
           _replaceCreatedGeometryToDependencyGeometry(
             sceneAssetBundleContent,
             (binBuffer, allDependencyRABRelativePath),
             state,
             geometryArr,
           );

         let (state, gameObjectArr) =
           _batchOperate(
             sceneAssetBundleContent,
             blobObjectUrlImageArr,
             AssembleWholeWDBUtils.buildBufferArray(
               sceneAssetBundleContent.buffers,
               binBuffer,
             ),
             (
               state,
               gameObjectArr,
               (
                 transformArr,
                 geometryArr,
                 meshRendererArr,
                 basicCameraViewArr,
                 perspectiveCameraProjectionArr,
                 flyCameraControllerArr,
                 arcballCameraControllerArr,
                 basicMaterialArr,
                 lightMaterialArr,
                 directionLightArr,
                 pointLightArr,
                 scriptArr,
               ),
               (basicSourceTextureArr, cubemapTextureArr),
             ),
           );

         let state =
           SetSkyboxSystem.setSkybox(
             sceneAssetBundleContent,
             cubemapTextureArr,
             state,
           );

         let (state, rootGameObject) =
           BuildRootGameObjectSystem.build(
             sceneAssetBundleContent,
             (state, gameObjectArr),
           );

         state
         |> OperateSABAssetBundleMainService.markAssembled(sabRelativePath)
         |> StateDataMainService.setState(StateDataMain.stateData)
         |> ignore;

         rootGameObject |> resolve;
       })
    |> WonderBsMost.Most.fromPromise;
  };
};

module RAB = {
  let _isImageBufferDataDependencyAndRemoved =
      ({name, bufferView, mimeType}: RABType.image) =>
    ABBufferViewUtils.isNoneBufferViewIndex(bufferView);

  let _buildImageData =
      (
        {images, bufferViews}: RABType.resourceAssetBundleContent,
        buffer,
        allDependencyRABRelativePath,
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
                (
                  _isImageBufferDataDependencyAndRemoved(imageData) ?
                    OperateRABAssetBundleMainService.unsafeFindDataInAllDependencyRABByName(
                      allDependencyRABRelativePath,
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

                      AssembleUtils.buildLoadImageStream(
                        arrayBuffer,
                        mimeType,
                        {j|load image error. imageName: $name|j},
                      )
                      |> Most.map(image => {
                           ImageUtils.setImageName(image, name);

                           ImageType.imageToDomExtendImageElement(image);
                         });
                    }
                )
                |> Most.map(image => (image, imageIndex, name)),
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
             |> NameBasicSourceTextureMainService.setName(texture, name)
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
    ABBufferViewUtils.isNoneBufferViewIndex(vertexBufferView)
    && ABBufferViewUtils.isNoneBufferViewIndex(normalBufferView)
    && ABBufferViewUtils.isNoneBufferViewIndex(texCoordBufferView)
    && ABBufferViewUtils.isNoneBufferViewIndex(indexBufferView);

  let _setGeometryDataFromBuffer =
      (
        geometry,
        (buffer, bufferView, bufferViews),
        (convertArrayBufferToPointsFunc, setPointsFunc),
        state,
      ) => {
    let arrayBuffer =
      ABBufferViewUtils.isNoneBufferViewIndex(bufferView) ?
        ArrayBuffer.make(0) :
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

  let _setGeometryAllPointDataFromBuffer =
      (
        geometry,
        (
          buffer,
          (
            vertexBufferView,
            normalBufferView,
            texCoordBufferView,
            indexBufferView,
          ),
          bufferViews,
        ),
        indexDataType,
        state,
      ) => {
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

    state;
  };

  let _buildGeometryData =
      (
        {geometrys, bufferViews}: RABType.resourceAssetBundleContent,
        allDependencyRABRelativePath,
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
                 OperateRABAssetBundleMainService.unsafeFindDataInAllDependencyRABByName(
                   allDependencyRABRelativePath,
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
                   _setGeometryAllPointDataFromBuffer(
                     geometry,
                     (
                       buffer,
                       (
                         vertexBufferView,
                         normalBufferView,
                         texCoordBufferView,
                         indexBufferView,
                       ),
                       bufferViews,
                     ),
                     indexDataType,
                     state,
                   );

                 (state, geometry);
               };

           (
             geometryMap
             |> WonderCommonlib.ImmutableHashMapService.set(name, geometry),
             state,
           );
         },
         (WonderCommonlib.ImmutableHashMapService.createEmpty(), state),
       );

  let convertEventFunctionDataStrToRecord =
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
             convertEventFunctionDataStrToRecord(eventFunctionDataStr);

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

  let convertAttributeStrToRecord =
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
           let attribute = convertAttributeStrToRecord(attributeStr);

           (
             scriptAttributeMap
             |> WonderCommonlib.ImmutableHashMapService.set(name, attribute),
             state,
           );
         },
         (WonderCommonlib.ImmutableHashMapService.createEmpty(), state),
       );

  let assemble = (rabRelativePath, rab, wholeDependencyRelationMap) => {
    let allDependencyRABRelativePath =
      FindDependencyDataSystem.findAllDependencyRABRelativePathByDepthSearch(
        rabRelativePath,
        wholeDependencyRelationMap,
      );

    let (
      resourceAssetBundleContent: RABType.resourceAssetBundleContent,
      buffer,
    ) =
      All.getContentData(rab);

    let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);

    _buildImageData(
      resourceAssetBundleContent,
      buffer,
      allDependencyRABRelativePath,
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
             allDependencyRABRelativePath,
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