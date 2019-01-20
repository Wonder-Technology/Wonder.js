open Wonder_jest;

describe("InstanceBufferRenderService", () => {
  open Expect;
  open Expect.Operators;
  open Sinon;
  let sandbox = getSandboxDefaultVal();
  let state = ref(MainStateTool.createState());
  beforeEach(() => {
    sandbox := createSandbox();
    state := TestTool.init(~sandbox, ());
  });
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
  describe("getOrCreateMatrixFloat32Array", () =>
    test("test get typeArr from pool", () => {
      let sourceInstance = 0;
      let defaultCapacity = 12;
      let capacityMap = WonderCommonlib.MutableSparseMapService.createEmpty();
      let matrixFloat32ArrayMap =
        WonderCommonlib.MutableSparseMapService.createEmpty();
      let typeArr1 = Js.Typed_array.Float32Array.make([|0., 0., 1.|]);
      TypeArrayPoolTool.addFloat32TypeArrayToPool(.
        typeArr1,
        1000,
        TypeArrayPoolService.getFloat32ArrayPoolMap(
          state^.typeArrayPoolRecord,
        ),
      )
      |> ignore;
      let typeArr2 =
        InstanceBufferRenderService.getOrCreateMatrixFloat32Array(
          sourceInstance,
          defaultCapacity,
          (capacityMap, matrixFloat32ArrayMap),
          state^ |> RenderStateTool.createState,
        );
      (
        typeArr2,
        WonderCommonlib.MutableSparseMapService.unsafeGet(
          typeArr1 |> Js.Typed_array.Float32Array.length,
          TypeArrayPoolTool.getFloat32ArrayPoolMap(
            state^.typeArrayPoolRecord,
          ),
        )
        |> Js.Array.length,
      )
      |> expect == (typeArr1, 0);
    })
  );
});