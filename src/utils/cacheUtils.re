open StateDataType;

let memorizeIntState = (bodyFunc, getCacheMapFunc, param: int, state: state) => {
  let cachedMap = [@bs] getCacheMapFunc(state);
  switch (WonderCommonlib.SparseMapSystem.get(param, cachedMap)) {
  | None =>
    let value = [@bs] bodyFunc(param, state);
    WonderCommonlib.SparseMapSystem.set(param, value, cachedMap) |> ignore;
    value
  | Some(value) => value
  }
};