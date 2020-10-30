open Js.Typed_array;

module Float32Array = {
  let slice = (typeArray, start, end_) => {
    Float32Array.slice(~start, ~end_, typeArray);
  };
};

module Uint8Array = {
  let slice = (typeArray, start, end_) => {
    Uint8Array.slice(~start, ~end_, typeArray);
  };
};
