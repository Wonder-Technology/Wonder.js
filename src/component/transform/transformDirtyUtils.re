open TransformType;

let addToDirtyArray = (index: int, {dirtyArray}: transformData) =>
  Js.Array.push(index, dirtyArray);

let batchAddToDirtyArray = (indexArr: array(int), {dirtyArray} as data) =>
  data.dirtyArray = dirtyArray |> Js.Array.concat(indexArr);