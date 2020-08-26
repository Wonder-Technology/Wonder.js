let reduceOneParam = (arr, func, param) => {
  Belt.Array.reduce(arr, param, func);
};

let includes = (arr, value) => {
  Js.Array.includes(value, arr);
};
