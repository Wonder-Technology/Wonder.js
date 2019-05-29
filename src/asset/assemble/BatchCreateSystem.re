open StateDataMainType;

open WDType;

let _checkNotExceedMaxCountByIndex = (maxCount, indexArr) => {
  Array.unsafe_get(indexArr, (indexArr |> Js.Array.length) - 1)
  |> BufferService.checkNotExceedMaxCountByIndex(maxCount)
  |> ignore;
  indexArr;
};

let _batchCreateGameObject = ({gameObjects}, {gameObjectRecord} as state) =>
  ArrayService.range(0, gameObjects.count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (state, uidArr), _) => {
         let (gameObjectRecord, index) =
           CreateGameObjectGameObjectService.create(state.gameObjectRecord);

         state.gameObjectRecord = gameObjectRecord;

         (state, uidArr |> ArrayService.push(index));
       },
       (state, [||]),
     );

let _setDefaultChildren = (indexArr, childMap) =>
  indexArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. childMap, index) =>
         WonderCommonlib.MutableSparseMapService.set(
           index,
           WonderCommonlib.ArrayService.createEmpty(),
           childMap,
         ),
       childMap,
     );

let _initTransformDataWhenCreate =
    (
      indexArr,
      (
        {
          childMap,
          localToWorldMatrices,
          localPositions,
          defaultLocalToWorldMatrix,
          defaultLocalPosition,
        }: TransformType.transformRecord
      ) as transformRecord,
    ) => {
  ...transformRecord,
  childMap: childMap |> _setDefaultChildren(indexArr),
};

let _batchCreateComponent = (components, createFunc, state) =>
  ArrayService.range(0, (components |> Js.Array.length) - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (state, indexArr), _) => {
         let (state, index) = createFunc(. state);

         (state, indexArr |> ArrayService.push(index));
       },
       (state, [||]),
     );

let _batchCreateTransform = ({transforms}, {settingRecord} as state) =>
  _batchCreateComponent(transforms, CreateTransformMainService.create, state);

let _batchCreateGeometry = ({geometrys}, {settingRecord} as state) =>
  geometrys
  |> Obj.magic
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. (state, indexArr), geometry, index) =>
         switch (geometry |> Js.toOption) {
         | None => (state, indexArr |> ArrayService.push(-1))
         | _ =>
           let (state, index) = CreateGeometryMainService.create(. state);
           (state, indexArr |> ArrayService.push(index));
         },
       (state, [||]),
     );

let _batchCreateMeshRenderer = ({meshRenderers}, {settingRecord} as state) =>
  _batchCreateComponent(
    meshRenderers,
    CreateMeshRendererMainService.create,
    state,
  );

let _batchCreateBasicCameraView =
    ({basicCameraViews}, {basicCameraViewRecord} as state) =>
  _batchCreateComponent(
    basicCameraViews,
    CreateBasicCameraViewMainService.create,
    state,
  );

let _batchCreatePerspectiveCameraProjection =
    (
      {perspectiveCameraProjections},
      {perspectiveCameraProjectionRecord} as state,
    ) =>
  _batchCreateComponent(
    perspectiveCameraProjections,
    CreatePerspectiveCameraProjectionMainService.create,
    state,
  );

/* TODO use batch create */
let _createArcballCameraControllerOneByOne =
    ({arcballCameraControllers}, {arcballCameraControllerRecord} as state) =>
  _batchCreateComponent(
    arcballCameraControllers,
    CreateArcballCameraControllerMainService.create,
    state,
  );

let _batchCreateScript = ({scripts}, {scriptRecord} as state) =>
  _batchCreateComponent(scripts, CreateScriptMainService.create, state);

let _batchCreateBasicMaterial = ({basicMaterials}, {settingRecord} as state) =>
  _batchCreateComponent(
    basicMaterials,
    CreateBasicMaterialMainService.create,
    state,
  );

let _batchCreateLightMaterial = ({lightMaterials}, {settingRecord} as state) =>
  _batchCreateComponent(
    lightMaterials,
    CreateLightMaterialMainService.create,
    state,
  );

let _batchCreateBasicSourceTexture =
    ({basicSourceTextures}, {settingRecord} as state) => {
  let basicSourceTextureRecord =
    RecordBasicSourceTextureMainService.getRecord(state);

  basicSourceTextures
  |> ArrayService.reduceOneParamValidi(
       (. (state, indexArr), _, basicSourceTextureIndex) => {
         let (state, index) =
           CreateBasicSourceTextureMainService.create(. state);

         Array.unsafe_set(indexArr, basicSourceTextureIndex, index);

         (state, indexArr);
       },
       (state, [||]),
     );
};

let _batchCreateLightComponent = (components, createFunc, state) =>
  ArrayService.range(0, (components |> Js.Array.length) - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (state, indexArr), _) => {
         let (state, index) = createFunc(state);

         (state, indexArr |> ArrayService.push(index));
       },
       (state, [||]),
     );

let _batchCreateDirectionLight =
    (isRenderLight, {directionLights}, {directionLightRecord} as state) =>
  _batchCreateLightComponent(
    directionLights,
    CreateDirectionLightMainService.create(isRenderLight),
    state,
  );

let _batchCreatePointLight =
    (isRenderLight, {pointLights}, {pointLightRecord} as state) =>
  _batchCreateLightComponent(
    pointLights,
    CreatePointLightMainService.create(isRenderLight),
    state,
  );

let batchCreate = (isRenderLight, wd, state) => {
  let (state, gameObjectArr) = _batchCreateGameObject(wd, state);
  let (state, transformArr) = _batchCreateTransform(wd, state);
  let (state, geometryArr) = _batchCreateGeometry(wd, state);
  let (state, meshRendererArr) = _batchCreateMeshRenderer(wd, state);
  let (state, basicCameraViewArr) = _batchCreateBasicCameraView(wd, state);
  let (state, perspectiveCameraProjectionArr) =
    _batchCreatePerspectiveCameraProjection(wd, state);
  let (state, arcballCameraControllerArr) =
    _createArcballCameraControllerOneByOne(wd, state);
  let (state, basicMaterialArr) = _batchCreateBasicMaterial(wd, state);
  let (state, lightMaterialArr) = _batchCreateLightMaterial(wd, state);
  let (state, basicSourceTextureArr) =
    _batchCreateBasicSourceTexture(wd, state);
  let (state, directionLightArr) =
    _batchCreateDirectionLight(isRenderLight, wd, state);
  let (state, pointLightArr) =
    _batchCreatePointLight(isRenderLight, wd, state);
  let (state, scriptArr) = _batchCreateScript(wd, state);

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
  );
  /* |> WonderLog.Contract.ensureCheck(
       (
         (
           state,
           gameObjectArr,
           (
             transformArr,
             geometryArr,
             basicCameraViewArr,
             perspectiveCameraProjectionArr,
             lightMaterialArr,
             directionLightArr,
             pointLightArr,
           ),
           basicSourceTextureArr,
         ),
       ) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|only has one type texture|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 (
                   basicSourceTextureArr
                   |> Js.Option.isSome
                   && arrayBufferViewSourceTextureArr
                   |> Js.Option.isNone
                   || arrayBufferViewSourceTextureArr
                   |> Js.Option.isSome
                   && basicSourceTextureArr
                   |> Js.Option.isNone
                 )
                 |> assertTrue
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     ); */
};