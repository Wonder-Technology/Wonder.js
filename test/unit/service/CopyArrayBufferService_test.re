open Wonder_jest;

let _ =
  describe(
    "CopyArrayBufferService",
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
        "copyArrayBufferData",
        () =>
          describe(
            "copy source buffer to target buffer",
            () => {
              let _prepare = (state) => {
                let count = 3;
                let sourceBuffer = TransformTool.createBuffer(count);
                let (sourceLocalToWorldMatrices, sourceLocalPositions) =
                  TransformTool.createTypeArrays(sourceBuffer, count)
                  |> TransformTool.setDefaultTypeArrData(count, state^);
                let targetBuffer = TransformTool.createBuffer(count);
                let (targetLocalToWorldMatrices, targetLocalPositions) =
                  TransformTool.createTypeArrays(targetBuffer, count);
                let transform = 0;
                let matrixArr = [|
                  1.,
                  0.,
                  0.,
                  0.,
                  0.,
                  1.,
                  0.,
                  0.,
                  0.,
                  0.,
                  1.,
                  0.,
                  10.,
                  11.,
                  12.,
                  1.
                |];
                let position = (1., 2., 3.);
                let sourceLocalToWorldMatrices =
                  RecordTransformMainService.setLocalToWorldMatrix(
                    transform,
                    matrixArr,
                    sourceLocalToWorldMatrices
                  );
                let sourceLocalPositions =
                  RecordTransformMainService.setLocalPositionByTuple(
                    transform,
                    position,
                    sourceLocalPositions
                  );
                let copiedBuffer =
                  CopyArrayBufferService.copyArrayBufferData(sourceBuffer, targetBuffer);
                (
                  state^,
                  transform,
                  (targetLocalToWorldMatrices, targetLocalPositions),
                  (matrixArr, position)
                )
              };
              test(
                "test1",
                () => {
                  let (
                    state,
                    transform,
                    (targetLocalToWorldMatrices, targetLocalPositions),
                    (matrixArr, position)
                  ) =
                    _prepare(state);
                  (
                    RecordTransformMainService.getLocalToWorldMatrixTypeArray(
                      transform,
                      targetLocalToWorldMatrices
                    ),
                    RecordTransformMainService.getLocalPositionTuple(
                      transform,
                      targetLocalPositions
                    )
                  )
                  |> expect == (Js.Typed_array.Float32Array.make(matrixArr), position)
                }
              );
              test(
                "test2",
                () => {
                  let (
                    state,
                    transform,
                    (targetLocalToWorldMatrices, targetLocalPositions),
                    (matrixArr, position)
                  ) =
                    _prepare(state);
                  (
                    RecordTransformMainService.getLocalToWorldMatrixTypeArray(
                      transform + 1,
                      targetLocalToWorldMatrices
                    ),
                    RecordTransformMainService.getLocalPositionTuple(
                      transform + 1,
                      targetLocalPositions
                    )
                  )
                  |>
                  expect == (
                              TransformTool.getDefaultLocalToWorldMatrixTypeArray(state),
                              TransformTool.getDefaultLocalPositionTuple(state)
                            )
                }
              )
            }
          )
      )
    }
  );