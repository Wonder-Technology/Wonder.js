open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test redo,undo other data", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    let _prepareDeviceManagerData = state => {
      open DeviceManagerType;
      let record = DeviceManagerTool.getDeviceManagerRecord(state);
      let gl = Obj.magic(RandomTool.getRandomFloat(10.));
      let colorWrite = Some((true, true, true, false));
      let clearColor = Some((1., 0.1, 0.2, 1.));
      let side = Some(BOTH);
      let depthTest = Some(true);
      let viewport = Some((1., 0.1, 10., 20.));
      (
        {
          ...state,
          deviceManagerRecord: {
            gl: Some(gl),
            colorWrite,
            clearColor,
            side,
            depthTest,
            viewport,
          },
        },
        Some(gl),
        (colorWrite, clearColor, side, depthTest, viewport),
      );
    };
    let _prepareTypeArrayPoolData = state => {
      open StateDataMainType;
      let float32ArrayPoolMap = [|
        [|Float32Array.make([|RandomTool.getRandomFloat(3.)|])|],
      |];
      let uint16ArrayPoolMap = [|
        [|Uint16Array.make([|RandomTool.getRandomInt(3)|])|],
      |];
      (
        {
          ...state,
          typeArrayPoolRecord: {
            float32ArrayPoolMap,
            uint16ArrayPoolMap,
          },
        },
        (float32ArrayPoolMap, uint16ArrayPoolMap),
      );
    };
    let _prepareVboBufferData = state => {
      open VboBufferType;
      let {
        customGeometryVertexBufferMap,
        customGeometryTexCoordBufferMap,
        customGeometryNormalBufferMap,
        customGeometryElementArrayBufferMap,
        matrixInstanceBufferMap,
        vertexArrayBufferPool,
        elementArrayBufferPool,
        matrixInstanceBufferPool,
      } =
        VboBufferTool.getVboBufferRecord(state);
      let buffer1 = Obj.magic(0);
      let buffer2 = Obj.magic(1);
      let buffer3 = Obj.magic(2);
      let buffer4 = Obj.magic(3);
      let buffer5 = Obj.magic(4);
      /* let buffer6 = Obj.magic(5); */
      vertexArrayBufferPool |> Js.Array.push(buffer1) |> ignore;
      vertexArrayBufferPool |> Js.Array.push(buffer2) |> ignore;
      vertexArrayBufferPool |> Js.Array.push(buffer3) |> ignore;
      elementArrayBufferPool |> Js.Array.push(buffer4) |> ignore;
      matrixInstanceBufferPool |> Js.Array.push(buffer5) |> ignore;
      let geometry1 = 0;
      let bufferInMap1 = Obj.magic(10);
      let bufferInMap2 = Obj.magic(11);
      let bufferInMap3 = Obj.magic(12);
      let bufferInMap4 = Obj.magic(13);
      let bufferInMap5 = Obj.magic(14);
      customGeometryVertexBufferMap
      |> WonderCommonlib.SparseMapService.set(geometry1, bufferInMap1);
      customGeometryTexCoordBufferMap
      |> WonderCommonlib.SparseMapService.set(geometry1, bufferInMap2);
      customGeometryNormalBufferMap
      |> WonderCommonlib.SparseMapService.set(geometry1, bufferInMap3);
      customGeometryElementArrayBufferMap
      |> WonderCommonlib.SparseMapService.set(geometry1, bufferInMap4);
      matrixInstanceBufferMap
      |> WonderCommonlib.SparseMapService.set(geometry1, bufferInMap5);
      (
        state,
        geometry1,
        (
          bufferInMap1,
          bufferInMap2,
          bufferInMap3,
          bufferInMap4,
          bufferInMap5,
        ),
        (buffer1, buffer2, buffer3, buffer4, buffer5),
      );
    };
    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.initWithJobConfig(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("deepCopyForRestore", () => {
      describe("deep copy deviceManager record", () => {
        test("clear gl", () => {
          open DeviceManagerType;
          let (state, gl, _) = _prepareDeviceManagerData(state^);
          let copiedState = MainStateTool.deepCopyForRestore(state);
          let {gl}: deviceManagerRecord =
            DeviceManagerTool.getDeviceManagerRecord(copiedState);
          gl |> expect == None;
        });
        test("directly use readonly record", () => {
          open StateDataMainType;
          let (
            state,
            gl,
            (colorWrite, clearColor, side, depthTest, viewport),
          ) =
            _prepareDeviceManagerData(state^);
          let copiedState = MainStateTool.deepCopyForRestore(state);
          let targetData = DeviceManagerTool.getDeviceManagerRecord(state);
          let copiedData =
            DeviceManagerTool.getDeviceManagerRecord(copiedState);
          (
            copiedData.colorWrite,
            copiedData.clearColor,
            copiedData.side,
            copiedData.depthTest,
            copiedData.viewport,
          )
          |>
          expect == (
                      targetData.colorWrite,
                      targetData.clearColor,
                      targetData.side,
                      targetData.depthTest,
                      targetData.viewport,
                    );
        });
      });
      describe("deep copy vbo buffer record", () =>
        test("clear all buffer map and all buffer pool record", () => {
          open VboBufferType;
          let (state, _, _, _) = _prepareVboBufferData(state^);
          let copiedState = MainStateTool.deepCopyForRestore(state);
          let {
            customGeometryVertexBufferMap,
            customGeometryTexCoordBufferMap,
            customGeometryNormalBufferMap,
            customGeometryElementArrayBufferMap,
            matrixInstanceBufferMap,
            vertexArrayBufferPool,
            elementArrayBufferPool,
            matrixInstanceBufferPool,
          } =
            VboBufferTool.getVboBufferRecord(copiedState);
          (
            customGeometryVertexBufferMap,
            customGeometryTexCoordBufferMap,
            customGeometryNormalBufferMap,
            customGeometryElementArrayBufferMap,
            matrixInstanceBufferMap,
            vertexArrayBufferPool,
            elementArrayBufferPool,
            matrixInstanceBufferPool,
          )
          |> expect == ([||], [||], [||], [||], [||], [||], [||], [||]);
        })
      );
      describe("deep copy typeArrayPool record", () =>
        test("clear pool map", () => {
          open StateDataMainType;
          open TypeArrayPoolType;
          let (state, _) = _prepareTypeArrayPoolData(state^);
          let copiedState = MainStateTool.deepCopyForRestore(state);
          let {float32ArrayPoolMap, uint16ArrayPoolMap}: typeArrayPoolRecord =
            copiedState.typeArrayPoolRecord;
          (float32ArrayPoolMap, uint16ArrayPoolMap)
          |>
          expect == (
                      WonderCommonlib.SparseMapService.createEmpty(),
                      WonderCommonlib.SparseMapService.createEmpty(),
                    );
        })
      );
    });
    describe("restore", () => {
      describe("restore render record to target state", () => {
        test("clear cameraRecord", () => {
          open RenderType;
          let state = state^;
          let state = {
            ...state,
            renderRecord:
              Some({
                ...RenderTool.getRenderRecord(state),
                cameraRecord: Some(Obj.magic(1)),
              }),
          };
          let _ =
            MainStateTool.restore(
              MainStateTool.createNewCompleteState(sandbox),
              state,
            );
          let {cameraRecord} =
            RenderTool.getRenderRecord(MainStateTool.unsafeGetState());
          cameraRecord |> expect == None;
        });
        test(
          "basicRenderObjectRecord, lightRenderObjectRecord use targetState's corresponding record",
          () => {
            open RenderType;
            let state = state^;
            let targetBasicRenderObjectRecord = Some(Obj.magic(10));
            let targetLightRenderObjectRecord = Some(Obj.magic(11));
            let state = {
              ...state,
              renderRecord:
                Some({
                  ...RenderTool.getRenderRecord(state),
                  basicRenderObjectRecord: targetBasicRenderObjectRecord,
                  lightRenderObjectRecord: targetLightRenderObjectRecord,
                }),
            };
            let _ =
              MainStateTool.restore(
                MainStateTool.createNewCompleteState(sandbox),
                state,
              );
            let {basicRenderObjectRecord, lightRenderObjectRecord} =
              RenderTool.getRenderRecord(MainStateTool.unsafeGetState());
            (basicRenderObjectRecord, lightRenderObjectRecord)
            |>
            expect == (
                        targetBasicRenderObjectRecord,
                        targetLightRenderObjectRecord,
                      );
          },
        );
      });
      describe("restore global temp record to target state", () =>
        test("use current record->float16Array1", () => {
          open GlobalTempType;
          let state = state^;
          let currentState = MainStateTool.createNewCompleteState(sandbox);
          let record = currentState.globalTempRecord;
          record.float16Array1 = Float32Array.make([|2.|]);
          let _ = MainStateTool.restore(currentState, state);
          let {float16Array1} =
            MainStateTool.unsafeGetState().globalTempRecord;
          float16Array1 |> expect == record.float16Array1;
        })
      );
      describe("restore vbo buffer record to target state", () => {
        test("clear buffer map record", () => {
          open VboBufferType;
          let (state, _, _, _) = _prepareVboBufferData(state^);
          let (currentState, _, _, _) =
            _prepareVboBufferData(
              MainStateTool.createNewCompleteState(sandbox),
            );
          let newState = MainStateTool.restore(currentState, state);
          let {
            customGeometryVertexBufferMap,
            customGeometryTexCoordBufferMap,
            customGeometryNormalBufferMap,
            customGeometryElementArrayBufferMap,
            matrixInstanceBufferMap,
          } =
            newState |> VboBufferTool.getVboBufferRecord;
          (
            customGeometryVertexBufferMap,
            customGeometryTexCoordBufferMap,
            customGeometryNormalBufferMap,
            customGeometryElementArrayBufferMap,
            matrixInstanceBufferMap,
          )
          |> expect == ([||], [||], [||], [||], [||]);
        });
        test(
          "add current state->vboBufferRecord->customGeometryVertexBufferMap, customGeometryTexCoordBufferMap, customGeometryNormalBufferMap, customGeometryElementArrayBufferMap, matrixInstanceBufferMap buffer to pool",
          () => {
            open VboBufferType;
            let (
              state,
              geometry1,
              (
                bufferInMap1,
                bufferInMap2,
                bufferInMap3,
                bufferInMap4,
                bufferInMap5,
              ),
              (buffer1, buffer2, buffer3, buffer4, buffer5),
            ) =
              _prepareVboBufferData(state^);
            let (
              currentState,
              _,
              (
                bufferInMap6,
                bufferInMap7,
                bufferInMap8,
                bufferInMap9,
                bufferInMap10,
              ),
              (buffer6, buffer7, buffer8, buffer9, buffer10),
            ) =
              _prepareVboBufferData(
                MainStateTool.createNewCompleteState(sandbox),
              );
            let _ = MainStateTool.restore(currentState, state);
            let {
              vertexArrayBufferPool,
              elementArrayBufferPool,
              matrixInstanceBufferPool,
            } =
              MainStateTool.unsafeGetState()
              |> VboBufferTool.getVboBufferRecord;
            (
              vertexArrayBufferPool,
              elementArrayBufferPool,
              matrixInstanceBufferPool,
            )
            |>
            expect == (
                        [|
                          buffer6,
                          buffer7,
                          buffer8,
                          bufferInMap6,
                          bufferInMap7,
                          bufferInMap8,
                        |],
                        [|buffer9, bufferInMap9|],
                        [|buffer10, bufferInMap10|],
                      );
          },
        );
      });
    });
  });