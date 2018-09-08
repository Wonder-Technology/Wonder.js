let create = () => WonderCommonlib.ArrayService.createEmpty();

let addToDirtyArray = (index, dirtyArray) =>
  dirtyArray |> ArrayService.push(index);

let removeFromDirtyArray = (index, dirtyArray) =>
  dirtyArray |> Js.Array.filter(dirtyIndex => dirtyIndex !== index);

let getCount = dirtyArray => dirtyArray |> Js.Array.length;