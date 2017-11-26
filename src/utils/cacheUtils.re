open StateDataType;

open CacheType;
/* 
let memorizeIntState = (bodyFunc, getCacheMapFunc, param: int, state: state) => {
  let cachedMap = [@bs] getCacheMapFunc(state);
  let key = (param);
  switch (SparseMapSystem.get(key, cachedMap)) {
  | None =>
    let value = [@bs] bodyFunc(param, state);
    SparseMapSystem.set(key, value, cachedMap) |> ignore;
    value
  | Some(value) => value
  }
}; */

let memorizeIntState = (bodyFunc, getCacheMapFunc, param: int, state: state) => {
  let cachedMap = [@bs] getCacheMapFunc(state);
  let key = (param);
  switch (SparseMapSystem.get(key, cachedMap)) {
  | None =>
    let value = [@bs] bodyFunc(param, state);
    SparseMapSystem.set(key, value, cachedMap) |> ignore;
    value
  | Some(value) => value
  }
};

/* let mapDataInCacheType = (data:cache('a), mapFunc) =>{
  switch(data){
  | Cache(data) => Cache([@bs]mapFunc(data))
  | New(data) => New([@bs]mapFunc(data))
  }
}; */