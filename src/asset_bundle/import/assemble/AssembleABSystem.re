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
      DependencyDataUtils.All.readHeader(contentDataView);

    let jsonStr =
      DependencyDataUtils.All.getJsonStr(jsonByteLength, contentArrayBuffer);
    let buffer =
      DependencyDataUtils.All.getBuffer(jsonByteLength, contentArrayBuffer);

    (jsonStr |> Js.Json.parseExn |> Obj.magic, buffer);
  };
};

module SAB = {
  open SABType;

  open WDType;

  open Js.Promise;

  let isSAB = abRelativePath => abRelativePath |> Js.String.includes(".sab");

  let _isImageBufferDataDependencyAndRemoved = ({name, bufferView, mimeType}) =>
    ABBufferViewUtils.isNoneBufferViewIndex(bufferView);

  let _buildImageArray =
      ({images, bufferViews}, binBuffer, allDependencyRAbRelativePath, state) => {
    let blobObjectUrlImageArr = [||];
    /* let imageUint8ArrayDataMap =
       WonderCommonlib.MutableSparseMapService.createEmpty(); */

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
                      OperateRABAssetBundleMainService.unsafeFindDataInAllDependencyRAbByName(
                        allDependencyRAbRelativePath,
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

                        /* imageUint8ArrayDataMap
                           |> WonderCommonlib.MutableSparseMapService.set(
                                imageIndex,
                                (mimeType, Uint8Array.fromBuffer(arrayBuffer)),
                              )
                           |> ignore; */

                        AssembleUtils.buildLoadImageStream(
                          arrayBuffer,
                          mimeType,
                          {j|load image error. imageName: $name|j},
                        )
                        |> WonderBsMost.Most.tap(image =>
                             ImageUtils.setImageName(
                               image,
                               name,
                               /* Array.unsafe_set(
                                    blobObjectUrlImageArr,
                                    imageIndex,
                                    image,
                                  ); */
                             )
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
        binBuffer,
        allDependencyRAbRelativePath,
        state,
        createdGeometryArr,
      ) =>
    geometrys
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           geometryArr,
           /* {name, position, normal, texCoord, index} as geometryData, */
           geometryData,
           geometryIndex,
         ) => {
           let geometry =
             geometryData |> OptionService.isJsonSerializedValueNone ?
               Array.unsafe_get(createdGeometryArr, geometryIndex) :
               {
                 let {name, position, normal, texCoord, index} as geometryData =
                   geometryData |> OptionService.unsafeGetJsonSerializedValue;

                 _isGeometryBufferDataDependencyAndRemoved(geometryData) ?
                   OperateRABAssetBundleMainService.unsafeFindDataInAllDependencyRAbByName(
                     allDependencyRAbRelativePath,
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

  let _checkDependencyGeometryhasVertices =
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
                   _checkDependencyGeometryhasVertices(
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
        {geometrys, indices, gameObjects, basicSourceTextures} as sceneAssetBundleContent,
        blobObjectUrlImageArr,
        bufferArr,
        /* (isBindEvent, isActiveCamera), */
        (
          state,
          gameObjectArr,
          (
            transformArr,
            geometryArr,
            meshRendererArr,
            basicCameraViewArr,
            perspectiveCameraProjectionArr,
            arcballCameraControllerArr,
            basicMaterialArr,
            lightMaterialArr,
            directionLightArr,
            pointLightArr,
            scriptArr,
          ),
          basicSourceTextureArr,
        ),
      ) => {
    let state =
      state
      |> BatchOperateSystem.batchSetNames(
           (gameObjectArr, basicSourceTextureArr),
           (gameObjects, basicSourceTextures),
           (geometrys, geometryArr),
         )
      |> BatchOperateSystem.batchSetIsActive(gameObjectArr, gameObjects)
      |> BatchOperateSystem.batchSetIsRoot(gameObjectArr, gameObjects);

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
      BatchSetTextureAllDataSystem.batchSetFormat(
        basicSourceTextureArr,
        basicSourceTextures,
        state,
      );

    let basicSourceTextureData =
      BatchOperateWholeSystem.getBatchAllTypeTextureData(
        lightMaterialArr,
        basicSourceTextureArr,
        blobObjectUrlImageArr,
        sceneAssetBundleContent,
      );

    /* let imageUint8ArrayDataMap =
       BatchSetWholeTextureAllDataSystem.convertKeyFromImageIndexToBasicSourceTexture(
         indices.imageTextureIndices,
         basicSourceTextureArr,
         imageUint8ArrayDataMap,
       ); */

    (
      state
      |> BatchOperateSystem.batchSetTransformData(
           sceneAssetBundleContent,
           gameObjectTransforms,
         )
      |> BatchOperateSystem.batchSetTransformParent(
           parentTransforms,
           childrenTransforms,
         )
      |> _batchSetGeometryData(
           sceneAssetBundleContent,
           geometryArr,
           bufferArr,
         )
      |> BatchOperateSystem.batchSetBasicCameraViewData(
           sceneAssetBundleContent,
           basicCameraViewArr,
           /* isActiveCamera, */
           true,
         )
      |> BatchOperateSystem.batchSetPerspectiveCameraProjectionData(
           sceneAssetBundleContent,
           perspectiveCameraProjectionArr,
         )
      |> BatchOperateSystem.batchSetArcballCameraControllerData(
           sceneAssetBundleContent,
           arcballCameraControllerArr,
           /* isBindEvent, */
           true,
         )
      |> BatchOperateSystem.batchSetMeshRendererData(
           sceneAssetBundleContent,
           meshRendererArr,
         )
      |> BatchOperateSystem.batchSetBasicMaterialData(
           sceneAssetBundleContent,
           basicMaterialArr,
         )
      |> BatchOperateSystem.batchSetLightMaterialData(
           sceneAssetBundleContent,
           lightMaterialArr,
         )
      |> BatchOperateSystem.batchSetScriptData(
           sceneAssetBundleContent,
           scriptArr,
         )
      |> BatchOperateLightSystem.batchSetDirectionLightData(
           sceneAssetBundleContent,
           directionLightArr,
         )
      |> BatchOperateLightSystem.batchSetPointLightData(
           sceneAssetBundleContent,
           pointLightArr,
         )
      |> BatchOperateLightSystem.setAmbientLightData(sceneAssetBundleContent)
      |> BatchAddGameObjectComponentMainService.batchAddTransformComponentForCreate(
           transformGameObjects,
           gameObjectTransforms,
         )
      |> BatchAddGameObjectComponentMainService.batchAddGeometryComponentForCreate(
           geometryGameObjects,
           gameObjectGeometrys,
         )
      |> BatchAddGameObjectComponentMainService.batchAddBasicCameraViewComponentForCreate(
           basicCameraViewGameObjects,
           gameObjectBasicCameraViews,
         )
      |> BatchAddGameObjectComponentMainService.batchAddPerspectiveCameraProjectionComponentForCreate(
           perspectiveCameraProjectionGameObjects,
           gameObjectPerspectiveCameraProjection,
         )
      |> BatchAddGameObjectComponentMainService.batchAddArcballCameraControllerComponentForCreate(
           arcballCameraControllerGameObjects,
           gameObjectArcballCameraController,
         )
      |> BatchAddGameObjectComponentMainService.batchAddBasicMaterialComponentForCreate(
           basicMaterialGameObjects,
           gameObjectBasicMaterials,
         )
      |> BatchAddGameObjectComponentMainService.batchAddLightMaterialComponentForCreate(
           lightMaterialGameObjects,
           gameObjectLightMaterials,
         )
      |> BatchAddGameObjectComponentMainService.batchAddMeshRendererComponentForCreate(
           meshRendererGameObjects,
           gameObjectMeshRenderers,
         )
      |> BatchAddGameObjectComponentMainService.batchAddDirectionLightComponentForCreate(
           directionLightGameObjects,
           gameObjectDirectionLights,
         )
      |> BatchAddGameObjectComponentMainService.batchAddPointLightComponentForCreate(
           pointLightGameObjects,
           gameObjectPointLights,
         )
      |> BatchAddGameObjectComponentMainService.batchAddScriptComponentForCreate(
           scriptGameObjects,
           gameObjectScripts,
         )
      |> BatchSetWholeTextureAllDataSystem.batchSet(basicSourceTextureData),
      /* imageUint8ArrayDataMap, */
      gameObjectArr,
    );
  };

  let assemble = (sabRelativePath, sab, wholeDependencyRelationMap) => {
    let allDependencyRAbRelativePath =
      FindDependencyDataSystem.findAllDependencyRAbRelativePath(
        sabRelativePath,
        wholeDependencyRelationMap,
      );

    let (sceneAssetBundleContent: SABType.sceneAssetBundleContent, binBuffer) =
      All.getContentData(sab);

    let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);

    _buildImageArray(
      sceneAssetBundleContent,
      binBuffer,
      allDependencyRAbRelativePath,
      state,
    )
    |> then_(blobObjectUrlImageArr => {
         let state =
           StateDataMainService.unsafeGetState(StateDataMain.stateData);

         let imguiData = sceneAssetBundleContent.scene.imgui;
         let hasIMGUIFunc =
           !OptionService.isJsonSerializedValueNone(imguiData);
         let state =
           /* isSetIMGUIFunc && hasIMGUIFunc ? */
           hasIMGUIFunc ?
             state |> SetIMGUIFuncSystem.setIMGUIFunc(sceneAssetBundleContent) :
             state;

         /* let state =
            hasIMGUIFunc ?
              OperateSABAssetBundleMainService.setIMGUIData(
                sabRelativePath,
                imguiData,
                state,
              ) :
              state; */

         let (
           state,
           gameObjectArr,
           (
             transformArr,
             geometryArr,
             meshRendererArr,
             basicCameraViewArr,
             perspectiveCameraProjectionArr,
             arcballCameraControllerArr,
             basicMaterialArr,
             lightMaterialArr,
             directionLightArr,
             pointLightArr,
             scriptArr,
           ),
           basicSourceTextureArr,
         ) =
           state
           |> BatchCreateSystem.batchCreate(
                /* isRenderLight, */
                true,
                sceneAssetBundleContent,
              );

         let geometryArr =
           _replaceCreatedGeometryToDependencyGeometry(
             sceneAssetBundleContent,
             binBuffer,
             allDependencyRAbRelativePath,
             state,
             geometryArr,
           );

         let (state, gameObjectArr) =
           /* state */
           _batchOperate(
             sceneAssetBundleContent,
             /* imageDataTuple, */
             blobObjectUrlImageArr,
             AssembleWholeWDBUtils.buildBufferArray(
               sceneAssetBundleContent.buffers,
               binBuffer,
             ),
             /* _buildBufferArray(buffers, binBuffer), */
             /* (isBindEvent, isActiveCamera), */
             (
               state,
               gameObjectArr,
               (
                 transformArr,
                 geometryArr,
                 meshRendererArr,
                 basicCameraViewArr,
                 perspectiveCameraProjectionArr,
                 arcballCameraControllerArr,
                 basicMaterialArr,
                 lightMaterialArr,
                 directionLightArr,
                 pointLightArr,
                 scriptArr,
               ),
               basicSourceTextureArr,
             ),
           );

         let (state, rootGameObject) =
           BuildRootGameObjectSystem.build(
             sceneAssetBundleContent,
             (state, gameObjectArr),
           );

         StateDataMainService.setState(StateDataMain.stateData, state)
         |> ignore;

         rootGameObject |> resolve;
       })
    |> WonderBsMost.Most.fromPromise;
  };
};

module RAB = {
  let isRAB = abRelativePath => abRelativePath |> Js.String.includes(".rab");

  let _isImageBufferDataDependencyAndRemoved =
      ({name, bufferView, mimeType}: RABType.image) =>
    ABBufferViewUtils.isNoneBufferViewIndex(bufferView);

  let _buildImageData =
      (
        {images, bufferViews}: RABType.resourceAssetBundleContent,
        buffer,
        allDependencyRAbRelativePath,
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
                    OperateRABAssetBundleMainService.unsafeFindDataInAllDependencyRAbByName(
                      allDependencyRAbRelativePath,
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

  let _buildGeometryData =
      (
        {geometrys, bufferViews}: RABType.resourceAssetBundleContent,
        allDependencyRAbRelativePath,
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
                 OperateRABAssetBundleMainService.unsafeFindDataInAllDependencyRAbByName(
                   allDependencyRAbRelativePath,
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
    let allDependencyRAbRelativePath =
      FindDependencyDataSystem.findAllDependencyRAbRelativePath(
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
      allDependencyRAbRelativePath,
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
             allDependencyRAbRelativePath,
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