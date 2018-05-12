open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test init texture for render worker",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestMainWorkerTool.initWithJobConfig(
              ~sandbox,
              ~buffer=SettingTool.buildBufferConfigStr(),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test render data->init material which is sended to render worker",
        () => {
          let _buildRenderData = (needAddedImageDataArray, needInitedTextureIndexArray) => {
            "operateType": Sinon.matchAny,
            "directionLightData": Sinon.matchAny,
            "pointLightData": Sinon.matchAny,
            "initData": {
              "materialData": Sinon.matchAny,
              "textureData": {
                "needAddedImageDataArray": needAddedImageDataArray,
                "needInitedTextureIndexArray": needInitedTextureIndexArray
              }
            },
            "renderData": Sinon.matchAny
          };
          describe(
            "test send render data to render worker",
            () => {
              let _prepare = (state) => {
                let imageDataArrayBuffer1 = Obj.magic(11);
                let imageDataArrayBuffer2 = Obj.magic(12);
                let (state, context) =
                  InitTextureRenderWorkerTool.prepareState(
                    sandbox,
                    imageDataArrayBuffer1,
                    imageDataArrayBuffer2
                  );
                let (state, gameObject1, (_, map1)) =
                  BasicMaterialTool.createGameObjectWithMap(state);
                let (state, gameObject2, (_, map2)) =
                  BasicMaterialTool.createGameObjectWithMap(state);
                let source1 = TextureTool.buildSource(100, 200);
                let source2 = TextureTool.buildSource(110, 210);
                let state = state |> TextureAPI.setTextureSource(map1, source1);
                let state = state |> TextureAPI.setTextureSource(map2, source2);
                let state = WorkerWorkerTool.setFakeWorkersAndSetState(state);
                let state =
                  state
                  |> GameObjectAPI.initGameObject(gameObject1)
                  |> GameObjectAPI.initGameObject(gameObject2);
                (
                  state,
                  context,
                  (imageDataArrayBuffer1, imageDataArrayBuffer2),
                  (gameObject1, gameObject2),
                  (map1, map2),
                  (source1, source2)
                )
              };
              describe(
                "test send texture data",
                () => {
                  testPromise(
                    "send needAddedImageDataArray, needInitedTextureIndexArray",
                    () => {
                      let (
                        state,
                        context,
                        (imageDataArrayBuffer1, imageDataArrayBuffer2),
                        (gameObject1, gameObject2),
                        (map1, map2),
                        (source1, source2)
                      ) =
                        _prepare();
                      let renderWorker = WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
                      let postMessageToRenderWorker =
                        WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
                      WorkerJobWorkerTool.execMainWorkerJob(
                        ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
                        ~completeFunc=
                          (_) =>
                            postMessageToRenderWorker
                            |> expect
                            |> toCalledWith([|
                                 _buildRenderData(
                                   [|
                                     (imageDataArrayBuffer1, source1##width, source1##height, 0),
                                     (imageDataArrayBuffer2, source2##width, source2##height, 1)
                                   |],
                                   [|map1, map2|]
                                 )
                               |])
                            |> resolve,
                        ()
                      )
                    }
                  );
                  testPromise(
                    "needAddedImageDataArray, needInitedTextureIndexArray shouldn't contain duplicate data",
                    () => {
                      let (
                        state,
                        context,
                        (imageDataArrayBuffer1, imageDataArrayBuffer2),
                        (gameObject1, gameObject2),
                        (map1, map2),
                        (source1, source2)
                      ) =
                        _prepare();
                      let state = state |> TextureAPI.setTextureSource(map1, source1);
                      let state = state |> TextureAPI.setTextureSource(map2, source2);
                      let state =
                        state
                        |> GameObjectAPI.initGameObject(gameObject1)
                        |> GameObjectAPI.initGameObject(gameObject2);
                      let renderWorker = WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
                      let postMessageToRenderWorker =
                        WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
                      WorkerJobWorkerTool.execMainWorkerJob(
                        ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
                        ~completeFunc=
                          (_) =>
                            postMessageToRenderWorker
                            |> expect
                            |> toCalledWith([|
                                 _buildRenderData(
                                   [|
                                     (imageDataArrayBuffer1, source1##width, source1##height, 0),
                                     (imageDataArrayBuffer2, source2##width, source2##height, 1)
                                   |],
                                   [|map1, map2|]
                                 )
                               |])
                            |> resolve,
                        ()
                      )
                    }
                  )
                }
              );
              testPromise(
                "clear textureRecord->needAddedSourceArray, needInitedTextureIndexArray after send",
                () => {
                  open TextureType;
                  let (
                    state,
                    context,
                    (imageDataArrayBuffer1, imageDataArrayBuffer2),
                    (gameObject1, gameObject2),
                    (map1, map2),
                    (source1, source2)
                  ) =
                    _prepare();
                  WorkerJobWorkerTool.execMainWorkerJob(
                    ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
                    ~completeFunc=
                      (state) => {
                        let {needAddedSourceArray, needInitedTextureIndexArray} =
                          TextureTool.getRecord(state);
                        (
                          needAddedSourceArray |> Js.Array.length,
                          needInitedTextureIndexArray |> Js.Array.length
                        )
                        |> expect == (0, 0)
                        |> resolve
                      },
                    ()
                  )
                }
              )
            }
          )
        }
      )
    }
  );