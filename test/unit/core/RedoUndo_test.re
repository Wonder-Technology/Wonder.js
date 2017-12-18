open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "test redo,undo",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _prepareMeshRendererData = (state) => {
        let (state, gameObject1, meshRenderer1) = MeshRendererTool.createGameObject(state^);
        let (state, gameObject2, meshRenderer2) = MeshRendererTool.createGameObject(state);
        let (state, gameObject3, meshRenderer3) = MeshRendererTool.createGameObject(state);
        let state =
          state |> GameObject.disposeGameObjectMeshRendererComponent(gameObject3, meshRenderer3);
        (state, gameObject1, gameObject2, gameObject3, meshRenderer1, meshRenderer2, meshRenderer3)
      };
      let _prepareTransformData = (state) => {
        let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
        let (state, gameObject2, transform2) = GameObjectTool.createGameObject(state);
        let (state, gameObject3, transform3) = GameObjectTool.createGameObject(state);
        let state =
          Transform.setTransformParent(Js.Nullable.return(transform1), transform2, state);
        let pos1 = (1., 2., 3.);
        let pos2 = (2., 4., 10.);
        let pos3 = ((-1.), 4., 5.);
        let state = Transform.setTransformLocalPosition(transform1, pos1, state);
        let state = Transform.setTransformLocalPosition(transform2, pos2, state);
        let state = Transform.setTransformLocalPosition(transform3, pos3, state);
        let state =
          state |> GameObject.disposeGameObjectTransformComponent(gameObject3, transform3);
        (state, gameObject1, gameObject2, gameObject3, transform1, transform2, transform3)
      };
      let _prepareCameraControllerData = (state) => {
        open PerspectiveCamera;
        let (state, gameObject1, _, cameraController1) =
          CameraControllerTool.createCameraGameObject(state^);
        let (state, gameObject2, _, cameraController2) =
          CameraControllerTool.createCameraGameObject(state);
        let (state, gameObject3, _, cameraController3) =
          CameraControllerTool.createCameraGameObject(state);
        let state = state |> setPerspectiveCameraNear(cameraController2, 0.2);
        let state = state |> setPerspectiveCameraFar(cameraController2, 100.);
        let state = state |> setPerspectiveCameraFar(cameraController3, 100.);
        let state = state |> setPerspectiveCameraAspect(cameraController1, 1.);
        let state = state |> setPerspectiveCameraAspect(cameraController2, 2.);
        let state = state |> setPerspectiveCameraFovy(cameraController2, 60.);
        let state = state |> CameraControllerTool.update;
        let state =
          state
          |> GameObject.disposeGameObjectCameraControllerComponent(gameObject3, cameraController3);
        (
          state,
          gameObject1,
          gameObject2,
          gameObject3,
          cameraController1,
          cameraController2,
          cameraController3
        )
      };
      let _prepareGeometryData = (state) => {
        open Geometry;
        open Js.Typed_array;
        let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
        let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
        let (state, gameObject3, geometry3) = BoxGeometryTool.createGameObject(state);
        let state = GeometryTool.initGeometrys(state);
        let state = state |> setGeometryVertices(geometry2, Float32Array.make([|3., 5., 5.|]));
        let state = state |> setGeometryIndices(geometry2, Uint16Array.make([|1, 2, 4|]));
        (state, gameObject1, gameObject2, gameObject3, geometry1, geometry2, geometry3)
      };
      let _prepareVboBufferData = (state) => {
        open VboBufferType;
        let {
          vertexBufferMap,
          elementArrayBufferMap,
          modelMatrixInstanceBufferMap,
          vertexArrayBufferPool,
          elementArrayBufferPool,
          modelMatrixInstanceBufferPool
        } =
          VboBufferTool.getVboBufferData(state);
        let buffer1 = Obj.magic(0);
        let buffer2 = Obj.magic(1);
        let buffer3 = Obj.magic(2);
        vertexArrayBufferPool |> Js.Array.push(buffer1) |> ignore;
        elementArrayBufferPool |> Js.Array.push(buffer2) |> ignore;
        modelMatrixInstanceBufferPool |> Js.Array.push(buffer3) |> ignore;
        let geometry1 = 0;
        let bufferInMap1 = Obj.magic(10);
        let bufferInMap2 = Obj.magic(11);
        let bufferInMap3 = Obj.magic(12);
        vertexBufferMap |> WonderCommonlib.SparseMapSystem.set(geometry1, bufferInMap1);
        elementArrayBufferMap |> WonderCommonlib.SparseMapSystem.set(geometry1, bufferInMap2);
        modelMatrixInstanceBufferMap
        |> WonderCommonlib.SparseMapSystem.set(geometry1, bufferInMap3);
        (state, geometry1, (bufferInMap1, bufferInMap2, bufferInMap3), (buffer1, buffer2, buffer3))
      };
      let _prepareGLSLSenderData = (state) => {
        open StateDataType;
        let {attributeSendDataMap, vertexAttribHistoryArray} =
          GlslSenderTool.getGLSLSenderData(state);
        let shaderIndex1 = 0;
        let data1 = Obj.magic(0);
        let func1 = Obj.magic(1);
        let history1 = Obj.magic(2);
        attributeSendDataMap |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, data1);
        vertexAttribHistoryArray |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, history1);
        (state, shaderIndex1, data1, func1, history1)
      };
      let _prepareMaterialData = (state) => {
        open Material;
        open Js.Typed_array;
        let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
        let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
        let (state, gameObject3, material3) = BasicMaterialTool.createGameObject(state);
        let state = MaterialTool.prepareForInit(state);
        let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
        let state = BasicMaterialTool.initMaterials([@bs] GlTool.getGl(state), state);
        let state = state |> setMaterialColor(material2, [|1., 0.1, 0.2|]);
        (state, gameObject1, gameObject2, gameObject3, material1, material2, material3)
      };
      let _prepareShaderData = (state) => {
        let data = ShaderTool.getShaderData(state);
        let shaderIndex1 = 0;
        let shaderIndex2 = 1;
        data.index = 2;
        data.shaderIndexMap |> WonderCommonlib.HashMapSystem.set("key1", shaderIndex1);
        data.shaderIndexMap |> WonderCommonlib.HashMapSystem.set("key2", shaderIndex2);
        (state, shaderIndex1, shaderIndex2)
      };
      let _prepareProgramData = (state) => {
        let data = ProgramTool.getProgramData(state);
        let shaderIndex1 = 0;
        let program1 = Obj.magic(11);
        data.programMap |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, program1);
        data.lastUsedProgram = program1;
        (state, shaderIndex1, program1)
      };
      let _prepareDeviceManagerData = (state) => {
        let data = DeviceManagerTool.getDeviceManagerData(state);
        let gl = Obj.magic(RandomTool.getRandomFloat(10.));
        let colorWrite = Some((Js.true_, Js.true_, Js.true_, Js.false_));
        let clearColor = Some((1., 0.1, 0.2, 1.));
        (
          {...state, deviceManagerData: {gl: Some(gl), colorWrite, clearColor}},
          Some(gl),
          (colorWrite, clearColor)
        )
      };
      let _prepareTypeArrayPoolData = (state) => {
        open StateDataType;
        let float32ArrayPoolMap = [|[|Float32Array.make([|RandomTool.getRandomFloat(3.)|])|]|];
        let uint16ArrayPoolMap = [|[|Uint16Array.make([|RandomTool.getRandomInt(3)|])|]|];
        (
          {...state, typeArrayPoolData: {float32ArrayPoolMap, uint16ArrayPoolMap}},
          (float32ArrayPoolMap, uint16ArrayPoolMap)
        )
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "deepCopyState",
        () => {
          let _prepareGLSLLocationData = (state) => {
            let data = GlslLocationTool.getGLSLLocationData(state);
            let shaderIndex1 = 0;
            let attributeLocation1 = Obj.magic(11);
            let uniformLocation1 = Obj.magic(12);
            data.attributeLocationMap
            |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, attributeLocation1);
            data.uniformLocationMap
            |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, uniformLocation1);
            (state, shaderIndex1, (attributeLocation1, uniformLocation1))
          };
          describe(
            "deep copy meshRenderer data",
            () => {
              test(
                "copied data should equal to source data",
                () => {
                  open MeshRendererType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    meshRenderer1,
                    meshRenderer2,
                    meshRenderer3
                  ) =
                    _prepareMeshRendererData(state);
                  let copiedState = StateTool.deepCopyState(state);
                  MeshRendererTool.getMeshRendererData(copiedState)
                  |>
                  expect == {
                              index: 3,
                              renderGameObjectArray: [|gameObject1, gameObject2|],
                              gameObjectMap: [|
                                gameObject1,
                                gameObject2,
                                Js.Undefined.empty |> Obj.magic
                              |],
                              disposedIndexArray: [|meshRenderer3|]
                            }
                }
              );
              test(
                "change copied state shouldn't affect source state",
                () => {
                  open MeshRendererType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    meshRenderer1,
                    meshRenderer2,
                    meshRenderer3
                  ) =
                    _prepareMeshRendererData(state);
                  let copiedState = StateTool.deepCopyState(state);
                  let data = MeshRendererTool.getMeshRendererData(copiedState);
                  data.index = 0;
                  data.renderGameObjectArray |> Js.Array.pop |> ignore;
                  data.gameObjectMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(meshRenderer2);
                  data.disposedIndexArray |> Js.Array.pop |> ignore;
                  MeshRendererTool.getMeshRendererData(state)
                  |>
                  expect == {
                              index: 3,
                              renderGameObjectArray: [|gameObject1, gameObject2|],
                              gameObjectMap: [|
                                gameObject1,
                                gameObject2,
                                Js.Undefined.empty |> Obj.magic
                              |],
                              disposedIndexArray: [|meshRenderer3|]
                            }
                }
              )
            }
          );
          describe(
            "deep copy transform data",
            () =>
              test(
                "change copied state shouldn't affect source state",
                () => {
                  open TransformType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    transform1,
                    transform2,
                    transform3
                  ) =
                    _prepareTransformData(state);
                  let _ = Transform.getTransformPosition(transform2, state);
                  let copiedState = StateTool.deepCopyState(state);
                  let data = TransformTool.getTransformData(copiedState);
                  data.localPositionMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(transform2);
                  TransformTool.getTransformData(state).localPositionMap
                  |> WonderCommonlib.SparseMapSystem.unsafeGet(transform2)
                  |> expect
                  |> not_ == (Js.Undefined.empty |> Obj.magic)
                }
              )
          );
          describe(
            "deep copy geometry data",
            () =>
              test(
                "change copied state shouldn't affect source state",
                () => {
                  open StateDataType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    geometry1,
                    geometry2,
                    geometry3
                  ) =
                    _prepareGeometryData(state);
                  let copiedState = StateTool.deepCopyState(state);
                  let data = GeometryTool.getGeometryData(copiedState);
                  data.verticesMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(geometry2);
                  data.indicesMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(geometry2);
                  let {verticesMap, indicesMap} = GeometryTool.getGeometryData(state);
                  (
                    verticesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry2),
                    indicesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry2)
                  )
                  |> expect
                  |> not_ == (Js.Undefined.empty |> Obj.magic)
                }
              )
          );
          describe(
            "deep copy vbo buffer data",
            () =>
              test(
                "clean all buffer map and all buffer pool data",
                () => {
                  open VboBufferType;
                  let (
                    state,
                    geometry1,
                    (bufferInMap1, bufferInMap2, bufferInMap3),
                    (buffer1, buffer2, buffer3)
                  ) =
                    _prepareVboBufferData(state^);
                  let copiedState = StateTool.deepCopyState(state);
                  let {
                    vertexBufferMap,
                    elementArrayBufferMap,
                    modelMatrixInstanceBufferMap,
                    vertexArrayBufferPool,
                    elementArrayBufferPool,
                    modelMatrixInstanceBufferPool
                  } =
                    VboBufferTool.getVboBufferData(copiedState);
                  (
                    vertexBufferMap,
                    elementArrayBufferMap,
                    modelMatrixInstanceBufferMap,
                    vertexArrayBufferPool,
                    elementArrayBufferPool,
                    modelMatrixInstanceBufferPool
                  )
                  |> expect == ([||], [||], [||], [||], [||], [||])
                }
              )
          );
          /* describe(
               "deep copy glslSender data",
               () => {
                 test(
                   "change copied state shouldn't affect source state",
                   () => {
                     open StateDataType;
                     let (state, shaderIndex1, data1, func1, history1) =
                       _prepareGLSLSenderData(state^);
                     let copiedState = StateTool.deepCopyState(state);
                     let data = GlslSenderTool.getGLSLSenderData(copiedState);
                     data.attributeSendDataMap
                     |> Obj.magic
                     |> WonderCommonlib.SparseMapSystem.deleteVal(shaderIndex1);
                     data.vertexAttribHistoryArray
                     |> Obj.magic
                     |> WonderCommonlib.SparseMapSystem.deleteVal(shaderIndex1);
                     let {attributeSendDataMap, vertexAttribHistoryArray} =
                       GlslSenderTool.getGLSLSenderData(state);
                     (attributeSendDataMap |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex1)  , vertexAttribHistoryArray )
                     |> expect
                     |> not_ == (Js.Undefined.empty |> Obj.magic)
                   }
                 );
                 test(
                   "clean lastSendArrayBuffer, lastSendElementArrayBuffer, lastSendMaterial",
                   () => {
                     open StateDataType;
                     let (state, shaderIndex1, data1, func1, history1) =
                       _prepareGLSLSenderData(state^);
                     let copiedState = StateTool.deepCopyState(state);
                     let data = GlslSenderTool.getGLSLSenderData(copiedState);
                     let {lastSendArrayBuffer, lastSendElementArrayBuffer, lastSendMaterial} =
                       GlslSenderTool.getGLSLSenderData(copiedState);
                     (lastSendArrayBuffer, lastSendElementArrayBuffer, lastSendMaterial)
                     |> expect == (None, None, None)
                   }
                 )
               }
             ); */
          describe(
            "deep copy material data",
            () =>
              test(
                "change copied state shouldn't affect source state",
                () => {
                  open MaterialType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    material1,
                    material2,
                    material3
                  ) =
                    _prepareMaterialData(state);
                  let copiedState = StateTool.deepCopyState(state);
                  let data = MaterialTool.getMaterialData(copiedState);
                  data.colorMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(material2);
                  let {colorMap} = MaterialTool.getMaterialData(state);
                  colorMap
                  |> WonderCommonlib.SparseMapSystem.unsafeGet(material2)
                  |> expect
                  |> not_ == (Js.Undefined.empty |> Obj.magic)
                }
              )
          );
          /* describe(
               "deep copy shader data",
               () =>
                 test(
                   "change copied state shouldn't affect source state",
                   () => {
                     open ShaderType;
                     let (state, shaderIndex1, _) = _prepareShaderData(state^);
                     let copiedState = StateTool.deepCopyState(state);
                     let data = ShaderTool.getShaderData(copiedState);
                     data.shaderIndexMap |> WonderCommonlib.HashMapSystem.set("aaa", 10);
                     let {shaderIndexMap} = ShaderTool.getShaderData(state);
                     shaderIndexMap |> WonderCommonlib.HashMapSystem.has("aaa") |> expect == false
                   }
                 )
             );
             describe(
               "deep copy program data",
               () => {
                 test(
                   "change copied state shouldn't affect source state",
                   () => {
                     open ProgramType;
                     let (state, shaderIndex1, program1) = _prepareProgramData(state^);
                     let copiedState = StateTool.deepCopyState(state);
                     let data = ProgramTool.getProgramData(copiedState);
                     data.programMap
                     |> Obj.magic
                     |> WonderCommonlib.SparseMapSystem.deleteVal(shaderIndex1);
                     let {programMap} = ProgramTool.getProgramData(state);
                     programMap
                     |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex1)
                     |> expect
                     |> not_ == (Js.Undefined.empty |> Obj.magic)
                   }
                 );
                 test(
                   "clean lastUsedProgram",
                   () => {
                     open ProgramType;
                     let (state, shaderIndex1, program1) = _prepareProgramData(state^);
                     let copiedState = StateTool.deepCopyState(state);
                     let {lastUsedProgram} = ProgramTool.getProgramData(copiedState);
                     lastUsedProgram |> expect == None
                   }
                 )
               }
             );
             describe(
               "deep copy glsl location data",
               () => {
                 test(
                   "change copied state shouldn't affect source state",
                   () => {
                     open GLSLLocationType;
                     let (state, shaderIndex1, (attributeLocation1, uniformLocation1)) =
                       _prepareGLSLLocationData(state^);
                     let copiedState = StateTool.deepCopyState(state);
                     let data = GlslLocationTool.getGLSLLocationData(copiedState);
                     data.attributeLocationMap
                     |> Obj.magic
                     |> WonderCommonlib.SparseMapSystem.deleteVal(shaderIndex1);
                     data.uniformLocationMap
                     |> Obj.magic
                     |> WonderCommonlib.SparseMapSystem.deleteVal(shaderIndex1);
                     let {attributeLocationMap, uniformLocationMap} =
                       GlslLocationTool.getGLSLLocationData(state);
                     (
                       attributeLocationMap |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex1),
                       uniformLocationMap |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex1)
                     )
                     |> expect == (attributeLocation1, uniformLocation1)
                   }
                 );
                 test(
                   "clean lastUsedProgram",
                   () => {
                     open ProgramType;
                     let (state, shaderIndex1, program1) = _prepareProgramData(state^);
                     let copiedState = StateTool.deepCopyState(state);
                     let {lastUsedProgram} = ProgramTool.getProgramData(copiedState);
                     lastUsedProgram |> expect == None
                   }
                 )
               }
             ); */
          describe(
            "deep copy deviceManager data",
            () => {
              test(
                "clean gl",
                () => {
                  open StateDataType;
                  let (state, gl, (colorWrite, clearColor)) = _prepareDeviceManagerData(state^);
                  let copiedState = StateTool.deepCopyState(state);
                  let {gl}: deviceManagerData =
                    DeviceManagerTool.getDeviceManagerData(copiedState);
                  gl |> expect == None
                }
              );
              test(
                "directly use readonly data",
                () => {
                  open StateDataType;
                  let (state, gl, (colorWrite, clearColor)) = _prepareDeviceManagerData(state^);
                  let copiedState = StateTool.deepCopyState(state);
                  let targetData = DeviceManagerTool.getDeviceManagerData(state);
                  let copiedData = DeviceManagerTool.getDeviceManagerData(copiedState);
                  (copiedData.colorWrite, copiedData.clearColor)
                  |> expect == (targetData.colorWrite, targetData.clearColor)
                }
              )
            }
          );
          describe(
            "deep copy typeArrayPool data",
            () =>
              test(
                "clean pool map",
                () => {
                  open StateDataType;
                  open TypeArrayPoolType;
                  let (state, _) = _prepareTypeArrayPoolData(state^);
                  let copiedState = StateTool.deepCopyState(state);
                  let {float32ArrayPoolMap, uint16ArrayPoolMap}: typeArrayPoolData =
                    TypeArrayPoolTool.getTypeArrayPoolData(copiedState);
                  (float32ArrayPoolMap, uint16ArrayPoolMap)
                  |>
                  expect == (
                              WonderCommonlib.SparseMapSystem.createEmpty(),
                              WonderCommonlib.SparseMapSystem.createEmpty()
                            )
                }
              )
          );
          describe(
            "deep copy cameraController data",
            () =>
              test(
                "change copied state shouldn't affect source state",
                () => {
                  open CameraControllerType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    cameraController1,
                    cameraController2,
                    cameraController3
                  ) =
                    _prepareCameraControllerData(state);
                  let copiedState = StateTool.deepCopyState(state);
                  let {perspectiveCameraData} as data =
                    CameraControllerTool.getCameraControllerData(copiedState);
                  data.cameraArray
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(cameraController2);
                  data.updateCameraFuncMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(cameraController2);
                  perspectiveCameraData.nearMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(cameraController1);
                  let {cameraArray, updateCameraFuncMap, perspectiveCameraData} =
                    CameraControllerTool.getCameraControllerData(state);
                  (
                    cameraArray,
                    updateCameraFuncMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(cameraController2)
                    |> JudgeTool.isUndefined,
                    perspectiveCameraData.nearMap
                  )
                  |>
                  expect == (
                              [|
                                cameraController1,
                                cameraController2,
                                Js.Undefined.empty |> Obj.magic
                              |],
                              false,
                              [|0.1, 0.2, Js.Undefined.empty |> Obj.magic|]
                            )
                }
              )
          );
          describe(
            "restoreFromState",
            () => {
              let _testRestoreStateEqualTargetState = (state, prepareDataFunc, getDataFunc) => {
                let (state, _, _, _, _, _, _) = prepareDataFunc(state);
                let currentState = StateTool.createNewCompleteState();
                let (currentState, _, _, _, _, _, _) = prepareDataFunc(ref(currentState));
                let _ = StateTool.restoreFromState(currentState, state);
                StateTool.getState() |> getDataFunc |> expect == (state |> getDataFunc)
              };
              describe(
                "restore meshRenderer data to target state",
                () => {
                  let _prepare = (state) => {
                    let (
                      state,
                      gameObject1,
                      gameObject2,
                      gameObject3,
                      meshRenderer1,
                      meshRenderer2,
                      meshRenderer3
                    ) =
                      _prepareMeshRendererData(state);
                    let (currentState, gameObject4, meshRenderer4) =
                      MeshRendererTool.createGameObject(StateTool.createNewCompleteState());
                    (
                      (
                        state,
                        gameObject1,
                        gameObject2,
                        gameObject3,
                        meshRenderer1,
                        meshRenderer2,
                        meshRenderer3
                      ),
                      (currentState, gameObject4, meshRenderer4)
                    )
                  };
                  test(
                    "set restored state to stateData",
                    () => {
                      let ((state, _, _, _, _, _, _), (currentState, _, _)) = _prepare(state);
                      let currentState = StateTool.restoreFromState(currentState, state);
                      StateTool.getState() |> expect == currentState
                    }
                  );
                  test(
                    "change restored state should affect source state",
                    () => {
                      let ((state, _, _, _, _, _, _), (currentState, _, _)) = _prepare(state);
                      let currentState = StateTool.restoreFromState(currentState, state);
                      let (currentState, gameObject5, meshRenderer5) =
                        MeshRendererTool.createGameObject(StateTool.createNewCompleteState());
                      state
                      |> MeshRenderer.getMeshRendererGameObject(meshRenderer5)
                      |> expect == gameObject5
                    }
                  );
                  test(
                    "change restored state which is restore from deep copied state shouldn't affect source state",
                    () => {
                      let ((state, gameObject1, gameObject2, _, _, _, _), (currentState, _, _)) =
                        _prepare(state);
                      let currentState =
                        StateTool.restoreFromState(currentState, state |> StateTool.deepCopyState);
                      let (currentState, _, _) = MeshRendererTool.createGameObject(currentState);
                      MeshRendererTool.getMeshRendererData(state).renderGameObjectArray
                      |> expect == [|gameObject1, gameObject2|]
                    }
                  )
                }
              );
              describe(
                "restore transform data to target state",
                () =>
                  describe(
                    "remain current state->transformData->pool data",
                    () =>
                      test(
                        "add current state->transformData->localToWorldMatrixMap, localPositionMap typeArr to pool",
                        () => {
                          open TypeArrayPoolType;
                          let (state, _, _, _, _, _, _) = _prepareTransformData(state);
                          let (currentState, _, transform4) =
                            GameObjectTool.createGameObject(StateTool.createNewCompleteState());
                          let pos4 = ((-1.), 4., 5.);
                          let currentState =
                            Transform.setTransformLocalPosition(transform4, pos4, currentState);
                          let _ = StateTool.restoreFromState(currentState, state);
                          let {float32ArrayPoolMap} =
                            StateTool.getState() |> TypeArrayPoolTool.getTypeArrayPoolData;
                          (
                            float32ArrayPoolMap |> WonderCommonlib.SparseMapSystem.unsafeGet(16),
                            float32ArrayPoolMap |> WonderCommonlib.SparseMapSystem.unsafeGet(3)
                          )
                          |>
                          expect == (
                                      [|TransformTool.getDefaultLocalToWorldMatrix()|],
                                      [|TransformTool.changeTupleToTypeArray(pos4)|]
                                    )
                        }
                      )
                  )
              );
              describe(
                "restore geometry data to target state",
                () =>
                  describe(
                    "remain current state->geometryData->pool data",
                    () =>
                      test(
                        "add current state->geometryData->verticesMap, indicesMap typeArr to pool",
                        () => {
                          open StateDataType;
                          open TypeArrayPoolType;
                          let (
                            state,
                            gameObject1,
                            gameObject2,
                            gameObject3,
                            geometry1,
                            geometry2,
                            geometry3
                          ) =
                            _prepareGeometryData(state);
                          let (currentState, gameObject4, geometry4) =
                            BoxGeometryTool.createGameObject(StateTool.createNewCompleteState());
                          let currentState = GeometryTool.initGeometry(geometry4, currentState);
                          let _ = StateTool.restoreFromState(currentState, state);
                          let {float32ArrayPoolMap, uint16ArrayPoolMap} =
                            StateTool.getState() |> TypeArrayPoolTool.getTypeArrayPoolData;
                          (
                            float32ArrayPoolMap
                            |> WonderCommonlib.SparseMapSystem.unsafeGet(
                                 BoxGeometryTool.getDefaultVertices() |> Float32Array.length
                               ),
                            uint16ArrayPoolMap
                            |> WonderCommonlib.SparseMapSystem.unsafeGet(
                                 BoxGeometryTool.getDefaultIndices() |> Uint16Array.length
                               )
                          )
                          |>
                          expect == (
                                      [|BoxGeometryTool.getDefaultVertices()|],
                                      [|BoxGeometryTool.getDefaultIndices()|]
                                    )
                        }
                      )
                  )
              );
              describe(
                "restore vbo buffer data to target state",
                () => {
                  test(
                    "clean buffer map data",
                    () => {
                      open VboBufferType;
                      let (
                        state,
                        geometry1,
                        (bufferInMap1, bufferInMap2, bufferInMap3),
                        (buffer1, buffer2, buffer3)
                      ) =
                        _prepareVboBufferData(state^);
                      let (currentState, _, _, _) =
                        _prepareVboBufferData(StateTool.createNewCompleteState());
                      let newState = StateTool.restoreFromState(currentState, state);
                      let {vertexBufferMap, elementArrayBufferMap, modelMatrixInstanceBufferMap} =
                        newState |> VboBufferTool.getVboBufferData;
                      (vertexBufferMap, elementArrayBufferMap, modelMatrixInstanceBufferMap)
                      |> expect == ([||], [||], [||])
                    }
                  );
                  describe(
                    "remain current state->vboBufferData->pool data",
                    () =>
                      test(
                        "add current state->vboBufferData->vertexBufferMap, elementArrayBufferMap, modelMatrixInstanceBufferMap buffer to pool",
                        () => {
                          open VboBufferType;
                          let (
                            state,
                            geometry1,
                            (bufferInMap1, bufferInMap2, bufferInMap3),
                            (buffer1, buffer2, buffer3)
                          ) =
                            _prepareVboBufferData(state^);
                          let (
                            currentState,
                            _,
                            (bufferInMap4, bufferInMap5, bufferInMap6),
                            (buffer4, buffer5, buffer6)
                          ) =
                            _prepareVboBufferData(StateTool.createNewCompleteState());
                          let _ = StateTool.restoreFromState(currentState, state);
                          let {
                            vertexArrayBufferPool,
                            elementArrayBufferPool,
                            modelMatrixInstanceBufferPool
                          } =
                            StateTool.getState() |> VboBufferTool.getVboBufferData;
                          (
                            vertexArrayBufferPool,
                            elementArrayBufferPool,
                            modelMatrixInstanceBufferPool
                          )
                          |>
                          expect == (
                                      [|buffer4, bufferInMap4|],
                                      [|buffer5, bufferInMap5|],
                                      [|buffer6, bufferInMap6|]
                                    )
                        }
                      )
                  )
                }
              );
              describe(
                "restore glsl sender data to target state",
                () => {
                  test(
                    "clean last send data",
                    () => {
                      open StateDataType;
                      let (state, shaderIndex1, data1, func1, history1) =
                        _prepareGLSLSenderData(state^);
                      let (currentState, _, _, _, _) =
                        _prepareGLSLSenderData(StateTool.createNewCompleteState());
                      let newState = StateTool.restoreFromState(currentState, state);
                      let {lastSendArrayBuffer, lastSendElementArrayBuffer, lastSendMaterial} =
                        newState |> GlslSenderTool.getGLSLSenderData;
                      (lastSendArrayBuffer, lastSendElementArrayBuffer, lastSendMaterial)
                      |> expect == (None, None, None)
                    }
                  );
                  test(
                    "clean vertexAttribHistoryArray",
                    () => {
                      open StateDataType;
                      let (state, shaderIndex1, data1, func1, history1) =
                        _prepareGLSLSenderData(state^);
                      let (currentState, _, _, _, _) =
                        _prepareGLSLSenderData(StateTool.createNewCompleteState());
                      let newState = StateTool.restoreFromState(currentState, state);
                      let {vertexAttribHistoryArray} =
                        newState |> GlslSenderTool.getGLSLSenderData;
                      vertexAttribHistoryArray
                      |> expect == WonderCommonlib.ArraySystem.createEmpty()
                    }
                  )
                }
              );
              test(
                "restore material data to target state",
                () =>
                  _testRestoreStateEqualTargetState(
                    state,
                    _prepareMaterialData,
                    MaterialTool.getMaterialData
                  )
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
                              let _ = StateTool.restoreFromState(currentState, state);
                              ()
                            }
                          )
                          |> toThrowMessage(
                               "currentState and targetState ->shaderData->glslData->precision should be the same"
                             )
                        }
                      )
                  )
              );
              describe(
                "restore program data to target state",
                () =>
                  test(
                    "clean lastUsedProgram",
                    () => {
                      open ProgramType;
                      let (state, shaderIndex1, program1) = _prepareProgramData(state^);
                      let (currentState, _, _) =
                        _prepareProgramData(StateTool.createNewCompleteState());
                      let newState = StateTool.restoreFromState(currentState, state);
                      let {lastUsedProgram} = newState |> ProgramTool.getProgramData;
                      lastUsedProgram |> expect == None
                    }
                  )
              );
              describe(
                "restore deviceManager data to target state",
                () =>
                  test(
                    "use current deviceManager data->gl",
                    () => {
                      open StateDataType;
                      let (state, targetGl, _) = _prepareDeviceManagerData(state^);
                      let (currentState, currentGl, _) =
                        _prepareDeviceManagerData(StateTool.createNewCompleteState());
                      let newState = StateTool.restoreFromState(currentState, state);
                      let {gl}: deviceManagerData =
                        DeviceManagerTool.getDeviceManagerData(newState);
                      gl |> expect == currentGl
                    }
                  )
              );
              describe(
                "restore typeArrayPool data to target state",
                () =>
                  test(
                    "use current typeArrayPool data->float32ArrayPoolMap, uint16ArrayPoolMap",
                    () => {
                      open StateDataType;
                      open TypeArrayPoolType;
                      let (state, _) = _prepareTypeArrayPoolData(state^);
                      let (currentState, (currentFloat32ArrayPoolMap, currentUint16ArrayPoolMap)) =
                        _prepareTypeArrayPoolData(StateTool.createNewCompleteState());
                      let newState = StateTool.restoreFromState(currentState, state);
                      let {float32ArrayPoolMap, uint16ArrayPoolMap}: typeArrayPoolData =
                        TypeArrayPoolTool.getTypeArrayPoolData(newState);
                      (float32ArrayPoolMap, uint16ArrayPoolMap)
                      |> expect == (currentFloat32ArrayPoolMap, currentUint16ArrayPoolMap)
                    }
                  )
              );
              test(
                "restore cameraController data to target state",
                () =>
                  _testRestoreStateEqualTargetState(
                    state,
                    _prepareCameraControllerData,
                    CameraControllerTool.getCameraControllerData
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
                          |> addGameObjectMaterialComponent(gameObject, material)
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
                          |> addGameObjectMaterialComponent(gameObject, material)
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
                        let currentState =
                          currentState |> GameObjectTool.initGameObject(gameObject);
                        let initShaderCount = getCallCount(currentStateCreateProgram);
                        let _ = StateTool.restoreFromState(currentState, copiedState);
                        (currentStateCreateProgram, initShaderCount)
                      };
                      test(
                        "if targetState->shader not exist in currentState->shader, init it",
                        () => {
                          let (state, _) = _prepareInstanceGameObject(sandbox, state^);
                          let state =
                            state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                          let state = state |> DirectorTool.prepare |> DirectorTool.init;
                          let copiedState = StateTool.deepCopyState(state);
                          let currentState = StateTool.createNewCompleteState();
                          let (currentState, gameObject) =
                            _prepareBasicMaterialGameObject(sandbox, currentState);
                          let (currentStateCreateProgram, initShaderCount) =
                            _exec(currentState, copiedState, gameObject);
                          getCallCount(currentStateCreateProgram) |> expect == initShaderCount + 1
                        }
                      );
                      test(
                        "else, not init it",
                        () => {
                          let (state, _) = _prepareInstanceGameObject(sandbox, state^);
                          let (state, _) = _prepareBasicMaterialGameObject(sandbox, state);
                          let state =
                            state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                          let state = state |> DirectorTool.prepare |> DirectorTool.init;
                          let copiedState = StateTool.deepCopyState(state);
                          let currentState = StateTool.createNewCompleteState();
                          let (currentState, gameObject) =
                            _prepareBasicMaterialGameObject(sandbox, currentState);
                          let (currentStateCreateProgram, initShaderCount) =
                            _exec(currentState, copiedState, gameObject);
                          getCallCount(currentStateCreateProgram) |> expect == initShaderCount + 1
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
                        let {shaderIndexMap} as data = ShaderTool.getShaderData(state);
                        data.index = 2;
                        shaderIndexMap
                        |> WonderCommonlib.HashMapSystem.set("key1", shaderIndex1)
                        |> WonderCommonlib.HashMapSystem.set("key2", shaderIndex2);
                        let {programMap} as data = ProgramTool.getProgramData(state);
                        let program1 = Obj.magic(11);
                        let program2 = Obj.magic(12);
                        programMap
                        |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, program1)
                        |> WonderCommonlib.SparseMapSystem.set(shaderIndex2, program2);
                        data.lastUsedProgram = program2;
                        let {attributeLocationMap, uniformLocationMap} =
                          GlslLocationTool.getGLSLLocationData(state);
                        let attributeLocationData1 = Obj.magic(21);
                        let attributeLocationData2 = Obj.magic(22);
                        let uniformLocationData1 = Obj.magic(31);
                        let uniformLocationData2 = Obj.magic(32);
                        attributeLocationMap
                        |> WonderCommonlib.SparseMapSystem.set(
                             shaderIndex1,
                             attributeLocationData1
                           )
                        |> WonderCommonlib.SparseMapSystem.set(
                             shaderIndex2,
                             attributeLocationData2
                           );
                        uniformLocationMap
                        |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, uniformLocationData1)
                        |> WonderCommonlib.SparseMapSystem.set(shaderIndex2, uniformLocationData2);
                        let {shaderUniformSendNoCacheableDataMap} =
                          GlslSenderTool.getGLSLSenderData(state);
                        let shaderUniformSendNoCacheableData1 = Obj.magic(121);
                        let shaderUniformSendNoCacheableData2 = Obj.magic(122);
                        shaderUniformSendNoCacheableDataMap
                        |> WonderCommonlib.SparseMapSystem.set(
                             shaderIndex1,
                             shaderUniformSendNoCacheableData1
                           )
                        |> WonderCommonlib.SparseMapSystem.set(
                             shaderIndex2,
                             shaderUniformSendNoCacheableData2
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
                          (shaderUniformSendNoCacheableData1, shaderUniformSendNoCacheableData2)
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
                        |> WonderCommonlib.HashMapSystem.set("key3", shaderIndex2);
                        let {programMap} as data = ProgramTool.getProgramData(state);
                        let program1 = Obj.magic(101);
                        let program2 = Obj.magic(102);
                        programMap
                        |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, program1)
                        |> WonderCommonlib.SparseMapSystem.set(shaderIndex2, program2);
                        data.lastUsedProgram = program2;
                        let {attributeLocationMap, uniformLocationMap} =
                          GlslLocationTool.getGLSLLocationData(state);
                        let attributeLocationData1 = Obj.magic(201);
                        let attributeLocationData2 = Obj.magic(202);
                        let uniformLocationData1 = Obj.magic(301);
                        let uniformLocationData2 = Obj.magic(302);
                        attributeLocationMap
                        |> WonderCommonlib.SparseMapSystem.set(
                             shaderIndex1,
                             attributeLocationData1
                           )
                        |> WonderCommonlib.SparseMapSystem.set(
                             shaderIndex2,
                             attributeLocationData2
                           );
                        uniformLocationMap
                        |> WonderCommonlib.SparseMapSystem.set(shaderIndex1, uniformLocationData1)
                        |> WonderCommonlib.SparseMapSystem.set(shaderIndex2, uniformLocationData2);
                        let {shaderUniformSendNoCacheableDataMap} =
                          GlslSenderTool.getGLSLSenderData(state);
                        let shaderUniformSendNoCacheableData1 = Obj.magic(10221);
                        let shaderUniformSendNoCacheableData2 = Obj.magic(10222);
                        shaderUniformSendNoCacheableDataMap
                        |> WonderCommonlib.SparseMapSystem.set(
                             shaderIndex1,
                             shaderUniformSendNoCacheableData1
                           )
                        |> WonderCommonlib.SparseMapSystem.set(
                             shaderIndex2,
                             shaderUniformSendNoCacheableData2
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
                          (shaderUniformSendNoCacheableData1, shaderUniformSendNoCacheableData2)
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
                        let newState = StateTool.restoreFromState(currentState, targetState);
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
                                  let (
                                    newState,
                                    (currentState, _, _, _, _),
                                    (targetState, _, _, _, _)
                                  ) =
                                    _prepare(state^);
                                  let {index} = newState |> ShaderTool.getShaderData;
                                  index |> expect == 2
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
                                    |> WonderCommonlib.SparseMapSystem.unsafeGet(
                                         targetShaderIndex1
                                       )
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
                                    newState |> GlslLocationTool.getGLSLLocationData;
                                  (
                                    attributeLocationMap |> SparseMapSystem.length,
                                    attributeLocationMap
                                    |> WonderCommonlib.SparseMapSystem.unsafeGet(
                                         targetShaderIndex1
                                       )
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
                            "test shaderUniformSendNoCacheableDataMap",
                            () =>
                              test(
                                "get intersect map between current shaderUniformSendNoCacheableDataMap and target shaderUniformSendNoCacheableDataMap whose value is the one in current shaderUniformSendNoCacheableDataMap",
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
                                        currentShaderUniformSendNoCacheableData1,
                                        currentShaderUniformSendNoCacheableData2
                                      )
                                    ),
                                    (
                                      targetState,
                                      (targetShaderIndex1, _),
                                      _,
                                      _,
                                      (
                                        targetShaderUniformSendNoCacheableData1,
                                        targetShaderUniformSendNoCacheableData2
                                      )
                                    )
                                  ) =
                                    _prepare(state^);
                                  let {shaderUniformSendNoCacheableDataMap} =
                                    newState |> GlslSenderTool.getGLSLSenderData;
                                  (
                                    shaderUniformSendNoCacheableDataMap |> SparseMapSystem.length,
                                    shaderUniformSendNoCacheableDataMap
                                    |> WonderCommonlib.SparseMapSystem.unsafeGet(
                                         targetShaderIndex1
                                       )
                                  )
                                  |> expect == (1, currentShaderUniformSendNoCacheableData1)
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
      )
    }
  );