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

let memorizeLocalToWorldMatrix =
    (bodyFunc, getCacheMapFunc, isCacheInvalidFunc, param: int, state: state) =>
  switch ([@bs] isCacheInvalidFunc(param, state)) {
  | false =>
    let cachedMap = [@bs] getCacheMapFunc(state);
    switch (WonderCommonlib.SparseMapSystem.get(param, cachedMap)) {
    | None =>
      let value = [@bs] bodyFunc(param, state);
      WonderCommonlib.SparseMapSystem.set(param, value, cachedMap) |> ignore;
      value
    | Some(value) => value
    }
  | true =>
    let cachedMap = [@bs] getCacheMapFunc(state);
    let value = [@bs] bodyFunc(param, state);
    WonderCommonlib.SparseMapSystem.set(param, value, cachedMap) |> ignore;
    value
  };
/* let mapDataInCacheType = (data:cache('a), mapFunc) =>{
     switch(data){
     | Cache(data) => Cache([@bs]mapFunc(data))
     | New(data) => New([@bs]mapFunc(data))
     }
   }; */