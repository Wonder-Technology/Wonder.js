open StateDataMainType;

let reduceState = (func, state, arr) : state => {
  let mutableState = ref(state);
  for (i in 0 to Js.Array.length(arr) - 1) {
    mutableState := [@bs] func(mutableState^, Array.unsafe_get(arr, i))
  };
  mutableState^
};

/* let reduceStatei = (func, state, arr) : state => {
  let mutableState = ref(state);
  for (i in 0 to Js.Array.length(arr) - 1) {
    mutableState := [@bs] func(mutableState^, Array.unsafe_get(arr, i), i)
  };
  mutableState^
}; */