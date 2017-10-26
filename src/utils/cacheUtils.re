open StateDataType;

let memorizeIntState bodyFunc getCacheMapFunc (param: int) (state: state) => {
  let cachedMap = getCacheMapFunc state [@bs];
  let key = Js.Int.toString param;
  switch (HashMapSystem.get key cachedMap) {
  | None =>
    let value = bodyFunc param state [@bs];
    HashMapSystem.set key value cachedMap |> ignore;
    value
  | Some value => value
  }
};