open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "test redo,undo shader data",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _prepareGLSLSenderData = (state) => {
        open StateDataType;
        let {attributeSendDataMap, vertexAttribHistoryArray} =
          GLSLSenderTool.getGLSLSenderData(state);
        let shaderIndex1 = 0;
        let data1 = Obj.magic(0);
        let func1 = Obj.magic(1);
        let history1 = Obj.magic(2);
        attributeSendDataMap |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, data1) |> ignore;
        vertexAttribHistoryArray
        |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, history1)
        |> ignore;
        (state, shaderIndex1, data1, func1, history1)
      };
      let _prepareShaderData = (state) => {
        let data = ShaderTool.getShaderData(state);
        let shaderIndex1 = 0;
        let shaderIndex2 = 1;
        data.index = 2;
        data.shaderIndexMap |> WonderCommonlib.HashMapSystem.set("key1", shaderIndex1) |> ignore;
        data.shaderIndexMap |> WonderCommonlib.HashMapSystem.set("key2", shaderIndex2) |> ignore;
        (state, shaderIndex1, shaderIndex2)
      };
      let _prepareProgramData = (state) => {
        let data = ProgramTool.getProgramData(state);
        let shaderIndex1 = 0;
        let program1 = Obj.magic(11);
        data.programMap |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, program1) |> ignore;
        data.lastUsedProgram = program1;
        (state, shaderIndex1, program1)
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.initWithJobConfig(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "restore",
        () => {
          describe(
            "restore glsl sender data to target state",
            () => {
              test(
                "clear last send data",
                () => {
                  open StateDataType;
                  let (state, shaderIndex1, data1, func1, history1) =
                    _prepareGLSLSenderData(state^);
                  let (currentState, _, _, _, _) =
                    _prepareGLSLSenderData(StateTool.createNewCompleteState());
                  let newState = StateTool.restore(currentState, state);
                  let {lastSendMaterial, lastSendGeometry} =
                    newState |> GLSLSenderTool.getGLSLSenderData;
                  (lastSendMaterial, lastSendGeometry)
                  |> expect == (None, None)
                }
              );
              test(
                "clear vertexAttribHistoryArray",
                () => {
                  open StateDataType;
                  let (state, shaderIndex1, data1, func1, history1) =
                    _prepareGLSLSenderData(state^);
                  let (currentState, _, _, _, _) =
                    _prepareGLSLSenderData(StateTool.createNewCompleteState());
                  let newState = StateTool.restore(currentState, state);
                  let {vertexAttribHistoryArray} = newState |> GLSLSenderTool.getGLSLSenderData;
                  vertexAttribHistoryArray |> expect == WonderCommonlib.ArraySystem.createEmpty()
                }
              )
            }
          );
          describe(
            "restore shader data to target state",
            () =>
              describe(
                "contract check",
                () =>
                  test(
                    "currentState and targetState ->shaderData->glslData->precision should be the same",
                    () => {
                      open ShaderType;
                      let (state, shaderIndex1, shaderIndex2) = _prepareShaderData(state^);
                      let currentState = StateTool.createNewCompleteState();
                      TestTool.openContractCheck();
                      let data = ShaderTool.getShaderData(currentState);
                      data.glslData.precision = Some("aaa");
                      expect(
                        () => {
                          let _ = StateTool.restore(currentState, state);
                          ()
                        }
                      )
                      |> toThrowMessage(
                           "expect currentState->shaderData->glslData->precision and targetState ->shaderData->glslData->precision be the same, but actual not"
                         )
                    }
                  )
              )
          );
          describe(
            "restore program data to target state",
            () =>
              test(
                "clear lastUsedProgram",
                () => {
                  open ProgramType;
                  let (state, shaderIndex1, program1) = _prepareProgramData(state^);
                  let (currentState, _, _) =
                    _prepareProgramData(StateTool.createNewCompleteState());
                  let newState = StateTool.restore(currentState, state);
                  let {lastUsedProgram} = newState |> ProgramTool.getProgramData;
                  lastUsedProgram |> expect == None
                }
              )
          );
          describe(
            "restore gpu shader related data to target state",
            () => {
              describe(
                "test init shader",
                () => {
                  let _prepareBasicMaterialGameObject = (sandbox, state) => {
                    open GameObject;
                    open BasicMaterial;
                    open BoxGeometry;
                    open Sinon;
                    let (state, material) = createBasicMaterial(state);
                    let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
                    let (state, gameObject) = state |> createGameObject;
                    let state =
                      state
                      |> addGameObjectBasicMaterialComponent(gameObject, material)
                      |> addGameObjectGeometryComponent(gameObject, geometry);
                    (state, gameObject)
                  };
                  let _prepareInstanceGameObject = (sandbox, state) => {
                    open GameObject;
                    open BasicMaterial;
                    open BoxGeometry;
                    open Sinon;
                    let (state, material) = createBasicMaterial(state);
                    let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
                    let (state, gameObject) = state |> createGameObject;
                    let (state, sourceInstance) = SourceInstance.createSourceInstance(state);
                    let state =
                      state
                      |> addGameObjectSourceInstanceComponent(gameObject, sourceInstance)
                      |> addGameObjectBasicMaterialComponent(gameObject, material)
                      |> addGameObjectGeometryComponent(gameObject, geometry);
                    (state, gameObject)
                  };
                  let _exec = (currentState, copiedState, gameObject) => {
                    let currentStateCreateProgram = createEmptyStubWithJsObjSandbox(sandbox);
                    let currentState =
                      currentState
                      |> FakeGlTool.setFakeGl(
                           FakeGlTool.buildFakeGl(
                             ~sandbox,
                             ~createProgram=currentStateCreateProgram,
                             ()
                           )
                         );
                    let currentState = currentState |> GameObjectTool.initGameObject(gameObject);
                    let initShaderCount = getCallCount(currentStateCreateProgram);
                    let _ = StateTool.restore(currentState, copiedState);
                    (currentStateCreateProgram, initShaderCount)
                  };
                  test(
                    "if targetState->shader not exist in currentState->shader, init it",
                    () => {
                      let (state, _) = _prepareInstanceGameObject(sandbox, state^);
                      let state =
                        state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                      let state = state |> DirectorTool.prepare |> DirectorTool.initWithJob;
                      let copiedState = StateTool.deepCopyStateForRestore(state);
                      let currentState = StateTool.createNewCompleteStateWithRenderJobConfig();
                      let (currentState, gameObject) =
                        _prepareBasicMaterialGameObject(sandbox, currentState);
                      let (currentStateCreateProgram, initShaderCount) =
                        _exec(currentState, copiedState, gameObject);
                      getCallCount(currentStateCreateProgram) |> expect == initShaderCount + 1
                    }
                  );
                  describe(
                    "else, not init it",
                    () => {
                      test(
                        "test",
                        () => {
                          let (state, _) = _prepareInstanceGameObject(sandbox, state^);
                          let (state, _) = _prepareBasicMaterialGameObject(sandbox, state);
                          let state =
                            state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                          let state = state |> DirectorTool.prepare |> DirectorTool.initWithJob;
                          let copiedState = StateTool.deepCopyStateForRestore(state);
                          let currentState = StateTool.createNewCompleteStateWithRenderJobConfig();
                          let (currentState, gameObject) =
                            _prepareBasicMaterialGameObject(sandbox, currentState);
                          let (currentStateCreateProgram, initShaderCount) =
                            _exec(currentState, copiedState, gameObject);
                          getCallCount(currentStateCreateProgram) |> expect == initShaderCount + 1
                        }
                      );
                      describe(
                        "fix bug",
                        () =>
                          test(
                            "test create gameObject which has no material",
                            () => {
                              let (state, _) = _prepareInstanceGameObject(sandbox, state^);
                              let (state, _, _) = GameObjectTool.createGameObject(state);
                              let (state, gameObject) =
                                _prepareBasicMaterialGameObject(sandbox, state);
                              let state =
                                state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                              let state = state |> DirectorTool.prepare |> DirectorTool.initWithJob;
                              let copiedState = StateTool.deepCopyStateForRestore(state);
                              let currentState = state;
                              let (currentState, gameObject) =
                                _prepareBasicMaterialGameObject(sandbox, currentState);
                              let (currentStateCreateProgram, initShaderCount) =
                                _exec(currentState, copiedState, gameObject);
                              getCallCount(currentStateCreateProgram) |> expect == initShaderCount
                            }
                          )
                      )
                    }
                  )
                }
              );
              describe(
                "test restore data",
                () => {
                  let _prepareState1 = (state) => {
                    open ShaderType;
                    open GLSLLocationType;
                    open ProgramType;
                    open GLSLSenderType;
                    open StateDataType;
                    let shaderIndex1 = 0;
                    let shaderIndex2 = 1;
                    let shaderIndex3 = 2;
                    let {shaderIndexMap} as data = ShaderTool.getShaderData(state);
                    data.index = 3;
                    shaderIndexMap
                    |> WonderCommonlib.HashMapSystem.set("key1", shaderIndex1)
                    |> WonderCommonlib.HashMapSystem.set("key2", shaderIndex2)
                    |> WonderCommonlib.HashMapSystem.set("key3", shaderIndex3)
                    |> ignore;
                    let {programMap} as data = ProgramTool.getProgramData(state);
                    let program1 = Obj.magic(11);
                    let program2 = Obj.magic(12);
                    programMap
                    |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, program1)
                    |> WonderCommonlib.SparseMapSystem.set(shaderIndex2, program2)
                    |> ignore;
                    data.lastUsedProgram = program2;
                    let {attributeLocationMap, uniformLocationMap} =
                      GLSLLocationTool.getGLSLLocationData(state);
                    let attributeLocationData1 = Obj.magic(21);
                    let attributeLocationData2 = Obj.magic(22);
                    let uniformLocationData1 = Obj.magic(31);
                    let uniformLocationData2 = Obj.magic(32);
                    attributeLocationMap
                    |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, attributeLocationData1)
                    |> WonderCommonlib.SparseMapSystem.set(shaderIndex2, attributeLocationData2)
                    |> ignore;
                    uniformLocationMap
                    |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, uniformLocationData1)
                    |> WonderCommonlib.SparseMapSystem.set(shaderIndex2, uniformLocationData2)
                    |> ignore;
                    let {uniformShaderSendNoCachableDataMap} =
                      GLSLSenderTool.getGLSLSenderData(state);
                    let uniformShaderSendNoCachableData1 = Obj.magic(121);
                    let uniformShaderSendNoCachableData2 = Obj.magic(122);
                    uniformShaderSendNoCachableDataMap
                    |> WonderCommonlib.SparseMapSystem.set(
                         shaderIndex1,
                         uniformShaderSendNoCachableData1
                       )
                    |> WonderCommonlib.SparseMapSystem.set(
                         shaderIndex2,
                         uniformShaderSendNoCachableData2
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
                        uniformLocationData2
                      ),
                      (uniformShaderSendNoCachableData1, uniformShaderSendNoCachableData2)
                    )
                  };
                  let _prepareState2 = (state) => {
                    open StateDataType;
                    open ShaderType;
                    open GLSLLocationType;
                    open ProgramType;
                    open GLSLSenderType;
                    let shaderIndex1 = 3;
                    let shaderIndex2 = 4;
                    let {shaderIndexMap} as data = ShaderTool.getShaderData(state);
                    data.index = 2;
                    shaderIndexMap
                    |> WonderCommonlib.HashMapSystem.set("key1", shaderIndex1)
                    |> WonderCommonlib.HashMapSystem.set("key4", shaderIndex2)
                    |> ignore;
                    let {programMap} as data = ProgramTool.getProgramData(state);
                    let program1 = Obj.magic(101);
                    let program2 = Obj.magic(102);
                    programMap
                    |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, program1)
                    |> WonderCommonlib.SparseMapSystem.set(shaderIndex2, program2)
                    |> ignore;
                    data.lastUsedProgram = program2;
                    let {attributeLocationMap, uniformLocationMap} =
                      GLSLLocationTool.getGLSLLocationData(state);
                    let attributeLocationData1 = Obj.magic(201);
                    let attributeLocationData2 = Obj.magic(202);
                    let uniformLocationData1 = Obj.magic(301);
                    let uniformLocationData2 = Obj.magic(302);
                    attributeLocationMap
                    |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, attributeLocationData1)
                    |> WonderCommonlib.SparseMapSystem.set(shaderIndex2, attributeLocationData2)
                    |> ignore;
                    uniformLocationMap
                    |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, uniformLocationData1)
                    |> WonderCommonlib.SparseMapSystem.set(shaderIndex2, uniformLocationData2)
                    |> ignore;
                    let {uniformShaderSendNoCachableDataMap} =
                      GLSLSenderTool.getGLSLSenderData(state);
                    let uniformShaderSendNoCachableData1 = Obj.magic(10221);
                    let uniformShaderSendNoCachableData2 = Obj.magic(10222);
                    uniformShaderSendNoCachableDataMap
                    |> WonderCommonlib.SparseMapSystem.set(
                         shaderIndex1,
                         uniformShaderSendNoCachableData1
                       )
                    |> WonderCommonlib.SparseMapSystem.set(
                         shaderIndex2,
                         uniformShaderSendNoCachableData2
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
                        uniformLocationData2
                      ),
                      (uniformShaderSendNoCachableData1, uniformShaderSendNoCachableData2)
                    )
                  };
                  let _prepare = (state) => {
                    let (
                      targetState,
                      targetShaderIndexTuple,
                      targetProgramTuple,
                      targetLocationTuple,
                      targetSenderTuple
                    ) =
                      _prepareState1(state);
                    let (
                      currentState,
                      currentShaderIndexTuple,
                      currentProgramTuple,
                      currentLocationTuple,
                      currentSenderTuple
                    ) =
                      _prepareState2(StateTool.createNewCompleteState());
                    let newState = StateTool.restore(currentState, targetState);
                    (
                      newState,
                      (
                        currentState,
                        currentShaderIndexTuple,
                        currentProgramTuple,
                        currentLocationTuple,
                        currentSenderTuple
                      ),
                      (
                        targetState,
                        targetShaderIndexTuple,
                        targetProgramTuple,
                        targetLocationTuple,
                        targetSenderTuple
                      )
                    )
                  };
                  describe(
                    "test restore shader data",
                    () => {
                      describe(
                        "test index",
                        () =>
                          test(
                            "index should be intersected shader's length + 1",
                            () => {
                              open ShaderType;
                              let (newState, (currentState, _, _, _, _), (targetState, _, _, _, _)) =
                                _prepare(state^);
                              let {index} = newState |> ShaderTool.getShaderData;
                              index |> expect == 1
                            }
                          )
                      );
                      describe(
                        "test shaderIndexMap",
                        () =>
                          test(
                            "get intersect map between current shaderIndexMap and target shaderIndexMap whose value is the one in target shaderIndexMap",
                            () => {
                              open ShaderType;
                              let (
                                newState,
                                (
                                  currentState,
                                  (currentShaderIndex1, currentShaderIndex2),
                                  currentProgramTuple,
                                  currentLocationTuple,
                                  _
                                ),
                                (
                                  targetState,
                                  (targetShaderIndex1, targetShaderIndex2),
                                  targetProgramTuple,
                                  targetLocationTuple,
                                  _
                                )
                              ) =
                                _prepare(state^);
                              let {shaderIndexMap} = newState |> ShaderTool.getShaderData;
                              shaderIndexMap
                              |> HashMapSystem.entries
                              |> expect == [|("key1", targetShaderIndex1)|]
                            }
                          )
                      )
                    }
                  );
                  describe(
                    "test restore program data",
                    () =>
                      describe(
                        "test programMap",
                        () =>
                          test(
                            "get intersect map between current programMap and target programMap whose value is the one in current programMap",
                            () => {
                              open ProgramType;
                              let (
                                newState,
                                (
                                  currentState,
                                  (currentShaderIndex1, currentShaderIndex2),
                                  (currentProgram1, currentProgram2),
                                  currentLocationTuple,
                                  _
                                ),
                                (
                                  targetState,
                                  (targetShaderIndex1, targetShaderIndex2),
                                  (targetProgram1, targetProgram2),
                                  targetLocationTuple,
                                  _
                                )
                              ) =
                                _prepare(state^);
                              let {programMap} = newState |> ProgramTool.getProgramData;
                              (
                                programMap |> SparseMapSystem.length,
                                programMap
                                |> WonderCommonlib.SparseMapSystem.unsafeGet(targetShaderIndex1)
                              )
                              |> expect == (1, currentProgram1)
                            }
                          )
                      )
                  );
                  describe(
                    "test restore glsl location data",
                    () =>
                      describe(
                        "test attributeLocationMap, uniformLocationMap",
                        () =>
                          test(
                            "get intersect map between current map and target map whose value is the one in current map",
                            () => {
                              open GLSLLocationType;
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
                                    currentUniformLocationData2
                                  ),
                                  _
                                ),
                                (
                                  targetState,
                                  (targetShaderIndex1, targetShaderIndex2),
                                  (targetProgram1, targetProgram2),
                                  (
                                    targetAttributeLocationData1,
                                    targetAttributeLocationData2,
                                    targetUniformLocationData1,
                                    targetUniformLocationData2
                                  ),
                                  _
                                )
                              ) =
                                _prepare(state^);
                              let {attributeLocationMap, uniformLocationMap} =
                                newState |> GLSLLocationTool.getGLSLLocationData;
                              (
                                attributeLocationMap |> SparseMapSystem.length,
                                attributeLocationMap
                                |> WonderCommonlib.SparseMapSystem.unsafeGet(targetShaderIndex1)
                              )
                              |> expect == (1, currentAttributeLocationData1)
                            }
                          )
                      )
                  );
                  describe(
                    "test restore glsl sender data",
                    () =>
                      describe(
                        "test uniformShaderSendNoCachableDataMap",
                        () =>
                          test(
                            "get intersect map between current uniformShaderSendNoCachableDataMap and target nuiformShaderSendNoCachableDataMap whose value is the one in current niuformShaderSendNoCachableDataMap",
                            () => {
                              open StateDataType;
                              let (
                                newState,
                                (
                                  currentState,
                                  _,
                                  _,
                                  _,
                                  (
                                    currentShaderUniformSendRenderObjectModelData1,
                                    currentShaderUniformSendRenderObjectModelData2
                                  )
                                ),
                                (
                                  targetState,
                                  (targetShaderIndex1, _),
                                  _,
                                  _,
                                  (
                                    tarunsafeGetShaderUniformSendRenderObjectModelData1,
                                    tarunsafeGetShaderUniformSendRenderObjectModelData2
                                  )
                                )
                              ) =
                                _prepare(state^);
                              let {uniformShaderSendNoCachableDataMap} =
                                newState |> GLSLSenderTool.getGLSLSenderData;
                              (
                                uniformShaderSendNoCachableDataMap |> SparseMapSystem.length,
                                uniformShaderSendNoCachableDataMap
                                |> WonderCommonlib.SparseMapSystem.unsafeGet(targetShaderIndex1)
                              )
                              |> expect == (1, currentShaderUniformSendRenderObjectModelData1)
                            }
                          )
                      )
                  )
                }
              )
            }
          )
        }
      )
    }
  );