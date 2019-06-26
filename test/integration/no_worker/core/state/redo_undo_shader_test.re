open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test redo,undo shader data", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    let _prepareShaderData = state => {
      let record = ShaderTool.getShaderRecord(state);
      let shaderIndex1 = 0;
      let shaderIndex2 = 1;
      record.index = 2;
      record.shaderLibShaderIndexMap
      |> WonderCommonlib.MutableHashMapService.set("key1", shaderIndex1)
      |> ignore;
      record.shaderLibShaderIndexMap
      |> WonderCommonlib.MutableHashMapService.set("key2", shaderIndex2)
      |> ignore;
      (state, shaderIndex1, shaderIndex2);
    };
    let _prepareProgramData = state => {
      let record = ProgramTool.getProgramRecord(state);
      let shaderIndex1 = 0;
      let program1 = Obj.magic(11);
      record.programMap
      |> WonderCommonlib.MutableSparseMapService.set(shaderIndex1, program1)
      |> ignore;
      record.lastUsedProgram = program1;
      (state, shaderIndex1, program1);
    };
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestTool.initWithJobConfig(
          ~sandbox,
          ~noWorkerJobRecord=InitRenderJobTool.buildNoWorkerJobConfig(),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("deepCopyForRestore", () => {
      describe("deep copy shader record", () =>
        test("deep copy materialsMap", () => {
          open AllShaderType;

          let {materialsMap} = ShaderTool.getShaderRecord(state^);

          let shaderIndex = 0;

          let originMaterialArr = [|1|];
          let copiedOriginMaterialArr = originMaterialArr |> Js.Array.copy;
          materialsMap
          |> WonderCommonlib.MutableSparseMapService.set(
               shaderIndex,
               originMaterialArr,
             )
          |> ignore;
          let copiedState = MainStateTool.deepCopyForRestore(state^);

          let {materialsMap} = ShaderTool.getShaderRecord(copiedState);
          let arr =
            materialsMap
            |> WonderCommonlib.MutableSparseMapService.unsafeGet(shaderIndex);
          Array.unsafe_set(arr, 0, 2);

          let {materialsMap} = ShaderTool.getShaderRecord(state^);
          materialsMap
          |> WonderCommonlib.MutableSparseMapService.unsafeGet(shaderIndex)
          |> expect == copiedOriginMaterialArr;
        })
      );

      describe("deep copy glsl sender record", () => {
        test(
          "copy all send data maps",
          () => {
            open StateDataMainType;

            let {
              attributeSendDataMap,
              instanceAttributeSendDataMap,
              uniformRenderObjectSendModelDataMap,
              uniformRenderObjectSendMaterialDataMap,
              uniformShaderSendNoCachableDataMap,
              uniformShaderSendCachableDataMap,
              uniformShaderSendCachableFunctionDataMap,
              uniformInstanceSendNoCachableDataMap,
              uniformNoMaterialShaderSendCachableDataMap,
            }: AllGLSLSenderType.glslSenderRecord =
              state^.glslSenderRecord;

            let copiedState = MainStateTool.deepCopyForRestore(state^);

            let shaderIndex = 10;
            let data = Obj.magic(100);

            attributeSendDataMap
            |> WonderCommonlib.MutableSparseMapService.set(shaderIndex, data)
            |> ignore;
            instanceAttributeSendDataMap
            |> WonderCommonlib.MutableSparseMapService.set(shaderIndex, data)
            |> ignore;
            uniformRenderObjectSendModelDataMap
            |> WonderCommonlib.MutableSparseMapService.set(shaderIndex, data)
            |> ignore;
            uniformRenderObjectSendMaterialDataMap
            |> WonderCommonlib.MutableSparseMapService.set(shaderIndex, data)
            |> ignore;
            uniformShaderSendNoCachableDataMap
            |> WonderCommonlib.MutableSparseMapService.set(shaderIndex, data)
            |> ignore;

            uniformShaderSendCachableDataMap
            |> WonderCommonlib.MutableSparseMapService.set(shaderIndex, data)
            |> ignore;

            uniformShaderSendCachableFunctionDataMap
            |> WonderCommonlib.MutableSparseMapService.set(shaderIndex, data)
            |> ignore;

            uniformInstanceSendNoCachableDataMap
            |> WonderCommonlib.MutableSparseMapService.set(shaderIndex, data)
            |> ignore;

            uniformNoMaterialShaderSendCachableDataMap
            |> WonderCommonlib.MutableSparseMapService.set(shaderIndex, data)
            |> ignore;

            let {
              attributeSendDataMap,
              instanceAttributeSendDataMap,
              uniformRenderObjectSendModelDataMap,
              uniformRenderObjectSendMaterialDataMap,
              uniformShaderSendNoCachableDataMap,
              uniformShaderSendCachableDataMap,
              uniformShaderSendCachableFunctionDataMap,
              uniformInstanceSendNoCachableDataMap,
              uniformNoMaterialShaderSendCachableDataMap,
            }: AllGLSLSenderType.glslSenderRecord =
              copiedState.glslSenderRecord;

            (
              attributeSendDataMap
              |> WonderCommonlib.MutableSparseMapService.has(shaderIndex),
              instanceAttributeSendDataMap
              |> WonderCommonlib.MutableSparseMapService.has(shaderIndex),
              uniformRenderObjectSendModelDataMap
              |> WonderCommonlib.MutableSparseMapService.has(shaderIndex),
              uniformRenderObjectSendMaterialDataMap
              |> WonderCommonlib.MutableSparseMapService.has(shaderIndex),
              uniformShaderSendNoCachableDataMap
              |> WonderCommonlib.MutableSparseMapService.has(shaderIndex),
              uniformShaderSendCachableDataMap
              |> WonderCommonlib.MutableSparseMapService.has(shaderIndex),
              uniformShaderSendCachableFunctionDataMap
              |> WonderCommonlib.MutableSparseMapService.has(shaderIndex),
              uniformInstanceSendNoCachableDataMap
              |> WonderCommonlib.MutableSparseMapService.has(shaderIndex),
              uniformNoMaterialShaderSendCachableDataMap
              |> WonderCommonlib.MutableSparseMapService.has(shaderIndex),
            )
            |>
            expect == (
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                      );
          },
        );
        test("not copy uniformCacheMap", () => {
          open StateDataMainType;

          let {uniformCacheMap}: AllGLSLSenderType.glslSenderRecord =
            state^.glslSenderRecord;

          let copiedState = MainStateTool.deepCopyForRestore(state^);

          let shaderIndex = 10;
          let data = Obj.magic(100);

          uniformCacheMap
          |> WonderCommonlib.MutableSparseMapService.set(shaderIndex, data)
          |> ignore;

          let {uniformCacheMap}: AllGLSLSenderType.glslSenderRecord =
            copiedState.glslSenderRecord;

          uniformCacheMap
          |> WonderCommonlib.MutableSparseMapService.has(shaderIndex)
          |> expect == true;
        });
        test("not copy vertexAttribHistoryArray, lastSendMaterialData", () => {
          open StateDataMainType;

          let (
                {vertexAttribHistoryArray, lastSendMaterialData}: AllGLSLSenderType.glslSenderRecord
              ) as record =
            state^.glslSenderRecord;

          let copiedState = MainStateTool.deepCopyForRestore(state^);

          let shaderIndex = 10;
          let data = Obj.magic(100);

          vertexAttribHistoryArray |> Js.Array.push(data) |> ignore;

          record.lastSendMaterialData = Some(data);

          let {vertexAttribHistoryArray, lastSendMaterialData}: AllGLSLSenderType.glslSenderRecord =
            copiedState.glslSenderRecord;

          (vertexAttribHistoryArray |> Js.Array.length, lastSendMaterialData)
          |> expect == (1, None);
        });
      });
    });

    describe("restore", () => {
      describe("restore glsl sender data to target state", () => {
        let _prepareGLSLSenderData = state => {
          open StateDataMainType;
          let {attributeSendDataMap, vertexAttribHistoryArray}: AllGLSLSenderType.glslSenderRecord =
            state.glslSenderRecord;
          let shaderIndex1 = 0;
          let data1 = Obj.magic(0);
          let func1 = Obj.magic(1);
          let history1 = Obj.magic(2);
          attributeSendDataMap
          |> WonderCommonlib.MutableSparseMapService.set(shaderIndex1, data1)
          |> ignore;
          vertexAttribHistoryArray
          |> Array.unsafe_set(_, shaderIndex1, history1)
          |> ignore;
          (state, shaderIndex1, data1, func1, history1);
        };

        test("clear last send data", () => {
          let (state, shaderIndex1, data1, func1, history1) =
            _prepareGLSLSenderData(state^);
          let (currentState, _, _, _, _) =
            _prepareGLSLSenderData(
              MainStateTool.createNewCompleteState(sandbox),
            );
          let newState = MainStateTool.restore(currentState, state);
          /* let {lastSendMaterialData, lastSendGeometryData}: AllGLSLSenderType.glslSenderRecord = */
          let {lastSendMaterialData}: AllGLSLSenderType.glslSenderRecord =
            newState |> GLSLSenderTool.getGLSLSenderRecord;
          lastSendMaterialData |> expect == None;
        });
        test("clear vertexAttribHistoryArray", () => {
          open StateDataMainType;
          let (state, shaderIndex1, data1, func1, history1) =
            _prepareGLSLSenderData(state^);
          let (currentState, _, _, _, _) =
            _prepareGLSLSenderData(
              MainStateTool.createNewCompleteState(sandbox),
            );
          let newState = MainStateTool.restore(currentState, state);
          let {vertexAttribHistoryArray}: AllGLSLSenderType.glslSenderRecord =
            newState |> GLSLSenderTool.getGLSLSenderRecord;
          vertexAttribHistoryArray
          |> expect == WonderCommonlib.ArrayService.createEmpty();
        });
      });
      describe("restore shader data to target state", () =>
        describe("contract check", () =>
          test(
            "currentState and targetState ->glslRecord->precision should be the same",
            () => {
            open AllShaderType;
            let (state, shaderIndex1, shaderIndex2) =
              _prepareShaderData(state^);
            let currentState = MainStateTool.createNewCompleteState(sandbox);
            TestTool.openContractCheck();
            currentState.glslRecord.precision = Some("aaa");
            expect(() => {
              let _ = MainStateTool.restore(currentState, state);
              ();
            })
            |> toThrowMessage(
                 "expect currentState->glslRecord->precision and targetState->glslRecord->precision be the same, but actual not",
               );
          })
        )
      );
      describe("restore program data to target state", () =>
        test("clear lastUsedProgram", () => {
          open AllProgramType;
          let (state, shaderIndex1, program1) = _prepareProgramData(state^);
          let (currentState, _, _) =
            _prepareProgramData(
              MainStateTool.createNewCompleteState(sandbox),
            );
          let newState = MainStateTool.restore(currentState, state);
          let {lastUsedProgram} = newState |> ProgramTool.getProgramRecord;
          lastUsedProgram |> expect == None;
        })
      );
      describe("restore gpu shader related data to target state", () => {
        describe("test init shader", () => {
          let _prepareBasicMaterialGameObject = (sandbox, state) => {
            open GameObjectAPI;
            open GameObjectAPI;
            open BasicMaterialAPI;
            open Sinon;
            let (state, material) = createBasicMaterial(state);
            let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
            let (state, gameObject) = state |> createGameObject;
            let state =
              state
              |> addGameObjectBasicMaterialComponent(gameObject, material)
              |> addGameObjectGeometryComponent(gameObject, geometry);
            (state, gameObject);
          };
          let _prepareInstanceGameObject = (sandbox, state) => {
            open GameObjectAPI;
            open GameObjectAPI;
            open BasicMaterialAPI;
            open Sinon;
            let (state, material) = createBasicMaterial(state);
            let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
            let (state, gameObject) = state |> createGameObject;
            let (state, sourceInstance) =
              SourceInstanceAPI.createSourceInstance(state);
            let state =
              state
              |> addGameObjectSourceInstanceComponent(
                   gameObject,
                   sourceInstance,
                 )
              |> addGameObjectBasicMaterialComponent(gameObject, material)
              |> addGameObjectGeometryComponent(gameObject, geometry);
            (state, gameObject);
          };
          let _exec = (currentState, copiedState, gameObject) => {
            let currentStateCreateProgram =
              createEmptyStubWithJsObjSandbox(sandbox);
            let currentState =
              currentState
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~createProgram=currentStateCreateProgram,
                     (),
                   ),
                 );
            let currentState =
              currentState |> GameObjectTool.initGameObject(gameObject);
            let initShaderCount = getCallCount(currentStateCreateProgram);
            let _ = MainStateTool.restore(currentState, copiedState);
            (currentStateCreateProgram, initShaderCount);
          };
          test(
            "if targetState->shader not exist in currentState->shader, not init it",
            () => {
            let (state, _) = _prepareInstanceGameObject(sandbox, state^);
            let state =
              state
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let state = state |> InitRenderJobTool.exec;
            let copiedState = MainStateTool.deepCopyForRestore(state);
            let currentState =
              MainStateTool.createNewCompleteStateWithRenderConfig(sandbox);
            let (currentState, gameObject) =
              _prepareBasicMaterialGameObject(sandbox, currentState);
            let (currentStateCreateProgram, initShaderCount) =
              _exec(currentState, copiedState, gameObject);
            getCallCount(currentStateCreateProgram)
            |> expect == initShaderCount;
          });
          describe("else, not init it", () =>
            describe("fix bug", () =>
              test("test create gameObject which has no material", () => {
                let (state, _) = _prepareInstanceGameObject(sandbox, state^);
                let (state, _, _) = GameObjectTool.createGameObject(state);
                let (state, gameObject) =
                  _prepareBasicMaterialGameObject(sandbox, state);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ()),
                     );
                let state = state |> InitRenderJobTool.exec;
                let copiedState = MainStateTool.deepCopyForRestore(state);
                let currentState = state;
                let (currentState, gameObject) =
                  _prepareBasicMaterialGameObject(sandbox, currentState);
                let (currentStateCreateProgram, initShaderCount) =
                  _exec(currentState, copiedState, gameObject);
                getCallCount(currentStateCreateProgram)
                |> expect == initShaderCount;
              })
            )
          );
        });
        describe("test restore data", () => {
          let _prepareState1 = state => {
            open AllShaderType;
            open AllGLSLLocationType;
            open AllProgramType;
            open StateDataMainType;
            let shaderIndex1 = 0;
            let shaderIndex2 = 1;
            let shaderIndex3 = 2;
            let {shaderLibShaderIndexMap} as record =
              ShaderTool.getShaderRecord(state);
            record.index = 3;
            shaderLibShaderIndexMap
            |> WonderCommonlib.MutableHashMapService.set(
                 "key1",
                 shaderIndex1,
               )
            |> WonderCommonlib.MutableHashMapService.set(
                 "key2",
                 shaderIndex2,
               )
            |> WonderCommonlib.MutableHashMapService.set(
                 "key3",
                 shaderIndex3,
               )
            |> ignore;
            let {programMap} as record = ProgramTool.getProgramRecord(state);
            let program1 = Obj.magic(11);
            let program2 = Obj.magic(12);
            programMap
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex1,
                 program1,
               )
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex2,
                 program2,
               )
            |> ignore;
            record.lastUsedProgram = program2;
            let {attributeLocationMap, uniformLocationMap} =
              GLSLLocationTool.getGLSLLocationRecord(state);
            let attributeLocationData1 = Obj.magic(21);
            let attributeLocationData2 = Obj.magic(22);
            let uniformLocationData1 = Obj.magic(31);
            let uniformLocationData2 = Obj.magic(32);
            attributeLocationMap
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex1,
                 attributeLocationData1,
               )
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex2,
                 attributeLocationData2,
               )
            |> ignore;
            uniformLocationMap
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex1,
                 uniformLocationData1,
               )
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex2,
                 uniformLocationData2,
               )
            |> ignore;
            let {uniformShaderSendNoCachableDataMap}: AllGLSLSenderType.glslSenderRecord =
              state.glslSenderRecord;
            let uniformShaderSendNoCachableData1 = Obj.magic(121);
            let uniformShaderSendNoCachableData2 = Obj.magic(122);
            uniformShaderSendNoCachableDataMap
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex1,
                 uniformShaderSendNoCachableData1,
               )
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex2,
                 uniformShaderSendNoCachableData2,
               )
            |> ignore;
            (
              state,
              (shaderIndex1, shaderIndex2),
              (program1, program2),
              (
                attributeLocationData1,
                attributeLocationData2,
                uniformLocationData1,
                uniformLocationData2,
              ),
              (
                uniformShaderSendNoCachableData1,
                uniformShaderSendNoCachableData2,
              ),
            );
          };
          let _prepareState2 = state => {
            open StateDataMainType;
            open AllShaderType;
            open AllGLSLLocationType;
            open AllProgramType;
            open AllGLSLSenderType;
            let shaderIndex1 = 3;
            let shaderIndex2 = 4;
            let {shaderLibShaderIndexMap} as record =
              ShaderTool.getShaderRecord(state);
            record.index = 2;
            shaderLibShaderIndexMap
            |> WonderCommonlib.MutableHashMapService.set(
                 "key1",
                 shaderIndex1,
               )
            |> WonderCommonlib.MutableHashMapService.set(
                 "key4",
                 shaderIndex2,
               )
            |> ignore;
            let {programMap} as record = ProgramTool.getProgramRecord(state);
            let program1 = Obj.magic(101);
            let program2 = Obj.magic(102);
            programMap
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex1,
                 program1,
               )
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex2,
                 program2,
               )
            |> ignore;
            record.lastUsedProgram = program2;
            let {attributeLocationMap, uniformLocationMap} =
              GLSLLocationTool.getGLSLLocationRecord(state);
            let attributeLocationData1 = Obj.magic(201);
            let attributeLocationData2 = Obj.magic(202);
            let uniformLocationData1 = Obj.magic(301);
            let uniformLocationData2 = Obj.magic(302);
            attributeLocationMap
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex1,
                 attributeLocationData1,
               )
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex2,
                 attributeLocationData2,
               )
            |> ignore;
            uniformLocationMap
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex1,
                 uniformLocationData1,
               )
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex2,
                 uniformLocationData2,
               )
            |> ignore;
            let {uniformShaderSendNoCachableDataMap}: AllGLSLSenderType.glslSenderRecord =
              state.glslSenderRecord;
            let uniformShaderSendNoCachableData1 = Obj.magic(10221);
            let uniformShaderSendNoCachableData2 = Obj.magic(10222);
            uniformShaderSendNoCachableDataMap
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex1,
                 uniformShaderSendNoCachableData1,
               )
            |> WonderCommonlib.MutableSparseMapService.set(
                 shaderIndex2,
                 uniformShaderSendNoCachableData2,
               )
            |> ignore;
            (
              state,
              (shaderIndex1, shaderIndex2),
              (program1, program2),
              (
                attributeLocationData1,
                attributeLocationData2,
                uniformLocationData1,
                uniformLocationData2,
              ),
              (
                uniformShaderSendNoCachableData1,
                uniformShaderSendNoCachableData2,
              ),
            );
          };
          let _prepare = state => {
            let (
              targetState,
              targetShaderIndexTuple,
              targetProgramTuple,
              targetLocationTuple,
              targetSenderTuple,
            ) =
              _prepareState1(state);
            let (
              currentState,
              currentShaderIndexTuple,
              currentProgramTuple,
              currentLocationTuple,
              currentSenderTuple,
            ) =
              _prepareState2(MainStateTool.createNewCompleteState(sandbox));
            let newState = MainStateTool.restore(currentState, targetState);
            (
              newState,
              (
                currentState,
                currentShaderIndexTuple,
                currentProgramTuple,
                currentLocationTuple,
                currentSenderTuple,
              ),
              (
                targetState,
                targetShaderIndexTuple,
                targetProgramTuple,
                targetLocationTuple,
                targetSenderTuple,
              ),
            );
          };
          describe("test restore shader data", () => {
            describe("test index", () =>
              test("index should be big one", () => {
                open AllShaderType;
                let (
                  newState,
                  (currentState, _, _, _, _),
                  (targetState, _, _, _, _),
                ) =
                  _prepare(state^);
                let {index} = newState |> ShaderTool.getShaderRecord;
                index
                |>
                expect == Js.Math.max_int(
                            ShaderTool.getShaderRecord(currentState).index,
                            ShaderTool.getShaderRecord(targetState).index,
                          );
              })
            );
            describe("test shaderLibShaderIndexMap", () =>
              test("should be target state's one", () => {
                open AllShaderType;
                let (
                  newState,
                  (
                    currentState,
                    (currentShaderIndex1, currentShaderIndex2),
                    currentProgramTuple,
                    currentLocationTuple,
                    _,
                  ),
                  (
                    targetState,
                    (targetShaderIndex1, targetShaderIndex2),
                    targetProgramTuple,
                    targetLocationTuple,
                    _,
                  ),
                ) =
                  _prepare(state^);
                let {shaderLibShaderIndexMap} =
                  newState |> ShaderTool.getShaderRecord;
                shaderLibShaderIndexMap
                |>
                expect == ShaderTool.getShaderRecord(targetState).
                            shaderLibShaderIndexMap;
              })
            );
          });
          describe("test restore program data", () =>
            describe("test programMap", () =>
              test("should be target state's one", () => {
                open AllProgramType;
                let (
                  newState,
                  (
                    currentState,
                    (currentShaderIndex1, currentShaderIndex2),
                    (currentProgram1, currentProgram2),
                    currentLocationTuple,
                    _,
                  ),
                  (
                    targetState,
                    (targetShaderIndex1, targetShaderIndex2),
                    (targetProgram1, targetProgram2),
                    targetLocationTuple,
                    _,
                  ),
                ) =
                  _prepare(state^);
                let {programMap} = newState |> ProgramTool.getProgramRecord;
                programMap
                |>
                expect == ProgramTool.getProgramRecord(targetState).programMap;
              })
            )
          );
          describe("test restore glsl location data", () =>
            describe("test attributeLocationMap, uniformLocationMap", () =>
              test("should be target state's one", () => {
                open AllGLSLLocationType;
                let (
                  newState,
                  (
                    currentState,
                    (currentShaderIndex1, currentShaderIndex2),
                    (currentProgram1, currentProgram2),
                    (
                      currentAttributeLocationData1,
                      currentAttributeLocationData2,
                      currentUniformLocationData1,
                      currentUniformLocationData2,
                    ),
                    _,
                  ),
                  (
                    targetState,
                    (targetShaderIndex1, targetShaderIndex2),
                    (targetProgram1, targetProgram2),
                    (
                      targetAttributeLocationData1,
                      targetAttributeLocationData2,
                      targetUniformLocationData1,
                      targetUniformLocationData2,
                    ),
                    _,
                  ),
                ) =
                  _prepare(state^);
                let {attributeLocationMap, uniformLocationMap} =
                  newState |> GLSLLocationTool.getGLSLLocationRecord;

                (attributeLocationMap, uniformLocationMap)
                |>
                expect == (
                            GLSLLocationTool.getGLSLLocationRecord(targetState).
                              attributeLocationMap,
                            GLSLLocationTool.getGLSLLocationRecord(
                              targetState,
                            ).
                              uniformLocationMap,
                          );
              })
            )
          );
          describe("test restore glsl sender data", () =>
            describe("test uniformShaderSendNoCachableDataMap", () =>
              test("should be target state's one", () => {
                let (
                  newState,
                  (
                    currentState,
                    _,
                    _,
                    _,
                    (
                      currentShaderUniformSendRenderObjectModelData1,
                      currentShaderUniformSendRenderObjectModelData2,
                    ),
                  ),
                  (
                    targetState,
                    (targetShaderIndex1, _),
                    _,
                    _,
                    (
                      tarunsafeGetShaderUniformSendRenderObjectModelData1,
                      tarunsafeGetShaderUniformSendRenderObjectModelData2,
                    ),
                  ),
                ) =
                  _prepare(state^);
                let {uniformShaderSendNoCachableDataMap}: AllGLSLSenderType.glslSenderRecord =
                  newState |> GLSLSenderTool.getGLSLSenderRecord;

                uniformShaderSendNoCachableDataMap
                |>
                expect == GLSLSenderTool.getGLSLSenderRecord(targetState).
                            uniformShaderSendNoCachableDataMap;
              })
            )
          );
        });
      });

      describe("test re-init lightMaterial", () =>
        describe("test restore to the state before re-init", () => {
          let _initMaterial = (material, state) => {
            let state = AllMaterialTool.prepareForInit(state);
            let state = LightMaterialTool.initMaterial(material, state);

            state;
          };

          test("shader index should be the one before re-init", () => {
            let (state, gameObject, material) =
              LightMaterialTool.createGameObject(state^);
            let (state, lightGameObject, light) =
              DirectionLightTool.createGameObject(state);
            let state =
              state
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let state = _initMaterial(material, state);
            let beforeShaderIndex =
              AllMaterialTool.getShaderIndex(material, state);
            let copiedState = MainStateTool.deepCopyForRestore(state);

            let state =
              GameObjectTool.disposeGameObject(lightGameObject, state);
            let state =
              LightMaterialAPI.reInitMaterials([|material|], state);
            let afterShaderIndex =
              AllMaterialTool.getShaderIndex(material, state);

            let restoredState = MainStateTool.restore(state, copiedState);

            let restoredShaderIndex =
              AllMaterialTool.getShaderIndex(material, restoredState);

            restoredShaderIndex |> expect == beforeShaderIndex;
          });
          test("used program should be the one before re-init", () => {
            let program1 = Obj.magic(1);
            let program2 = Obj.magic(2);
            let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
            createProgram |> onCall(0) |> returns(program1);
            createProgram |> onCall(1) |> returns(program2);
            let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
            let (state, lightGameObject, material, light, cameraTransform) =
              FrontRenderLightForNoWorkerAndWorkerJobTool.prepareOneForDirectionLight(
                sandbox,
                state^,
              );
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~createProgram,
                     ~useProgram,
                     (),
                   ),
                 );
            let state = _initMaterial(material, state);
            let beforeShaderIndex =
              AllMaterialTool.getShaderIndex(material, state);
            let copiedState = MainStateTool.deepCopyForRestore(state);

            let state =
              GameObjectTool.disposeGameObject(lightGameObject, state);
            let state =
              LightMaterialAPI.reInitMaterials([|material|], state);
            let afterShaderIndex =
              AllMaterialTool.getShaderIndex(material, state);

            let restoredState = MainStateTool.restore(state, copiedState);

            let restoredState =
              restoredState |> DirectorTool.runWithDefaultTime;

            let restoredShaderIndex =
              AllMaterialTool.getShaderIndex(material, restoredState);

            useProgram |> getCall(0) |> expect |> toCalledWith([|program1|]);
          });

          describe("test dispose direction light gameObject after restore", () =>
            test("final shaderIndex should be beforeShaderIndex + 1", () => {
              let (state, lightGameObject, material, light, cameraTransform) =
                FrontRenderLightForNoWorkerAndWorkerJobTool.prepareOneForDirectionLight(
                  sandbox,
                  state^,
                );
              let state =
                state
                |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
              let state = _initMaterial(material, state);
              let beforeShaderIndex =
                AllMaterialTool.getShaderIndex(material, state);
              let copiedState = MainStateTool.deepCopyForRestore(state);

              let state =
                GameObjectTool.disposeGameObject(lightGameObject, state);
              let state =
                LightMaterialAPI.reInitMaterials([|material|], state);
              let afterShaderIndex =
                AllMaterialTool.getShaderIndex(material, state);

              let restoredState = MainStateTool.restore(state, copiedState);

              let restoredShaderIndex =
                AllMaterialTool.getShaderIndex(material, restoredState);

              let restoredState =
                GameObjectTool.disposeGameObject(
                  lightGameObject,
                  restoredState,
                );
              let restoredState =
                LightMaterialAPI.reInitMaterials(
                  [|material|],
                  restoredState,
                );

              let restoredState =
                restoredState |> DirectorTool.runWithDefaultTime;

              let disposedRestoredShaderIndex =
                AllMaterialTool.getShaderIndex(material, restoredState);

              disposedRestoredShaderIndex |> expect == afterShaderIndex + 1;
            })
          );
        })
      );
    });
  });