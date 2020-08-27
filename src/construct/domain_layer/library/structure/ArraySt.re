let reduceOneParam = (arr, func, param) => {
  Belt.Array.reduceU(arr, param, func);
};

let includes = (arr, value) => {
  Js.Array.includes(value, arr);
};

let sliceFrom = (arr, index) => Js.Array.sliceFrom(index, arr);
