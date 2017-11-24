open TransformType;

let addToDirtyArray = (index: int, {dirtyArray} as data) => {
  Js.Array.push(index, dirtyArray) |> ignore;
  data
};

let batchAddToDirtyArray = (indexArr: array(int), {dirtyArray} as data) => {
  data.dirtyArray = dirtyArray |> Js.Array.concat(indexArr);
  data
};