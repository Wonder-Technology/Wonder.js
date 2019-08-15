let getRootNodeIndexs = ({nodes}: GLTFType.scene) =>
  /* WonderLog.Contract.requireCheck(
       () => {
         open WonderLog;
         open Contract;
         open Operators;

         test(
           Log.buildAssertMessage(
             ~expect={j|scene->nodes exist|j},
             ~actual={j|not|j},
           ),
           () =>
           nodes |> Js.Option.isSome |> assertTrue
         );

         test(
           Log.buildAssertMessage(
             ~expect={j|scene->nodes has only one node|j},
             ~actual={j|not|j},
           ),
           () =>
           nodes |> OptionService.unsafeGet |> Js.Array.length == 1
         );
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     ); */
  nodes |> OptionService.unsafeGet;

let _getDefaultIsRoot = () => true;

let _convertIMGUI = extras: option(SceneGraphType.imgui) =>
  extras |> Js.Option.andThen((. {imgui}: GLTFType.sceneExtras) => imgui);

let _convertSkybox = extras =>
  extras
  |> Js.Option.andThen((. {skybox}: GLTFType.sceneExtras) =>
       switch (skybox) {
       | None => None
       | Some({cubemap}) => Some({cubemap: cubemap}: WDType.skybox)
       }
     );

let _convertIsRoot = extras =>
  switch (extras) {
  | None => _getDefaultIsRoot()
  | Some(({isRoot}: GLTFType.sceneExtras)) =>
    switch (isRoot) {
    | None => _getDefaultIsRoot()
    | Some(isRoot) => isRoot
    }
  };

let convertToScene =
    (
      ambientLightArr: array(WDType.ambientLight),
      {scenes, scene}: GLTFType.gltf,
    )
    : WDType.scene => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(
          ~expect={j|only has one scene|j},
          ~actual={j|not|j},
        ),
        () =>
        scenes |> Js.Array.length == 1
      );

      test(
        Log.buildAssertMessage(
          ~expect={j|has one ambientLight at most|j},
          ~actual={j|not|j},
        ),
        () =>
        ambientLightArr |> Js.Array.length <= 1
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let {nodes, extras}: GLTFType.scene =
    ConvertCommon.getScene(scenes, scene);

  {
    gameObjects: nodes |> OptionService.unsafeGet,
    ambientLight:
      ambientLightArr |> Js.Array.length == 1 ?
        Some({color: ambientLightArr[0].color}) : None,
    imgui: _convertIMGUI(extras),
    skybox: _convertSkybox(extras),
    isRoot: _convertIsRoot(extras),
  };
};