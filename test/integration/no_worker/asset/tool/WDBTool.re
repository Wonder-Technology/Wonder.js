let _createState = sandbox =>
  RenderJobsTool.initWithJobConfigAndBufferConfig(
    sandbox,
    LoopRenderJobTool.buildNoWorkerJobConfig(),
    SettingTool.buildBufferConfigStr(),
  );

let generateWDB = buildWDBGameObjectFunc => {
  open Sinon;

  let sandbox = ref(createSandbox());
  let state = _createState(sandbox);

  let (canvas, context, _) =
    GenerateSceneGraphSystemTool.prepareCanvasForCubemapTexture(sandbox);

  GLBTool.prepare(sandbox^) |> ignore;

  let (state, rootGameObject) = buildWDBGameObjectFunc(state);

  let (state, _, wdbArrayBuffer) =
    GenerateSceneGraphAPI.generateWDB(
      rootGameObject,
      Js.Nullable.return(
        WonderCommonlib.MutableSparseMapService.createEmpty(),
      ),
      state,
    );

  restoreSandbox(refJsObjToSandbox(sandbox^));

  wdbArrayBuffer;
};