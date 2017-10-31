open StateDataType;

let memorizeIntState = (bodyFunc, getCacheMapFunc, param: int, state: state) => {
  let cachedMap = [@bs] getCacheMapFunc(state);
  let key = Js.Int.toString(param);
  switch (HashMapSystem.get(key, cachedMap)) {
  | None =>
    let value = [@bs] bodyFunc(param, state);
    HashMapSystem.set(key, value, cachedMap) |> ignore;
    value
  | Some(value) => value
  }
};
