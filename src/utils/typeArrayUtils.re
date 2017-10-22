open Js.Typed_array;

open Contract;

let getMatrix4DataSize () => 16;

let getVector3DataSize () => 3;

let setFloat3 (index: int) (data: Js.Array.t float) (typeArray: Float32Array.t) => {
  requireCheck (
    fun () =>
      Contract.Operators.(test "data.length should === 3" (fun () => Js.Array.length data == 3))
  );
  Float32Array.setArrayOffset data index typeArray;
  typeArray
};

let setFloat16 (index: int) (data: Js.Array.t float) (typeArray: Float32Array.t) => {
  requireCheck (
    fun () =>
      Contract.Operators.(test "data.length should === 16" (fun () => Js.Array.length data == 16))
  );
  Float32Array.setArrayOffset data index typeArray;
  typeArray
};