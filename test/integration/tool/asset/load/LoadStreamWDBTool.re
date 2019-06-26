open Js.Promise;

/* let load =
       (
         ~wdbPath,
         ~fetchFunc,
         ~handleWhenDoneFunc=(state, rootGameObject) => state,
         (),
       ) => {
     let result = ref(Obj.magic(1));

     MainStateTool.unsafeGetState()
     |> LoaderManagerSystem.loadStreamWDB(
          wdbPath,
          (fetchFunc, handleWhenDoneFunc),
        )
     /* |> WonderBsMost.Most.forEach(data => result := data) */
     |> WonderBsMost.Most.drain
     |> then_(() => resolve());
   }; */

let load =
    (
      ~wdbPath,
      ~fetchFunc,
      ~handleWhenLoadingFunc=(totalLoadedByteLength, contentLength, wdbPath) =>
                               (),
      ~handleWhenLoadWholeWDBFunc=(state, _, rootGameObject) => (),
      (),
    ) => {
  let result = ref(Obj.magic(1));

  MainStateTool.unsafeGetState()
  |> LoaderManagerSystem.loadStreamWDB(
       wdbPath,
       (
         fetchFunc,
         handleWhenLoadingFunc,
         (state, rootGameObject) => state,
         (state, rootGameObject) => state,
         handleWhenLoadWholeWDBFunc,
       ),
     )
  |> WonderBsMost.Most.drain;
  /* |> WonderBsMost.Most.forEach(data => result := data)
     |> then_(() => result^ |> resolve); */
};

let read =
    (
      (
        default11Image,
        controller,
        handleBeforeStartLoopFunc,
        handleWhenDoneFunc,
      ),
      reader,
    ) =>
  ReadStreamChunkSystem.read(
    (
      default11Image,
      controller,
      /* (contentLength, wdbPath, handleWhenLoadingFunc), */
      (0, "", (totalLoadedByteLength, contentLength, wdbPath) => ()),
      handleBeforeStartLoopFunc,
      handleWhenDoneFunc,
    ),
    ([||], Js.Typed_array.Uint8Array.fromLength(1000000)),
    (
      None,
      [||],
      None,
      0,
      [||],
      WonderCommonlib.MutableSparseMapService.createEmpty(),
    ),
    reader,
  );

let readWithHandleWhenLoadingFunc =
    (
      (
        default11Image,
        controller,
        (contentLength, wdbPath, handleWhenLoadingFunc),
        handleBeforeStartLoopFunc,
        handleWhenDoneFunc,
      ),
      reader,
    ) =>
  ReadStreamChunkSystem.read(
    (
      default11Image,
      controller,
      (contentLength, wdbPath, handleWhenLoadingFunc),
      handleBeforeStartLoopFunc,
      handleWhenDoneFunc,
    ),
    /* ([||], Js.Typed_array.Uint8Array.fromLength(contentLength)), */
    ([||], Js.Typed_array.Uint8Array.fromLength(1000000)),
    (
      None,
      [||],
      None,
      0,
      [||],
      WonderCommonlib.MutableSparseMapService.createEmpty(),
    ),
    reader,
  );

let setImageData = LoadStreamWDBSetBinBufferChunkDataSystem._setImageData;

let getSkyboxCubemapSourceArr = (rootGameObject, state) => {
  let cubemapTexture = SceneTool.unsafeGetCubemapTexture(state);

  [|
    CubemapTextureAPI.unsafeGetCubemapTexturePXSource(cubemapTexture, state),
    CubemapTextureAPI.unsafeGetCubemapTextureNXSource(cubemapTexture, state),
    CubemapTextureAPI.unsafeGetCubemapTexturePYSource(cubemapTexture, state),
    CubemapTextureAPI.unsafeGetCubemapTextureNYSource(cubemapTexture, state),
    CubemapTextureAPI.unsafeGetCubemapTexturePZSource(cubemapTexture, state),
    CubemapTextureAPI.unsafeGetCubemapTextureNZSource(cubemapTexture, state),
  |];
};

let _getAllDiffuseMaps = (rootGameObject, state) =>
  AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state);

let getAllDiffuseMapSources = (rootGameObject, state) =>
  _getAllDiffuseMaps(rootGameObject, state)
  |> Js.Array.map(diffuseMap =>
       BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
         diffuseMap,
         state,
       )
     );

let getSkyboxCubemapSourceArr = (rootGameObject, state) =>
  switch (SceneTool.getCubemapTexture(state)) {
  | None => [||]
  | Some(cubemapTexture) => [|
      CubemapTextureAPI.unsafeGetCubemapTexturePXSource(
        cubemapTexture,
        state,
      ),
      CubemapTextureAPI.unsafeGetCubemapTextureNXSource(
        cubemapTexture,
        state,
      ),
      CubemapTextureAPI.unsafeGetCubemapTexturePYSource(
        cubemapTexture,
        state,
      ),
      CubemapTextureAPI.unsafeGetCubemapTextureNYSource(
        cubemapTexture,
        state,
      ),
      CubemapTextureAPI.unsafeGetCubemapTexturePZSource(
        cubemapTexture,
        state,
      ),
      CubemapTextureAPI.unsafeGetCubemapTextureNZSource(
        cubemapTexture,
        state,
      ),
    |]
  };

let getSkyboxCubemapSourceAndAllDiffuseMapSourcesArr = (rootGameObject, state) =>
  ArrayService.fastConcat(
    getSkyboxCubemapSourceArr(rootGameObject, state),
    getAllDiffuseMapSources(rootGameObject, state),
  );

let createGameObjectWithDiffuseMap = state => {
  let (state, gameObject1, transform1, _) =
    LightMaterialTool.createGameObjectWithDiffuseMap(state);

  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);

  let state =
    state
    |> GameObjectAPI.addGameObjectGeometryComponent(gameObject1, geometry);

  (state, gameObject1, transform1);
};

let prepareStateForSkybox = sandbox =>
  RenderJobsTool.initWithJobConfigWithoutBuildFakeDom(
    sandbox,
    NoWorkerJobConfigTool.buildNoWorkerJobConfig(
      ~initPipelines=
        {|
[
    {
      "name": "default",
      "jobs": [
        {
          "name": "preget_glslData"
        },
        {
          "name": "init_no_material_shader"
        },
        {
          "name": "init_texture"
        },
        {
          "name": "init_skybox"
        }
        ]
    }
]
        |},
      ~initJobs=
        NoWorkerJobConfigTool.buildNoWorkerInitJobConfigWithoutInitMain(),
      ~loopPipelines=
        {|
[
    {
        "name": "default",
        "jobs": [
            {
                "name": "get_camera_data"
            },
            {
                "name": "render_skybox"
            }
        ]
    }
]
        |},
      ~loopJobs=NoWorkerJobConfigTool.buildNoWorkerLoopJobConfig(),
      (),
    ),
  );