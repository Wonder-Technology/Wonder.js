open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "test redo,undo other data",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _prepareDeviceManagerData = (state) => {
        let data = DeviceManagerTool.getDeviceManagerData(state);
        let gl = Obj.magic(RandomTool.getRandomFloat(10.));
        let colorWrite = Some((Js.true_, Js.true_, Js.true_, Js.false_));
        let clearColor = Some((1., 0.1, 0.2, 1.));
        let viewport = Some((1., 0.1, 10., 20.));
        (
          {...state, deviceManagerData: {gl: Some(gl), colorWrite, clearColor, viewport}},
          Some(gl),
          (colorWrite, clearColor, viewport)
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
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.initWithJobConfig(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "deepCopyStateForRestore",
        () => {
          describe(
            "deep copy deviceManager data",
            () => {
              test(
                "clean gl",
                () => {
                  open StateDataType;
                  let (state, gl, _) = _prepareDeviceManagerData(state^);
                  let copiedState = StateTool.deepCopyStateForRestore(state);
                  let {gl}: deviceManagerData =
                    DeviceManagerTool.getDeviceManagerData(copiedState);
                  gl |> expect == None
                }
              );
              test(
                "directly use readonly data",
                () => {
                  open StateDataType;
                  let (state, gl, (colorWrite, clearColor, viewport)) =
                    _prepareDeviceManagerData(state^);
                  let copiedState = StateTool.deepCopyStateForRestore(state);
                  let targetData = DeviceManagerTool.getDeviceManagerData(state);
                  let copiedData = DeviceManagerTool.getDeviceManagerData(copiedState);
                  (copiedData.colorWrite, copiedData.clearColor, copiedData.viewport)
                  |> expect == (targetData.colorWrite, targetData.clearColor, targetData.viewport)
                }
              )
            }
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
                  let copiedState = StateTool.deepCopyStateForRestore(state);
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
          describe(
            "deep copy typeArrayPool data",
            () =>
              test(
                "clean pool map",
                () => {
                  open StateDataType;
                  open TypeArrayPoolType;
                  let (state, _) = _prepareTypeArrayPoolData(state^);
                  let copiedState = StateTool.deepCopyStateForRestore(state);
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
          )
        }
      );
      describe(
        "restore",
        () => {
          describe(
            "restore render data to target state",
            () =>
              /* TODO test more render data */
              test(
                "clean renderArray, cameraData",
                () => {
                  open RenderDataType;
                  let state = state^;
                  /* let data = RenderDataTool.getRenderData(state);
                     data.renderArray = Some([|0|]);
                     data.cameraData = Some(Obj.magic(1)); */
                  let state = {
                    ...state,
                    renderData: {
                      ...RenderDataTool.getRenderData(state),
                      renderArray: Some([|0|]),
                      cameraData: Some(Obj.magic(1))
                    }
                  };
                  let _ = StateTool.restore(StateTool.createNewCompleteState(), state);
                  let {renderArray, cameraData} =
                    RenderDataTool.getRenderData(StateTool.getState());
                  (renderArray, cameraData) |> expect == (None, None)
                }
              )
          );
          describe(
            "restore global temp data to target state",
            () =>
              test(
                "use current data->float32Array1",
                () => {
                  open GlobalTempType;
                  let state = state^;
                  let currentState = StateTool.createNewCompleteState();
                  let data = GlobalTempStateCommon.getGlobalTempData(currentState);
                  data.float32Array1 = Float32Array.make([|2.|]);
                  let _ = StateTool.restore(currentState, state);
                  let {float32Array1} = GlobalTempTool.getGlobalTempData(StateTool.getState());
                  float32Array1 |> expect == data.float32Array1
                }
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
                  let newState = StateTool.restore(currentState, state);
                  let {vertexBufferMap, elementArrayBufferMap, modelMatrixInstanceBufferMap} =
                    newState |> VboBufferTool.getVboBufferData;
                  (vertexBufferMap, elementArrayBufferMap, modelMatrixInstanceBufferMap)
                  |> expect == ([||], [||], [||])
                }
              );
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
                  let _ = StateTool.restore(currentState, state);
                  let {
                    vertexArrayBufferPool,
                    elementArrayBufferPool,
                    modelMatrixInstanceBufferPool
                  } =
                    StateTool.getState() |> VboBufferTool.getVboBufferData;
                  (vertexArrayBufferPool, elementArrayBufferPool, modelMatrixInstanceBufferPool)
                  |>
                  expect == (
                              [|buffer4, bufferInMap4|],
                              [|buffer5, bufferInMap5|],
                              [|buffer6, bufferInMap6|]
                            )
                }
              )
            }
          )
        }
      )
    }
  );