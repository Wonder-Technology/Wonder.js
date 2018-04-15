open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test render basic render worker job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "use program",
        () => {
          let _prepare = (sandbox, state) => {
            let (state, _, _, _, _) = RenderBasicJobTool.prepareGameObject(sandbox, state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            state
          };
          let _prepareForUseProgram = (sandbox, state) =>
            RenderJobsTool.prepareForUseProgram(sandbox, _prepare, state);
          testPromise(
            "test",
            () => {
              open StateDataRenderWorkerType;
              open RenderType;
              TestToolMainWorker.initWithJobConfig(
                ~sandbox,
                ~buffer=SettingTool.buildBufferConfigStr(~basicMaterialDataBufferCount=5, ()),
                ()
              );
              let state = MainStateTool.unsafeGetState();
              let state = _prepare(sandbox, state);
              let program = Obj.magic(1);
              let createProgram = createEmptyStubWithJsObjSandbox(sandbox) |> returns(program);
              let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
              let renderConfigRecord = RenderConfigTool.getRecord(state);
              let basicRenderObjectRecord = RenderTool.getBasicRenderObjectRecord(state);
              let basicMaterialRecord = BasicMaterialTool.getRecord(state);
              let {gameObjectRecord, directionLightRecord, pointLightRecord}: StateDataMainType.state = state;
              MainStateTool.setState(state);
              /* let initData = {
                   "data": {
                     "canvas": {
                       "getContext": (_) =>
                         FakeGlToolWorker.buildFakeGl(~sandbox, ~createProgram, ~useProgram, ())
                         |> Obj.magic
                     },
                     "contextConfig": Obj.magic(1),
                     "bufferData": {
                       "transformDataBufferCount":
                         BufferSettingService.unsafeGetBuffer(state.settingRecord).
                           transformDataBufferCount,
                       "basicMaterialDataBufferCount":
                         BufferSettingService.getBasicMaterialDataBufferCount(state.settingRecord)
                     },
                     "transformData": {"buffer": TransformTool.getRecord(state).buffer},
                     "renderConfigData": {
                       "shaders":
                         GetDataRenderConfigService.getShaders(renderConfigRecord)
                         |> Obj.magic
                         |> Js.Json.stringify,
                       "shaderLibs":
                         GetDataRenderConfigService.getShaderLibs(renderConfigRecord)
                         |> Obj.magic
                         |> Js.Json.stringify
                     },
                     "basicMaterialData": {
                       "buffer": basicMaterialRecord.buffer,
                       "index": basicMaterialRecord.index,
                       "disposedIndexArray": basicMaterialRecord.disposedIndexArray,
                       "isSourceInstanceMap":
                         JudgeInstanceMainService.buildMap(
                           basicMaterialRecord.index,
                           RecordBasicMaterialMainService.getRecord(state).gameObjectMap,
                           state.gameObjectRecord
                         )
                     },
                     "directionLightData": {"index": directionLightRecord.index},
                     "pointLightData": {"index": pointLightRecord.index}
                   }
                 }; */
              let initData = {
                "data":
                  SendInitRenderDataMainWorkerJob._buildData(
                    "",
                    {
                      "getContext": (_) =>
                        FakeGlToolWorker.buildFakeGl(~sandbox, ~createProgram, ~useProgram, ())
                        |> Obj.magic
                    },
                    MainStateTool.getStateData()
                  )
              };
              /* WonderLog.Log.print(initData) |> ignore; */
              let concatStreamFuncArray = (dataForfirstStreamFunc, stateData, streamFuncArr) =>
                streamFuncArr
                |> Js.Array.sliceFrom(1)
                |> WonderCommonlib.ArrayService.reduceOneParam(
                     [@bs]
                     (
                       (stream1, streamFunc2) =>
                         stream1 |> Most.concatMap((e) => streamFunc2(e, stateData))
                     ),
                     streamFuncArr[0](Some(dataForfirstStreamFunc |> Obj.magic), stateData)
                   );
              let renderWorkerState = RenderWorkerStateTool.createStateAndSetToStateData();
              renderWorkerState.workerDetectRecord = Some({isUseWorker: true});
              let state =
                state
                |> WorkerJobTool.create(
                     WorkerJobTool.buildWorkerJobConfig(
                       ~mainInitPipelines={|
[
    {
      "name": "default",
      "jobs": [
        {
          "name": "begin_init",
          "link": "merge",
          "jobs": [
            {
              "name": "init"
            }
          ]
        },
        {
          "name": "init",
          "link": "concat",
          "jobs": [
          ]
        },
        {
          "name": "transfer_job_data",
          "link": "merge",
          "jobs": [
          ]
        },
        {
          "name": "frame",
          "link": "concat",
          "jobs": [
            {
              "name": "begin_init"
            }
          ]
        }
      ]
    }
  ]


      |},
                       ~mainLoopPipelines={|
        [
    {
        "name": "default",
        "jobs": [
            {
                "name": "loop",
                "link": "concat",
                "jobs": [
                    {
                        "name": "tick"
                    },
                    {
                        "name": "update_transform"
                    },
                    {
                        "name": "update_camera"
                    },
                    {
                        "name": "get_camera_data"
                    },
                    {
                        "name": "create_basic_render_object_buffer"
                    },
                    {
                        "name": "copy_arraybuffer"
                    }
                ]
            },
            {
                "name": "copy_arraybuffer",
                "link": "concat",
                "jobs": [
                    {
                        "name": "copy_transform"
                    }
                ]
            },
            {
                "name": "frame",
                "link": "merge",
                "jobs": [
                    {
                        "name": "loop"
                    }
                ]
            }
        ]
    }
]
        |},
                       ()
                     )
                   );
              let state = MainStateTool.setState(state);
              MainStateTool.unsafeGetState()
              |> WorkerJobToolWorker.getMainInitJobStream(MainStateTool.getStateData())
              |> Most.drain
              |> then_(
                   (_) =>
                     [|
                       CreateGlRenderWorkerJob.execJob(None),
                       InitTransformRenderWorkerJob.execJob(None),
                       GetRenderConfigDataRenderWorkerJob.execJob(None),
                       PregetGLSLDataRenderWorkerJob.execJob(None),
                       InitBasicMaterialRenderWorkerJob.execJob(None)
                     |]
                     |> concatStreamFuncArray(initData, RenderWorkerStateTool.getStateData())
                     |> Most.drain
                     |> then_(
                          (_) =>
                            MainStateTool.unsafeGetState()
                            |> WorkerJobToolWorker.getMainLoopJobStream(
                                 MainStateTool.getStateData()
                               )
                            |> Most.drain
                            |> then_(
                                 (_) => {
                                   let state = MainStateTool.unsafeGetState();
                                   let {vMatrix, pMatrix, position}: RenderCameraType.renderCameraRecord =
                                     OperateRenderMainService.unsafeGetCameraRecord(state);
                                   let drawData = {
                                     "data":
                                       SendDrawDataMainWorkerJob._buildData(
                                         "",
                                         MainStateTool.getStateData()
                                       )
                                   };
                                   /* let drawData = {
                                         "data": {



                                           "renderData": {


                                      "camera": {vMatrix, pMatrix, position},
                                             "basic": {
                                               "buffer": basicRenderObjectRecord.buffer,
                                               "count": basicRenderObjectRecord.count,
                                               "bufferCount":
                                                 BufferSettingService.getBasicMaterialDataBufferCount(state.settingRecord)
                                             }
                                           }
                                         }
                                       }; */
                                   [|
                                     CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob.execJob(
                                       None
                                     ),
                                     GetCameraDataRenderWorkerJob.execJob(None),
                                     RenderBasicRenderWorkerJob.execJob(None)
                                   |]
                                   |> concatStreamFuncArray(
                                        drawData,
                                        RenderWorkerStateTool.getStateData()
                                      )
                                   |> Most.drain
                                   |> then_(
                                        () =>
                                          useProgram
                                          |> expect
                                          |> toCalledWith([|program|])
                                          |> resolve
                                      )
                                 }
                               )
                        )
                 )
            }
          )
        }
      )
    }
  );