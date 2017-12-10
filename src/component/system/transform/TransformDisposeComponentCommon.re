open TransformType;

open TransformStateCommon;

open Contract;

let isAlive = (transform: transform, state: StateDataType.state) =>
  ComponentDisposeComponentSystem.isAlive(transform, getTransformData(state).disposedIndexArray);

let _disposeFromParentAndChildMap = (transform, data) => {
  data
  |> TransformHierachyCommon.unsafeGetChildren(transform)
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs]
       ((child: transform) => TransformHierachyCommon.removeFromParentMap(child, data) |> ignore)
     );
  switch (TransformHierachyCommon.getParent(transform, data)) {
  | None => ()
  | Some(parent) => data |> TransformHierachyCommon.removeFromChildMap(parent, transform) |> ignore
  }
};

let handleDisposeComponent = (transform: transform, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentSystem.checkComponentShouldAlive(transform, isAlive, state)
      )
  );
  let {disposedIndexArray} as data = getTransformData(state);
  disposedIndexArray |> Js.Array.push(transform) |> ignore;
  _disposeFromParentAndChildMap(transform, data);
  state
};

let handleBatchDisposeComponent =
    [@bs](transformArray: array(transform), gameObjectUidMap: array(bool), state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        transformArray
        |> WonderCommonlib.ArraySystem.forEach(
             [@bs]
             (
               (transform) =>
                 ComponentDisposeComponentSystem.checkComponentShouldAlive(
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