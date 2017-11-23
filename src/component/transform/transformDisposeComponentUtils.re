open TransformType;

open TransformStateUtils;

open Contract;

let isAlive = (transform: transform, state: StateDataType.state) =>
  ComponentDisposeComponentUtils.isAlive(transform, getTransformData(state).disposedIndexArray);

let _disposeFromParentAndChildMap = (transform, data) => {
  let transformStr = Js.Int.toString(transform);
  data
  |> TransformHierachySystem.unsafeGetChildren(transformStr)
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs]
       (
         (child: transform) =>
           TransformHierachySystem.removeFromParentMap(Js.Int.toString(child), data) |> ignore
       )
     );
  switch (TransformHierachySystem.getParent(transformStr, data)) {
  | None => ()
  | Some(parent) =>
    data
    |> TransformHierachySystem.removeFromChildMap(Js.Int.toString(parent), transform)
    |> ignore
  }
};

let handleDisposeComponent = (transform: transform, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentUtils.checkComponentShouldAlive(transform, isAlive, state)
      )
  );
  let {disposedIndexArray} as data = getTransformData(state);
  disposedIndexArray |> Js.Array.push(transform) |> ignore;
  _disposeFromParentAndChildMap(transform, data);
  state
};

let handleBatchDisposeComponent =
    (transformArray: array(transform), gameObjectUidMap, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        transformArray
        |> WonderCommonlib.ArraySystem.forEach(
             [@bs]
             (
               (transform) =>
                 ComponentDisposeComponentUtils.checkComponentShouldAlive(
                   transform,
                   isAlive,
                   state
                 )
             )
           )
      )
  );
  let {disposedIndexArray} as data = getTransformData(state);
  data.disposedIndexArray = disposedIndexArray |> Js.Array.concat(transformArray);
  /* todo optimize: batch remove parent,child? */
  transformArray
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs] ((transform) => _disposeFromParentAndChildMap(transform, data))
     );
  state
};