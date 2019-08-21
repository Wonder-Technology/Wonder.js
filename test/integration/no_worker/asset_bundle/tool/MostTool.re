open WonderBsMost;

open Js.Promise;

let testStream = (testFunc, stream) => {
  let valueRef = ref(Obj.magic(-1));

  stream
  |> Most.forEach(value => valueRef := value)
  |> then_(() => testFunc(valueRef^ |> Obj.magic));
};

