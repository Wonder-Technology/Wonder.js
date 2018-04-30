open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "TypeArrayPool",
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
        "addFloat32TypeArrayToPool",
        () =>
          describe(
            "limit pool max size",
            () =>
              test(
                "if exceed max size, not add",
                () => {
                  let maxSize = 1;
                  let map = WonderCommonlib.SparseMapService.createEmpty();
                  let count = 1;
                  let typeArr1 = Float32Array.make([|1.|]);
                  let typeArr2 = Float32Array.make([|2.|]);
                  let map =
                    [@bs] TypeArrayPoolTool.addFloat32TypeArrayToPool(typeArr1, maxSize, map);
                  let map =
                    [@bs] TypeArrayPoolTool.addFloat32TypeArrayToPool(typeArr2, maxSize, map);
                  map
                  |> WonderCommonlib.SparseMapService.unsafeGet(count)
                  |> SparseMapService.length
                  |> expect == 1
                }
              )
          )
      );
      describe(
        "addUint16TypeArrayToPool",
        () =>
          describe(
            "limit pool max size",
            () =>
              test(
                "if exceed max size, not add",
                () => {
                  let maxSize = 1;
                  let map = WonderCommonlib.SparseMapService.createEmpty();
                  let count = 1;
                  let typeArr1 = Uint16Array.make([|1|]);
                  let typeArr2 = Uint16Array.make([|2|]);
                  let map =
                    [@bs] TypeArrayPoolTool.addUint16TypeArrayToPool(typeArr1, maxSize, map);
                  let map =
                    [@bs] TypeArrayPoolTool.addUint16TypeArrayToPool(typeArr2, maxSize, map);
                  map
                  |> WonderCommonlib.SparseMapService.unsafeGet(count)
                  |> SparseMapService.length
                  |> expect == 1
                }
              )
          )
      )
    }
  );