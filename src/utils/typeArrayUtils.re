open Js.Typed_array;

open Contract;

let getMatrix4DataSize () => 16;

let getVector3DataSize () => 3;

let getFloat3 (index: int) (typeArray: Float32Array.t) (out: array float) => [|
  Float32Array.unsafe_get typeArray index,
  Float32Array.unsafe_get typeArray (index + 1),
  Float32Array.unsafe_get typeArray (index + 2)
|];

let setFloat3 (index: int) (data: ArraySystem.t float) (typeArray: Float32Array.t) => {
  requireCheck (
    fun () =>
      Contract.Operators.(test "data.length should === 3" (fun () => ArraySystem.length data == 3))
  );
  Float32Array.setArrayOffset data index typeArray;
  typeArray
};

let setFloat16 (index: int) (data: ArraySystem.t float) (typeArray: Float32Array.t) => {
  requireCheck (
    fun () =>
      Contract.Operators.(
        test "data.length should === 16" (fun () => ArraySystem.length data == 16)
      )
  );
  Float32Array.setArrayOffset data index typeArray;
  typeArray
};