let reduceOneParam = (arr, func, param) => {
  Belt.Array.reduceU(arr, param, func);
};

let reduceOneParami = (arr, func, param) => {
  let mutableParam = ref(param);
  for (i in 0 to Js.Array.length(arr) - 1) {
    mutableParam := func(. mutableParam^, Array.unsafe_get(arr, i), i);
  };
  mutableParam^;
};

let includes = (arr, value) => {
  Js.Array.includes(value, arr);
};

let sliceFrom = (arr, index) => Js.Array.sliceFrom(index, arr);

let unsafeGetFirst = arr => Array.unsafe_get(arr, 0);

let push = (arr, value) => {
  Js.Array.push(value, arr)->ignore;

  arr;
};
