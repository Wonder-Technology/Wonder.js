open Wonder_jest;

open ArrayBufferPoolType;

let _ =
  describe(
    "ArrayBuffer Pool",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "copyAllArrayBuffersToPool",
        () => {
          test(
            "copy customGeometry, basicMaterial, lightMateiral, transform, ambientLight, directionLight, pointLight array buffers to state",
            () => {
              let state = ArrayBufferAPI.copyAllArrayBuffersToPool(1, state^);
              (
                ArrayBufferPoolTool.isBufferEqual(
                  ArrayBufferPoolTool.getFirstBuffer(CustomGeometryArrayBuffer, state),
                  CustomGeometryTool.getRecord(state).buffer
                ),
                ArrayBufferPoolTool.isBufferEqual(
                  ArrayBufferPoolTool.getFirstBuffer(TransformArrayBuffer, state),
                  TransformTool.getRecord(state).buffer
                ),
                ArrayBufferPoolTool.isBufferEqual(
                  ArrayBufferPoolTool.getFirstBuffer(BasicMaterialArrayBuffer, state),
                  BasicMaterialTool.getRecord(state).buffer
                ),
                ArrayBufferPoolTool.isBufferEqual(
                  ArrayBufferPoolTool.getFirstBuffer(LightMaterialArrayBuffer, state),
                  LightMaterialTool.getRecord(state).buffer
                ),
                ArrayBufferPoolTool.isBufferEqual(
                  ArrayBufferPoolTool.getFirstBuffer(AmbientLightArrayBuffer, state),
                  AmbientLightTool.getRecord(state).buffer
                ),
                ArrayBufferPoolTool.isBufferEqual(
                  ArrayBufferPoolTool.getFirstBuffer(DirectionLightArrayBuffer, state),
                  DirectionLightTool.getRecord(state).buffer
                ),
                ArrayBufferPoolTool.isBufferEqual(
                  ArrayBufferPoolTool.getFirstBuffer(PointLightArrayBuffer, state),
                  PointLightTool.getRecord(state).buffer
                )
              )
              |> expect == (true, true, true, true, true, true, true)
            }
          );
          test(
            "test copy specific count of array buffers",
            () => {
              let state = ArrayBufferAPI.copyAllArrayBuffersToPool(2, state^);
              (
                ArrayBufferPoolTool.getBufferList(CustomGeometryArrayBuffer, state) |> List.length,
                ArrayBufferPoolTool.getBufferList(PointLightArrayBuffer, state) |> List.length
              )
              |> expect == (2, 2)
            }
          );
          describe(
            "contract check",
            () =>
              test(
                "count should >= 1",
                () =>
                  expect(
                    () => {
                      let state = ArrayBufferAPI.copyAllArrayBuffersToPool(0, state^);
                      ()
                    }
                  )
                  |> toThrowMessage("expect count >= 1")
              )
          )
        }
      );
      describe(
        "copyArrayBuffer",
        () => {
          test(
            "if poolMap has buffer, get it out of map",
            () => {
              let state = ArrayBufferAPI.copyAllArrayBuffersToPool(1, state^);
              let buffer = ArrayBufferPoolTool.createArrayBuffer(100);
              let (state, copiedBuffer) =
                ArrayBufferPoolTool.copyArrayBuffer(buffer, TransformArrayBuffer, state);
              (
                ArrayBufferPoolTool.isBufferEqual(copiedBuffer, buffer),
                ArrayBufferPoolTool.getBufferList(TransformArrayBuffer, state) |> List.length
              )
              |> expect == (false, 0)
            }
          );
          test(
            "else, copy buffer",
            () => {
              let state = ArrayBufferAPI.copyAllArrayBuffersToPool(1, state^);
              let buffer = ArrayBufferPoolTool.createArrayBuffer(100);
              let (state, copiedBuffer1) =
                ArrayBufferPoolTool.copyArrayBuffer(buffer, TransformArrayBuffer, state);
              let (state, copiedBuffer2) =
                ArrayBufferPoolTool.copyArrayBuffer(buffer, TransformArrayBuffer, state);
              (
                ArrayBufferPoolTool.isBufferEqual(copiedBuffer2, buffer),
                ArrayBufferPoolTool.getBufferList(TransformArrayBuffer, state) |> List.length
              )
              |> expect == (true, 0)
            }
          )
        }
      )
    }
  );