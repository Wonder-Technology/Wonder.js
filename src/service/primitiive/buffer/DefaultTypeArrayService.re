/* let rec setDefaultValues = ((index, count, data), setFunc, typeArr) =>
  switch index {
  | index when index >= count => typeArr
  | index =>
    [@bs] setFunc(index, data, typeArr)
    |> setDefaultValues((index + 1, count, data |> Obj.magic), setFunc)
  }; */