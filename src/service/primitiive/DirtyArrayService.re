let create = () => WonderCommonlib.ArrayService.createEmpty();

let addToDirtyArray = (isDirty, dirtyArray) => dirtyArray |> ArrayService.push(isDirty);

let getCount = (dirtyArray) => dirtyArray |> Js.Array.length;