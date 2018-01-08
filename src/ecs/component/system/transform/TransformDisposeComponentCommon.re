open TransformType;

open ComponentDisposeComponentCommon;

open TransformStateCommon;

open Contract;

let isAlive = (transform: transform, state: StateDataType.state) =>
  ComponentDisposeComponentCommon.isAlive(transform, getTransformData(state).disposedIndexArray);

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
  };
  data
};

let _disposeData = (transform: transform, state: StateDataType.state) => {
  let {localToWorldMatrixMap, localPositionMap, parentMap, childMap, dirtyMap, gameObjectMap} as data =
    getTransformData(state);
  _disposeFromParentAndChildMap(transform, data) |> ignore;
  let state =
    TransformTypeArrayPoolCommon.addTypeArrayToPool(
      transform,
      MemoryConfigSystem.getMaxTypeArrayPoolSize(state),
      (localToWorldMatrixMap, localPositionMap),
      state
    );
  disposeSparseMapData(transform, localToWorldMatrixMap) |> ignore;
  disposeSparseMapData(transform, localPositionMap) |> ignore;
  disposeSparseMapData(transform, parentMap) |> ignore;
  disposeSparseMapData(transform, childMap) |> ignore;
  disposeSparseMapData(transform, dirtyMap) |> ignore;
  disposeSparseMapData(transform, gameObjectMap) |> ignore;
  state
};

let handleDisposeComponent = (transform: transform, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentCommon.checkComponentShouldAlive(transform, isAlive, state)
      )
  );
  let {disposedIndexArray} as data = getTransformData(state);
  disposedIndexArray |> Js.Array.push(transform) |> ignore;
  _disposeData(transform, state)
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (transformArray: array(transform), gameObjectUidMap: array(bool), state: StateDataType.state) => {
      requireCheck(
        () =>
          Contract.Operators.(
            transformArray
            |> WonderCommonlib.ArraySystem.forEach(
                 [@bs]
                 (
                   (transform) =>
                     ComponentDisposeComponentCommon.checkComponentShouldAlive(
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
      |> WonderCommonlib.ArraySystem.forEach([@bs] ((transform) => _disposeData(transform, state)));
      state
    }
  );