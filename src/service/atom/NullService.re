let isNotInMap = value => value === Obj.magic(Js.Nullable.undefined);

let isInMap = value => value !== Obj.magic(Js.Nullable.undefined);

let isInArray = value => value !== Obj.magic(Js.Nullable.undefined);