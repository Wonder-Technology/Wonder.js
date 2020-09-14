open Js.Typed_array;

module Float32Array = {
  let slice = (typeArray, start, end_) => {
    Float32Array.slice(~start, ~end_, typeArray);
  };
};
